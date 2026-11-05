/**
 * @file
 * Boxplot chart component — visualizes statistical distributions through
 * quartiles, medians, and outliers.
 *
 * @module boxplotchart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption } from '../types/chart.types';

/**
 * Boxplot Chart displays data distribution through quartiles.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart/boxplot)
 * @group Components
 */
@Component({
    selector: 'p-boxplotchart',
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
    exportAs: 'pBoxplotChart'
})
export class BoxplotChart extends BaseChart<ChartPassThrough> {
    componentName = 'BoxplotChart';

    readonly chartType = 'boxplot';

    /**
     * Values of the boxplot series.
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
     * One or more fully typed boxplot series.
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
            return this.series.map((s) => ({ type: 'boxplot', ...s }));
        }
        if (this.data !== undefined) {
            return [{ type: 'boxplot', data: this.data }];
        }
        return undefined;
    }
}
