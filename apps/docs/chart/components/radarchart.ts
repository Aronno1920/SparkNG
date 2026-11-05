/**
 * @file
 * Radar chart component — compares multivariate data across three or more
 * quantitative axes starting from the same point.
 *
 * @module radarchart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { RadarSeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption, RadarChartData, RadarComponentOption } from '../types/chart.types';

/**
 * Radar Chart renders multivariate observations as polygons over radial
 * indicator axes; each `{ value, name }` item becomes one polygon.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-radarchart',
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
    exportAs: 'pRadarChart'
})
export class RadarChart extends BaseChart<ChartPassThrough> {
    componentName = 'RadarChart';

    readonly chartType = 'radar';

    /**
     * Radar coordinate system configuration, most importantly the `indicator`
     * axes: `[{ name: 'Sales', max: 6500 }, ...]`. Ignored when `series` is
     * provided together with its own `radar` in `options`.
     * @group Props
     */
    @Input() radar: RadarComponentOption | undefined;

    /**
     * Indicator axes of the radar: `[{ name: 'Sales', max: 6500 }, ...]`.
     * Shorthand for `radar = { indicator }`; ignored when `radar` is provided.
     * @group Props
     */
    @Input() get indicator(): RadarComponentOption['indicator'] | undefined {
        return this._indicator;
    }
    set indicator(val: RadarComponentOption['indicator'] | undefined) {
        this._indicator = val;
        this.scheduleUpdate();
    }

    _indicator: RadarComponentOption['indicator'] | undefined;

    /**
     * Observations of the series: `{ value: number[], name?: string }` items.
     * Ignored when `series` is provided.
     * @group Props
     */
    @Input() get data(): RadarChartData | undefined {
        return this._data;
    }
    set data(val: RadarChartData | undefined) {
        this._data = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed radar series. When provided, it replaces the
     * single series composed from `data`.
     * @group Props
     */
    @Input() get series(): RadarSeriesOption[] | undefined {
        return this._series;
    }
    set series(val: RadarSeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    _data: RadarChartData | undefined;

    _series: RadarSeriesOption[] | undefined;

    protected getComponentOptions(): Record<string, any> | null {
        if (this.radar === undefined && this.indicator === undefined) {
            return null;
        }
        const radar = this.radar ?? { indicator: this.indicator };
        return { radar };
    }

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const radar: RadarSeriesOption = { type: 'radar', data: this.asArray(this.data) };
        if (this.name) radar.name = this.name;
        return [radar];
    }
}
