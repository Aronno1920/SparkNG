/**
 * @file
 * Bar chart component — visualizes categorical comparisons with vertical or
 * horizontal bars, optionally stacked.
 *
 * @module barchart
 */
import { booleanAttribute, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { BarSeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { BarChartData, SparkChartsOption, XAxisComponentOption, YAxisComponentOption } from '../types/chart.types';

/**
 * Bar Chart displays rectangular bars proportional to the values they
 * represent; `horizontal` rotates the layout and `stack` stacks series.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-barchart',
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
    exportAs: 'pBarChart'
})
export class BarChart extends BaseChart<ChartPassThrough> {
    componentName = 'BarChart';

    readonly chartType = 'bar';

    /**
     * Values of the bar series: an array of numbers, `[category, value]` pairs
     * or data objects. Ignored when `series` is provided.
     * @group Props
     */
    @Input() get data(): BarChartData | undefined {
        return this._data;
    }
    set data(val: BarChartData | undefined) {
        this._data = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed bar series. When provided, it replaces the
     * single series composed from `data` and the convenience properties.
     * @group Props
     */
    @Input() get series(): BarSeriesOption[] | undefined {
        return this._series;
    }
    set series(val: BarSeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * X axis configuration. Defaults to a category axis, or a value axis when
     * `horizontal` is enabled.
     * @group Props
     */
    @Input() xAxis: XAxisComponentOption | XAxisComponentOption[] | undefined;

    /**
     * Y axis configuration. Defaults to a value axis, or a category axis when
     * `horizontal` is enabled.
     * @group Props
     */
    @Input() yAxis: YAxisComponentOption | YAxisComponentOption[] | undefined;

    /**
     * Whether the bars are laid out horizontally; swaps the default axis types.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) horizontal: boolean = false;

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    /**
     * Stack group of the series; series sharing a stack are drawn cumulatively.
     * @group Props
     */
    @Input() stack: string | undefined;

    _data: BarChartData | undefined;

    _series: BarSeriesOption[] | undefined;

    protected getComponentOptions(): Record<string, any> {
        return {
            xAxis: this.xAxis ?? ({ type: this.horizontal ? 'value' : 'category' } as XAxisComponentOption),
            yAxis: this.yAxis ?? ({ type: this.horizontal ? 'category' : 'value' } as YAxisComponentOption)
        };
    }

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const bar: BarSeriesOption = { type: 'bar', data: this.asArray(this.data) };
        if (this.name) bar.name = this.name;
        if (this.stack) bar.stack = this.stack;
        return [bar];
    }
}
