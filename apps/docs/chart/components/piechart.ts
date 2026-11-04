/**
 * @file
 * Pie chart component — visualizes part-to-whole relationships as circular
 * sectors, with donut and rose variants.
 *
 * @module piechart
 */
import { booleanAttribute, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import type { PieSeriesOption } from '@bdspark/sparkng-charts';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption, PieChartData } from '../types/chart.types';

/**
 * Pie Chart renders values as proportional sectors of a circle; `donut` cuts
 * out the center and `roseType` varies the sector radius by value.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-piechart',
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
    exportAs: 'pPieChart'
})
export class PieChart extends BaseChart<ChartPassThrough> {
    componentName = 'PieChart';

    readonly chartType = 'pie';

    /**
     * Values of the pie series: an array of numbers or `{ value, name }`
     * objects. Ignored when `series` is provided.
     * @group Props
     */
    @Input() get data(): PieChartData | undefined {
        return this._data;
    }
    set data(val: PieChartData | undefined) {
        this._data = val;
        this.scheduleUpdate();
    }

    /**
     * One or more fully typed pie series. When provided, it replaces the
     * single series composed from `data` and the convenience properties.
     * @group Props
     */
    @Input() get series(): PieSeriesOption[] | undefined {
        return this._series;
    }
    set series(val: PieSeriesOption[] | undefined) {
        this._series = val;
        this.scheduleUpdate();
    }

    /**
     * Radius of the chart: `'60%'`, a pixel number, or `[inner, outer]` for a
     * donut layout.
     * @group Props
     */
    @Input() radius: PieSeriesOption['radius'] | undefined;

    /**
     * Whether the pie is rendered as a donut with an empty center; equivalent
     * to `radius="['45%', '70%']"`.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) donut: boolean = false;

    /**
     * Rose (nightingale) mode; sectors grow radially by value with `'area'`
     * scaling or `'radius'` proportion.
     * @group Props
     */
    @Input() roseType: 'radius' | 'area' | undefined;

    /**
     * Name of the series, displayed in the legend and tooltips.
     * @group Props
     */
    @Input() name: string | undefined;

    _data: PieChartData | undefined;

    _series: PieSeriesOption[] | undefined;

    protected getSeriesOptions(): SparkChartsOption['series'] {
        if (this.series) {
            return this.series;
        }
        const pie: PieSeriesOption = { type: 'pie', data: this.asArray(this.data) };
        if (this.name) pie.name = this.name;
        if (this.radius !== undefined) pie.radius = this.radius;
        else if (this.donut) pie.radius = ['45%', '70%'];
        if (this.roseType) pie.roseType = this.roseType;
        return [pie];
    }
}
