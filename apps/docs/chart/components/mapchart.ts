/**
 * @file
 * Map chart component — visualizes region based statistics on a GeoJSON map
 * registered with `registerMap`.
 *
 * @module mapchart
 */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { MapSeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption, MapChartData, VisualMapComponentOption } from '../types/chart.types';

/**
 * Map Chart colors geographic regions by value. Register a GeoJSON map with
 * `registerMap` first, then reference it through the `map` input.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-mapchart',
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
    exportAs: 'pMapChart'
})
export class MapChart extends BaseChart<ChartPassThrough> {
    componentName = 'MapChart';

    readonly chartType = 'map';

    /**
     * Name of the GeoJSON map registered through `registerMap`, e.g. `'world'`.
     * @group Props
     */
    @Input() map: string = 'world';

    /**
     * Region values of the series: `{ name, value }` objects where `name`
     * matches a region feature of the registered map. Ignored when `series`
     * is provided.
     * @group Props
     */
    @Input() get data(): MapChartData | undefined {
        return this._data;
    }
    set data(val: MapChartData | undefined) {
        this._data = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed map series. When provided, it replaces the
     * single series composed from `data` and the convenience properties.
     * @group Props
     */
    @Input() get series(): MapSeriesOption[] | undefined {
        return this._series;
    }
    set series(val: MapSeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * Visual map component that maps region values to the color scale.
     * @group Props
     */
    @Input() visualMap: VisualMapComponentOption | VisualMapComponentOption[] | undefined;

    /**
     * Whether the map can be panned and zoomed; `'scale'` and `'move'` enable
     * a single interaction.
     * @group Props
     */
    @Input() roam: MapSeriesOption['roam'] | undefined;

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    _data: MapChartData | undefined;

    _series: MapSeriesOption[] | undefined;

    protected getComponentOptions(): Record<string, any> | null {
        if (this.visualMap === undefined) {
            return null;
        }
        return { visualMap: this.visualMap };
    }

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const map: MapSeriesOption = { type: 'map', map: this.map, data: this.asArray(this.data) };
        if (this.name) map.name = this.name;
        if (this.roam !== undefined) map.roam = this.roam;
        return [map];
    }
}
