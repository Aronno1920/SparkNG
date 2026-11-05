/**
 * @file
 * Tree chart component — visualizes hierarchical data as a radial or
 * orthogonal tree diagram.
 *
 * @module treechart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { TreeSeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption, TreeChartData } from '../types/chart.types';

/**
 * Tree Chart renders nested `{ name, children }` structures as a tree; the
 * `orient` input rotates the layout and branches expand or collapse on click
 * by default.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-treechart',
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
    exportAs: 'pTreeChart'
})
export class TreeChart extends BaseChart<ChartPassThrough> {
    componentName = 'TreeChart';

    readonly chartType = 'tree';

    /**
     * Root node(s) of the tree: `{ name, children }` structures. Ignored when
     * `series` is provided.
     * @group Props
     */
    @Input() get data(): TreeChartData | undefined {
        return this._data;
    }
    set data(val: TreeChartData | undefined) {
        this._data = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed tree series. When provided, it replaces the
     * single series composed from `data`.
     * @group Props
     */
    @Input() get series(): TreeSeriesOption[] | undefined {
        return this._series;
    }
    set series(val: TreeSeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * Layout direction of the tree: `'LR'` (default), `'RL'`, `'TB'` or `'BT'`.
     * @group Props
     */
    @Input() orient: TreeSeriesOption['orient'] | undefined;

    /**
     * Layout of the tree: `'orthogonal'` (default) or `'radial'`.
     * @group Props
     */
    @Input() layout: TreeSeriesOption['layout'] | undefined;

    /**
     * Edge shape of the tree: `'curve'` (default) or `'polyline'`.
     * @group Props
     */
    @Input() edgeShape: TreeSeriesOption['edgeShape'] | undefined;

    /**
     * Edge fork position when edgeShape is polyline.
     * @group Props
     */
    @Input() edgeForkPosition: TreeSeriesOption['edgeForkPosition'] | undefined;

    /**
     * Initial tree depth.
     * @group Props
     */
    @Input() initialTreeDepth: TreeSeriesOption['initialTreeDepth'] | undefined;

    /**
     * Symbol of the nodes, e.g. `'circle'`, `'rect'`, `'emptyCircle'`.
     * @group Props
     */
    @Input() symbol: TreeSeriesOption['symbol'] | undefined;

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    _data: TreeChartData | undefined;

    _series: TreeSeriesOption[] | undefined;

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const tree: TreeSeriesOption = { type: 'tree', data: this.asArray(this.data) };
        if (this.name) tree.name = this.name;
        if (this.orient !== undefined) tree.orient = this.orient;
        if (this.layout !== undefined) tree.layout = this.layout;
        if (this.edgeShape !== undefined) tree.edgeShape = this.edgeShape;
        if (this.edgeForkPosition !== undefined) tree.edgeForkPosition = this.edgeForkPosition;
        if (this.initialTreeDepth !== undefined) tree.initialTreeDepth = this.initialTreeDepth;
        if (this.symbol !== undefined) tree.symbol = this.symbol;
        return [tree];
    }
}
