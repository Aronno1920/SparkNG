/**
 * @file
 * Candlestick chart component — visualizes open, close, low and high prices
 * per period for financial data.
 *
 * @module candlestickchart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { CandlestickSeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { CandlestickChartData, SparkChartsOption, XAxisComponentOption, YAxisComponentOption } from '../types/chart.types';

/**
 * Candlestick Chart plots `[open, close, lowest, highest]` tuples as candles
 * with wicks, the standard visualization for price movements over time.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-candlestickchart',
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
    exportAs: 'pCandlestickChart'
})
export class CandlestickChart extends BaseChart<ChartPassThrough> {
    componentName = 'CandlestickChart';

    readonly chartType = 'candlestick';

    /**
     * Price tuples of the series: `[open, close, lowest, highest]` arrays.
     * Ignored when `series` is provided.
     * @group Props
     */
    @Input() get data(): CandlestickChartData | undefined {
        return this._data;
    }
    set data(val: CandlestickChartData | undefined) {
        this._data = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed candlestick series. When provided, it replaces
     * the single series composed from `data`.
     * @group Props
     */
    @Input() get series(): CandlestickSeriesOption[] | undefined {
        return this._series;
    }
    set series(val: CandlestickSeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * X axis configuration; defaults to `{ type: 'category' }`.
     * @group Props
     */
    @Input() xAxis: XAxisComponentOption | XAxisComponentOption[] | undefined;

    /**
     * Y axis configuration; defaults to `{ type: 'value', scale: true }` so
     * prices are not forced to a zero baseline.
     * @group Props
     */
    @Input() yAxis: YAxisComponentOption | YAxisComponentOption[] | undefined;

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    _data: CandlestickChartData | undefined;

    _series: CandlestickSeriesOption[] | undefined;

    protected getComponentOptions(): Record<string, any> {
        return {
            xAxis: this.xAxis ?? ({ type: 'category' } as XAxisComponentOption),
            yAxis: this.yAxis ?? ({ type: 'value', scale: true } as YAxisComponentOption)
        };
    }

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const candlestick: CandlestickSeriesOption = { type: 'candlestick', data: this.asArray(this.data) };
        if (this.name) candlestick.name = this.name;
        return [candlestick];
    }
}
