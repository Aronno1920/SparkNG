/**
 * @file
 * Heatmap chart component — visualizes values in a 2D matrix as colors.
 *
 * @module heatmapchart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption } from '../types/chart.types';

/**
 * Heatmap Chart displays values in a 2D matrix as colors.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart/heatmap)
 * @group Components
 */
@Component({
    selector: 'p-heatmapchart',
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
    exportAs: 'pHeatmapChart'
})
export class HeatmapChart extends BaseChart<ChartPassThrough> {
    componentName = 'HeatmapChart';

    readonly chartType = 'heatmap';

    /**
     * Values of the heatmap series: [x, y, value] triplets.
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
     * One or more fully typed heatmap series.
     * @group Props
     */
    @Input() get series(): any[] | undefined {
        return this._series;
    }
    set series(val: any[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series && this.series.length > 0) {
            return this.series.map((s) => ({ type: 'heatmap', ...s }));
        }
        if (this.data !== undefined) {
            return [{ type: 'heatmap', data: this.data }];
        }
        return undefined;
    }
}
