/**
 * @file
 * Graph chart component — visualizes relationship networks with nodes and
 * edges, laid out with a force simulation or fixed coordinates.
 *
 * @module graphchart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { GraphSeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption, GraphChartCategories, GraphChartLinks, GraphChartNodes } from '../types/chart.types';

/**
 * Graph Chart renders nodes and edges as a network; the force `layout`
 * simulates attraction and repulsion, `'none'` honors the `x`/`y` coordinates
 * of the nodes.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-graphchart',
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
    exportAs: 'pGraphChart'
})
export class GraphChart extends BaseChart<ChartPassThrough> {
    componentName = 'GraphChart';

    readonly chartType = 'graph';

    /**
     * Nodes of the network: `{ name, value?, x?, y?, category?, symbolSize? }`
     * items. Ignored when `series` is provided.
     * @group Props
     */
    @Input() get nodes(): GraphChartNodes | undefined {
        return this._nodes;
    }
    set nodes(val: GraphChartNodes | undefined) {
        this._nodes = val;
        this.scheduleUpdate();
    }

    /**
     * Edges of the network: `{ source, target, value? }` items referencing
     * node names. Ignored when `series` is provided.
     * @group Props
     */
    @Input() get links(): GraphChartLinks | undefined {
        return this._links;
    }
    set links(val: GraphChartLinks | undefined) {
        this._links = val;
        this.scheduleUpdate();
    }

    /**
     * Node categories used for legend driven coloring.
     * @group Props
     */
    @Input() get categories(): GraphChartCategories | undefined {
        return this._categories;
    }
    set categories(val: GraphChartCategories | undefined) {
        this._categories = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed graph series. When provided, it replaces the
     * single series composed from `nodes`, `links` and `categories`.
     * @group Props
     */
    @Input() get series(): GraphSeriesOption[] | undefined {
        return this._series;
    }
    set series(val: GraphSeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * Layout strategy; `'force'` (default) runs the force simulation, `'none'`
     * uses the explicit node coordinates.
     * @group Props
     */
    @Input() layout: 'none' | 'force' = 'force';

    /**
     * Whether the graph can be panned and zoomed; `'scale'` and `'move'` enable
     * a single interaction.
     * @group Props
     */
    @Input() roam: GraphSeriesOption['roam'] | undefined;

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    _nodes: GraphChartNodes | undefined;

    _links: GraphChartLinks | undefined;

    _categories: GraphChartCategories | undefined;

    _series: GraphSeriesOption[] | undefined;

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const graph: GraphSeriesOption = { type: 'graph', layout: this.layout, data: this.asArray(this.nodes), links: this.asArray(this.links) };
        if (this.name) graph.name = this.name;
        if (this.categories) graph.categories = this.categories;
        if (this.roam !== undefined) graph.roam = this.roam;
        return [graph];
    }
}
