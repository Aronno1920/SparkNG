/**
 * @file
 * Sunburst chart component — visualizes hierarchical data as concentric rings
 * where each ring level nests inside its parent sector.
 *
 * @module sunburstchart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { SunburstSeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption, SunburstChartData } from '../types/chart.types';

/**
 * Sunburst Chart renders nested `{ name, value, children }` structures as
 * radial rings; sector size is proportional to the value.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-sunburstchart',
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
    exportAs: 'pSunburstChart'
})
export class SunburstChart extends BaseChart<ChartPassThrough> {
    componentName = 'SunburstChart';

    readonly chartType = 'sunburst';

    /**
     * Root node(s) of the hierarchy: `{ name, value, children }` structures.
     * Ignored when `series` is provided.
     * @group Props
     */
    @Input() get data(): SunburstChartData | undefined {
        return this._data;
    }
    set data(val: SunburstChartData | undefined) {
        this._data = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed sunburst series. When provided, it replaces the
     * single series composed from `data`.
     * @group Props
     */
    @Input() get series(): SunburstSeriesOption[] | undefined {
        return this._series;
    }
    set series(val: SunburstSeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * Radius of the chart: `'60%'`, a pixel number, or `[inner, outer]`.
     * @group Props
     */
    @Input() radius: SunburstSeriesOption['radius'] | undefined;

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    _data: SunburstChartData | undefined;

    _series: SunburstSeriesOption[] | undefined;

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const sunburst: SunburstSeriesOption = { type: 'sunburst', data: this.asArray(this.data) };
        if (this.name) sunburst.name = this.name;
        if (this.radius !== undefined) sunburst.radius = this.radius;
        return [sunburst];
    }
}
