/**
 * @file
 * Line chart component — visualizes trends as series of points connected by
 * straight, stepped or smooth lines with optional area shading.
 *
 * @module linechart
 */
import { booleanAttribute, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { LineSeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption, LineChartData, XAxisComponentOption, YAxisComponentOption } from '../types/chart.types';

/**
 * Line Chart connects data points with straight, stepped or smooth line
 * segments; enabling `area` fills the region below the line.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-linechart',
    standalone: true,
    imports: [BindModule],
    template: CHART_TEMPLATE,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[style]': "sx('root')"
    },
    providers: [ChartStyle],
    hostDirectives: [Bind],
    exportAs: 'pLineChart'
})
export class LineChart extends BaseChart<ChartPassThrough> {
    componentName = 'LineChart';

    readonly chartType = 'line';

    /**
     * Values of the line series: an array of numbers, `[x, y]` pairs or data
     * objects. Ignored when `series` is provided.
     * @group Props
     */
    @Input() get data(): LineChartData | undefined {
        return this._data;
    }
    set data(val: LineChartData | undefined) {
        this._data = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed line series. When provided, it replaces the
     * single series composed from `data` and the convenience properties.
     * @group Props
     */
    @Input() get series(): LineSeriesOption[] | undefined {
        return this._series;
    }
    set series(val: LineSeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * Category axis configuration; defaults to `{ type: 'category' }`.
     * @group Props
     */
    @Input() xAxis: XAxisComponentOption | XAxisComponentOption[] | undefined;

    /**
     * Value axis configuration; defaults to `{ type: 'value' }`.
     * @group Props
     */
    @Input() yAxis: YAxisComponentOption | YAxisComponentOption[] | undefined;

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    /**
     * Whether the line segments are drawn as smooth curves.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) smooth: boolean = false;

    /**
     * Whether the area below the line is filled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) area: boolean = false;

    /**
     * Stack group of the series; series sharing a stack are drawn cumulatively.
     * @group Props
     */
    @Input() stack: string | undefined;

    /**
     * Draws the line as a staircase; `'start' | 'middle' | 'end'`.
     * @group Props
     */
    @Input() step: 'start' | 'middle' | 'end' | undefined;

    /**
     * Symbol of the data points, e.g. `'circle'`, `'rect'`, `'none'`.
     * @group Props
     */
    @Input() symbol: LineSeriesOption['symbol'] | undefined;

    /**
     * Size of the data point symbols in pixels.
     * @group Props
     */
    @Input() symbolSize: LineSeriesOption['symbolSize'] | undefined;

    _data: LineChartData | undefined;

    _series: LineSeriesOption[] | undefined;

    protected getComponentOptions(): Record<string, any> {
        return {
            xAxis: this.xAxis ?? ({ type: 'category' } as XAxisComponentOption),
            yAxis: this.yAxis ?? ({ type: 'value' } as YAxisComponentOption)
        };
    }

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const line: LineSeriesOption = { type: 'line', data: this.asArray(this.data) };
        if (this.name) line.name = this.name;
        if (this.smooth) line.smooth = true;
        if (this.area) (line as any).areaStyle = {};
        if (this.stack) line.stack = this.stack;
        if (this.step) line.step = this.step;
        if (this.symbol !== undefined) line.symbol = this.symbol;
        if (this.symbolSize !== undefined) line.symbolSize = this.symbolSize;
        return [line];
    }
}
