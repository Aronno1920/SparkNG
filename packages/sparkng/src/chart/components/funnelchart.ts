/**
 * @file
 * Funnel chart component — visualizes the progressive narrowing of a sequence
 * of stages, such as a conversion pipeline.
 *
 * @module funnelchart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { FunnelSeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption, FunnelChartData } from '../types/chart.types';

/**
 * Funnel Chart stacks stages as trapezoids whose widths are proportional to
 * their values, from the widest entry stage to the narrowest outcome.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-funnelchart',
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
    exportAs: 'pFunnelChart'
})
export class FunnelChart extends BaseChart<ChartPassThrough> {
    componentName = 'FunnelChart';

    readonly chartType = 'funnel';

    /**
     * Stage values: `{ value, name }` objects. Ignored when `series` is provided.
     * @group Props
     */
    @Input() get data(): FunnelChartData | undefined {
        return this._data;
    }
    set data(val: FunnelChartData | undefined) {
        this._data = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed funnel series. When provided, it replaces the
     * single series composed from `data`.
     * @group Props
     */
    @Input() get series(): FunnelSeriesOption[] | undefined {
        return this._series;
    }
    set series(val: FunnelSeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * Ordering of the stages: `'descending'` (default), `'ascending'` or
     * `'none'` to keep the data order.
     * @group Props
     */
    @Input() sort: 'ascending' | 'descending' | 'none' | undefined;

    /**
     * Position of the stage labels, e.g. `'inside'`, `'left'`, `'right'`.
     * @group Props
     */
    @Input() labelPosition: 'left' | 'right' | 'inside' | 'insideLeft' | 'insideRight' | 'center' | 'position' | undefined;

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    _data: FunnelChartData | undefined;

    _series: FunnelSeriesOption[] | undefined;

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const funnel: FunnelSeriesOption = { type: 'funnel', data: this.asArray(this.data) };
        if (this.name) funnel.name = this.name;
        if (this.sort !== undefined) funnel.sort = this.sort;
        if (this.labelPosition !== undefined) (funnel as any).label = { position: this.labelPosition };
        return [funnel];
    }
}
