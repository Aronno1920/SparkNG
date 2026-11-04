/**
 * @file
 * Scatter chart component — visualizes correlations between two numeric
 * variables as points on a cartesian plane.
 *
 * @module scatterchart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { ScatterSeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption, ScatterChartData, XAxisComponentOption, YAxisComponentOption } from '../types/chart.types';

/**
 * Scatter Chart plots `[x, y]` point pairs to reveal distribution, clustering
 * and correlation patterns between two measures.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-scatterchart',
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
    exportAs: 'pScatterChart'
})
export class ScatterChart extends BaseChart<ChartPassThrough> {
    componentName = 'ScatterChart';

    readonly chartType = 'scatter';

    /**
     * Point coordinates of the series: an array of `[x, y]` pairs. Ignored
     * when `series` is provided.
     * @group Props
     */
    @Input() get data(): ScatterChartData | undefined {
        return this._data;
    }
    set data(val: ScatterChartData | undefined) {
        this._data = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed scatter series. When provided, it replaces the
     * single series composed from `data` and the convenience properties.
     * @group Props
     */
    @Input() get series(): ScatterSeriesOption[] | undefined {
        return this._series;
    }
    set series(val: ScatterSeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * X axis configuration; defaults to `{ type: 'value' }`.
     * @group Props
     */
    @Input() xAxis: XAxisComponentOption | XAxisComponentOption[] | undefined;

    /**
     * Y axis configuration; defaults to `{ type: 'value' }`.
     * @group Props
     */
    @Input() yAxis: YAxisComponentOption | YAxisComponentOption[] | undefined;

    /**
     * Size of the point symbols in pixels, or `[width, height]`.
     * @group Props
     */
    @Input() symbolSize: ScatterSeriesOption['symbolSize'] | undefined;

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    _data: ScatterChartData | undefined;

    _series: ScatterSeriesOption[] | undefined;

    protected getComponentOptions(): Record<string, any> {
        return {
            xAxis: this.xAxis ?? ({ type: 'value' } as XAxisComponentOption),
            yAxis: this.yAxis ?? ({ type: 'value' } as YAxisComponentOption)
        };
    }

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const scatter: ScatterSeriesOption = { type: 'scatter', data: this.asArray(this.data) };
        if (this.name) scatter.name = this.name;
        if (this.symbolSize !== undefined) scatter.symbolSize = this.symbolSize;
        return [scatter];
    }
}
