/**
 * @file
 * Treemap chart component — visualizes hierarchical data as nested rectangles.
 *
 * @module treemapchart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption } from '../types/chart.types';

/**
 * Treemap Chart displays hierarchical data as a set of nested rectangles.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart/treemap)
 * @group Components
 */
@Component({
    selector: 'p-treemapchart',
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
    exportAs: 'pTreemapChart'
})
export class TreemapChart extends BaseChart<ChartPassThrough> {
    componentName = 'TreemapChart';

    readonly chartType = 'treemap';

    /**
     * Hierarchical data objects with name, value and children.
     * @group Props
     */
    @Input() get data(): any[] | undefined {
        return this._data;
    }
    set data(val: any[] | undefined) {
        this._data = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed treemap series.
     * @group Props
     */
    @Input() get series(): any[] | undefined {
        return this._series;
    }
    set series(val: any[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    _data: any[] | undefined;

    _series: any[] | undefined;

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series && this.series.length > 0) {
            return this.series.map((s) => ({ type: 'treemap', ...s }));
        }
        if (this.data !== undefined) {
            return [{ type: 'treemap', data: this.data }];
        }
        return undefined;
    }
}
