/**
 * @file
 * Base class powering every SparkNG chart component. It owns the chart engine
 * lifecycle: initialization, option composition, theme resolution, responsive
 * resizing, event wiring and disposal. Subclasses only describe how their
 * series and coordinate components are composed from typed inputs.
 *
 * @module basechart
 */
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, EventEmitter, inject, Input, NgZone, Output, ViewChild, booleanAttribute } from '@angular/core';
import * as charts from '@bdspark/sparkng-charts';
import type { SparkChartsOption, SparkChartsType, Payload, ResizeOpts, SetOptionOpts } from '@bdspark/sparkng-charts';
import { ThemeService } from '@bdspark/sparkng-styled';
import { BaseComponent } from '@bdspark/sparkng/basecomponent';
import { deepMerge } from '@bdspark/sparkng-utils';
import { Bind } from '@bdspark/sparkng/bind';
import { ChartStyle } from '../style/chartstyle';
import type { ChartInitEvent, ChartMouseEvent, ChartRenderer, DatasetComponentOption, SparkChartsCoreOption, LegendComponentOption, SparkChartTheme, TitleComponentOption, TooltipComponentOption } from '../types/chart.types';
import { buildSparkChartTheme } from './sparkcharttheme';

/**
 * Base class of all chart components. Handles the engine instance lifecycle,
 * option composition, SparkNG theme integration, responsive resizing, and the
 * chart events.
 * @group Components
 */
@Directive()
export abstract class BaseChart<PT = any> extends BaseComponent<PT> {
    /**
     * the engine series type identifier of the concrete chart (`'line'`, `'bar'`, `'pie'`, ...).
     * Used for styling and passthrough documentation.
     */
    abstract readonly chartType: string;

    /**
     * The raw the engine instance, available after the component view initializes.
     * Use it for advanced scenarios that are not covered by the component API.
     */
    chart: SparkChartsType | null | undefined;

    /**
     * Whether the underlying the engine instance has been created.
     */
    initialized: boolean = false;

    /**
     * Whether the platform supports rendering; charts initialize on the browser only.
     */
    isBrowser: boolean = isPlatformBrowser(this.platformId);

    @ViewChild('container', { static: true }) containerViewChild!: ElementRef<HTMLDivElement>;

