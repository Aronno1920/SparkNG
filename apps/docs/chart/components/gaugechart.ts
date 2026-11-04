/**
 * @file
 * Gauge chart component — visualizes a single scalar value on a radial scale,
 * with optional progress arcs and rich detail formatting.
 *
 * @module gaugechart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { GaugeSeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption, GaugeChartData } from '../types/chart.types';

/**
 * Gauge Chart displays a value on a radial scale; the `value` input renders a
 * single pointer while the `data` input supports multiple pointers and rich
 * detail templates.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-gaugechart',
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
    exportAs: 'pGaugeChart'
})
export class GaugeChart extends BaseChart<ChartPassThrough> {
    componentName = 'GaugeChart';

    readonly chartType = 'gauge';

    /**
     * Value shown by the gauge pointer; a shorthand for
     * `data="[{ value: value }]"`.
     * @group Props
     */
    @Input() get value(): number | undefined {
        return this._value;
    }
    set value(val: number | undefined) {
        this._value = val;
        this.scheduleUpdate();
    }

    /**
     * Pointer items of the gauge: `{ value, name? }` objects. Ignored when
     * `series` is provided or `value` is set.
     * @group Props
     */
    @Input() get data(): GaugeChartData | undefined {
        return this._data;
    }
    set data(val: GaugeChartData | undefined) {
        this._data = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed gauge series. When provided, it replaces the
     * single series composed from `value` and `data`.
     * @group Props
     */
    @Input() get series(): GaugeSeriesOption[] | undefined {
        return this._series;
    }
    set series(val: GaugeSeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * Minimum value of the scale; defaults to `0`.
     * @group Props
     */
    @Input() min: number | undefined;

    /**
     * Maximum value of the scale; defaults to `100`.
     * @group Props
     */
    @Input() max: number | undefined;

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    _value: number | undefined;

    _data: GaugeChartData | undefined;

    _series: GaugeSeriesOption[] | undefined;

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const gauge: GaugeSeriesOption = { type: 'gauge', data: this.resolveGaugeData() };
        if (this.name) gauge.name = this.name;
        if (this.min !== undefined) gauge.min = this.min;
        if (this.max !== undefined) gauge.max = this.max;
        return [gauge];
    }

    private resolveGaugeData(): GaugeChartData {
        if (this.value !== undefined) {
            return [{ value: this.value } as any];
        }
        return this.asArray(this.data);
    }
}
