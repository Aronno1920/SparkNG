/**
 * @file
 * Sankey chart component — visualizes flow volumes between nodes of a process
 * or a system as weighted links.
 *
 * @module sankeychart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { SankeySeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption, SankeyChartLinks, SankeyChartNodes } from '../types/chart.types';

/**
 * Sankey Chart renders directional flows between `nodes` through weighted
 * `links`; link thickness is proportional to the transferred value.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-sankeychart',
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
    exportAs: 'pSankeyChart'
})
export class SankeyChart extends BaseChart<ChartPassThrough> {
    componentName = 'SankeyChart';

    readonly chartType = 'sankey';

    /**
     * Flow endpoints: `{ name }` items. Ignored when `series` is provided.
     * @group Props
     */
    @Input() get nodes(): SankeyChartNodes | undefined {
        return this._nodes;
    }
    set nodes(val: SankeyChartNodes | undefined) {
        this._nodes = val;
        this.scheduleUpdate();
    }

    /**
     * Flow endpoints as `data`: an alias for `nodes`, accepting the same
     * `{ name }` items. Ignored when `series` is provided.
     * @group Props
     */
    @Input() get data(): SankeyChartNodes | undefined {
        return this._nodes;
    }
    set data(val: SankeyChartNodes | undefined) {
        this._nodes = val;
        this.scheduleUpdate();
    }

    /**
     * Flows between the nodes: `{ source, target, value }` items referencing
     * node names. Ignored when `series` is provided.
     * @group Props
     */
    @Input() get links(): SankeyChartLinks | undefined {
        return this._links;
    }
    set links(val: SankeyChartLinks | undefined) {
        this._links = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed sankey series. When provided, it replaces the
     * single series composed from `nodes` and `links`.
     * @group Props
     */
    @Input() get series(): SankeySeriesOption[] | undefined {
        return this._series;
    }
    set series(val: SankeySeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * Layout direction of the flows: `'horizontal'` (default) or `'vertical'`.
     * @group Props
     */
    @Input() orient: SankeySeriesOption['orient'] | undefined;

    /**
     * Whether the chart can be panned and zoomed.
     * @group Props
     */
    @Input() roam: SankeySeriesOption['roam'] | undefined;

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    _nodes: SankeyChartNodes | undefined;

    _links: SankeyChartLinks | undefined;

    _series: SankeySeriesOption[] | undefined;

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const sankey: SankeySeriesOption = { type: 'sankey', data: this.asArray(this.nodes), links: this.asArray(this.links) };
        if (this.name) sankey.name = this.name;
        if (this.orient !== undefined) sankey.orient = this.orient;
        if (this.roam !== undefined) sankey.roam = this.roam;
        return [sankey];
    }
}