    _componentStyle = inject(ChartStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Complete the engine option overrides. Values provided here are deep merged
     * over the options composed from the typed inputs; arrays such as `series`
     * replace the composed ones.
     * @group Props
     */
    @Input() get options(): SparkChartsOption | undefined {
        return this._options;
    }
    set options(val: SparkChartsOption | undefined) {
        this._options = val;
        this.scheduleUpdate();
    }

    /**
     * Dataset source shared by the chart series. See the engine
     * dataset documentation of the charting engine.
     * @group Props
     */
    @Input() get dataset(): DatasetComponentOption | DatasetComponentOption[] | undefined {
        return this._dataset;
    }
    set dataset(val: DatasetComponentOption | DatasetComponentOption[] | undefined) {
        this._dataset = val;
        this.scheduleUpdate();
    }

    /**
     * Title configuration of the chart.
     * @group Props
     */
    @Input() title: TitleComponentOption | undefined;

    /**
     * Legend configuration of the chart.
     * @group Props
     */
    @Input() legend: LegendComponentOption | undefined;

    /**
     * Tooltip configuration of the chart.
     * @group Props
     */
    @Input() tooltip: TooltipComponentOption | undefined;

    /**
     * Width of the chart, e.g. `'640px'` or `'100%'`. Defaults to `'100%'`.
     * @group Props
     */
    @Input() width: string | undefined;

    /**
     * Height of the chart, e.g. `'320px'`. Defaults to `'24rem'`.
     * @group Props
     */
    @Input() height: string | undefined;

    /**
     * Whether the chart is resized when its container size changes.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) responsive: boolean = true;

    /**
     * the engine theme applied on initialization. Accepts the name of a theme
     * registered through {@link registerTheme} or a theme object. When not
     * provided, a theme is derived from the active SparkNG preset.
     * @group Props
     */
    @Input() theme: string | SparkChartTheme | undefined;

    /**
     * Rendering technology used by the chart engine, `'canvas'` (default) or `'svg'`.
     * Renamed from the engine's `renderer` option to avoid clashing with the
     * Angular renderer of the base component.
     * @group Props
     */
    @Input() renderMode: ChartRenderer = 'canvas';

    /**
     * Defines a string that labels the chart for accessibility.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;

    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;

    /**
     * Callback to invoke when the engine instance is created. Emits the raw
     * instance that can be used for advanced integrations.
     * @group Emits
     */
    @Output() onChartInit: EventEmitter<ChartInitEvent> = new EventEmitter<ChartInitEvent>();

    /**
     * Callback to invoke when a chart element such as a point, a bar or a node is clicked.
     * @group Emits
     */
    @Output() onChartClick: EventEmitter<ChartMouseEvent> = new EventEmitter<ChartMouseEvent>();

    /**
     * Callback to invoke when a chart element is double clicked.
     * @group Emits
     */
    @Output() onChartDblClick: EventEmitter<ChartMouseEvent> = new EventEmitter<ChartMouseEvent>();

    /**
     * Callback to invoke when the pointer enters a chart element.
     * @group Emits
     */
    @Output() onChartMouseOver: EventEmitter<ChartMouseEvent> = new EventEmitter<ChartMouseEvent>();

    /**
     * Callback to invoke when the pointer leaves a chart element.
     * @group Emits
     */
    @Output() onChartMouseOut: EventEmitter<ChartMouseEvent> = new EventEmitter<ChartMouseEvent>();

    _options: SparkChartsOption | undefined;

    _dataset: DatasetComponentOption | DatasetComponentOption[] | undefined;

    private zone: NgZone = inject(NgZone);

    private resizeObserver: ResizeObserver | null | undefined;

    private themeChangeHandler: (() => void) | null | undefined;

    private docMutationObserver: MutationObserver | null | undefined;

    private updateQueued: boolean = false;

    onChanges(): void {
        this.scheduleUpdate();
    }

    onAfterViewInit(): void {
        this.initChart();
    }

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onDestroy(): void {
        this.destroyChart();
    }

    /**
     * Creates the engine instance, applies the composed options and wires up
     * the events and the responsive observer. Runs automatically after the
     * component view initializes; call it manually only after {@link destroyChart}.
     */
    initChart(): void {
        if (!this.isBrowser || !this.containerViewChild || this.chart) {
            return;
        }
        const element = this.containerViewChild.nativeElement;

        const chart = this.zone.runOutsideAngular(() => charts.init(element, this.resolveTheme(), { renderer: this.renderMode }));
        this.chart = chart;
        this.initialized = true;
        this.bindEvents();
        this.applyOptions();
        this.onChartInit.emit({ chart });

        if (this.responsive && typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => this.resize());
            this.resizeObserver.observe(this.el.nativeElement);
        }

        if (!this.themeChangeHandler) {
            this.themeChangeHandler = () => {
                if (this.theme === undefined && this.initialized) {
                    this.reinit();
                }
            };
            ThemeService.on('theme:change', this.themeChangeHandler);
        }

        if (!this.docMutationObserver && typeof MutationObserver !== 'undefined' && this.document?.documentElement) {
            this.docMutationObserver = new MutationObserver((mutations) => {
                for (const m of mutations) {
                    if (m.type === 'attributes' && m.attributeName === 'class') {
                        if (this.theme === undefined && this.initialized) {
                            this.reinit();
                        }
                        break;
                    }
                }
            });
            this.docMutationObserver.observe(this.document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    }

    /**
     * Disposes the engine instance along with the observers and listeners.
     * Invoked automatically on component destruction.
     */
    destroyChart(): void {
        this.resizeObserver?.disconnect();
        this.resizeObserver = null;
        this.docMutationObserver?.disconnect();
        this.docMutationObserver = null;
        if (this.themeChangeHandler) {
            ThemeService.off('theme:change', this.themeChangeHandler);
            this.themeChangeHandler = null;
        }
        if (this.chart) {
            this.zone.runOutsideAngular(() => {
                this.chart?.dispose();
            });
            this.chart = null;
        }
        this.initialized = false;
    }

    /**
     * Recreates the chart from scratch, re-applying the active theme. Required
     * after changes that the engine can only consume at initialization time.
     */
    reinit(): void {
        if (this.initialized) {
            this.destroyChart();
            this.initChart();
        }
    }

    /**
     * Re-applies the composed options to the chart. Charts update with
     * animation whenever the bound data, series or option inputs change.
     */
    refresh(): void {
        this.applyOptions();
    }

    /**
     * Resizes the chart after its container dimensions change. Called
     * automatically while `responsive` is enabled.
     * @param opts - Optional resize options passed to the chart engine.
     */
    resize(opts?: ResizeOpts): void {
        if (this.chart) {
            this.zone.runOutsideAngular(() => {
                this.chart?.resize(opts);
            });
        }
    }

    /**
     * Sets raw the engine options, bypassing the composed component options.
     * @param option - The the engine option object.
     * @param opts - Merge mode options, see the engine `setOption`.
     */
    setOption(option: SparkChartsCoreOption, opts?: SetOptionOpts): void {
        if (this.chart) {
            this.zone.runOutsideAngular(() => {
                (this.chart as SparkChartsType)?.setOption(option, opts);
            });
        }
    }

    /**
     * Returns the currently applied options maintained by the chart engine.
     */
    getOption(): SparkChartsCoreOption | undefined {
        return this.chart?.getOption();
    }

    /**
     * Clears the canvas and removes all components and series of the chart.
     */
    clear(): void {
        if (this.chart) {
            this.zone.runOutsideAngular(() => {
                this.chart?.clear();
            });
        }
    }

    /**
     * Exports the chart as a base64 image URL.
     * @param opts - Export options; `type` supports `'png' | 'jpeg' | 'svg'` (svg for the svg renderer).
     */
    getDataURL(opts?: { type?: 'png' | 'jpeg' | 'svg'; pixelRatio?: number; backgroundColor?: string; excludeComponents?: string[] }): string | undefined {
        return this.chart?.getDataURL(opts);
    }

    /**
     * Exports a connected group of charts as a single base64 image URL. See {@link connect}.
     * @param opts - Export options.
     */
    getConnectedDataURL(opts?: { type?: 'png' | 'jpeg' | 'svg'; pixelRatio?: number; backgroundColor?: string; excludeComponents?: string[] }): string | undefined {
        return this.chart?.getConnectedDataURL(opts);
    }

    /**
     * Triggers an the engine action such as `highlight`, `downplay`, `dataZoom`,
     * `showTip` or `legendToggleSelect`.
     * @param payload - The action payload.
     */
    dispatchAction(payload: Payload): void {
        if (this.chart) {
            this.zone.runOutsideAngular(() => {
                this.chart?.dispatchAction(payload);
            });
        }
    }

    /**
     * Checks whether a pixel coordinate is inside a given chart component.
     * @param finder - Component finder, e.g. `{ seriesIndex: 0 }`.
     * @param value - The pixel coordinate.
     */
    containPixel(finder: Record<string, any>, value: number[]): boolean | undefined {
        return this.chart?.containPixel(finder, value);
    }

    /**
     * Composes the full option object applied to the chart engine: the series built by
     * the concrete component, its coordinate components, the shared inputs and
     * finally the raw `options` overrides.
     */
    protected buildOptions(): SparkChartsOption {
        const composed = this.getChartOptions();
        const overrides = this.options ? (omitUndefined(this.options as Record<string, any>) as SparkChartsOption) : undefined;
        if (!overrides || Object.keys(overrides).length === 0) {
            return composed;
        }
        return deepMerge(composed as Record<string, any>, overrides as Record<string, any>) as SparkChartsOption;
    }

    /**
     * Options composed from the component inputs, without the raw `options`
     * overrides. Generic charts return their `options` as provided.
     */
    protected getChartOptions(): SparkChartsOption {
        const composed: Record<string, any> = { ...(this.getComponentOptions() || {}) };
        if (this.title != null) composed.title = this.title;
        if (this.legend != null) composed.legend = this.legend;
        if (this.tooltip != null) composed.tooltip = this.tooltip;
        if (this.dataset != null) composed.dataset = this.dataset;
        composed.series = this.getSeriesOptions();
        return composed as SparkChartsOption;
    }

    /**
     * Series options composed from the typed inputs of the concrete chart.
     */
    protected abstract getSeriesOptions(): SparkChartsOption['series'];

    /**
     * Chart-type specific coordinate components (`xAxis`, `yAxis`, `radar`,
     * `visualMap`, ...). Merged into the composed options by {@link getChartOptions}.
     */
    protected getComponentOptions(): Record<string, any> | null {
        return null;
    }

    /**
     * Normalizes a data input to an array so that single objects are accepted
     * wherever the engine expects a list.
     */
    protected asArray(value: unknown): any[] {
        if (value === undefined || value === null) {
            return [];
        }
        return Array.isArray(value) ? value : [value];
    }

    private resolveTheme(): string | SparkChartTheme | null {
        if (this.theme !== undefined) {
            return this.theme as string | SparkChartTheme;
        }
        if (this.isBrowser) {
            return buildSparkChartTheme(this.document);
        }
        return null;
    }

    private bindEvents(): void {
        if (!this.chart) {
            return;
        }
        const emitMouseEvent = (emitter: EventEmitter<ChartMouseEvent>, params: any) => {
            emitter.emit({ ...params, originalEvent: params?.event?.event });
        };
        this.chart.on('click', (params: any) => emitMouseEvent(this.onChartClick, params));
        this.chart.on('dblclick', (params: any) => emitMouseEvent(this.onChartDblClick, params));
        this.chart.on('mouseover', (params: any) => emitMouseEvent(this.onChartMouseOver, params));
        this.chart.on('mouseout', (params: any) => emitMouseEvent(this.onChartMouseOut, params));
    }

    private applyOptions(): void {
        if (!this.chart) {
            return;
        }
        const options = this.buildOptions();
        this.zone.runOutsideAngular(() => {
            (this.chart as SparkChartsType)?.setOption(options as SparkChartsCoreOption, { notMerge: false });
        });
    }

    protected scheduleUpdate(): void {
        if (!this.initialized || this.updateQueued) {
            return;
        }
        this.updateQueued = true;
        queueMicrotask(() => {
            this.updateQueued = false;
            this.applyOptions();
        });
    }
}

function omitUndefined(source: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    Object.keys(source).forEach((key) => {
        if (source[key] !== undefined) {
            result[key] = source[key];
        }
    });
    return result;
}
