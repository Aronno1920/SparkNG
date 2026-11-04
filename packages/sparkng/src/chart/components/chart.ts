/**
 * @file
 * Generic chart component driven by a complete SparkNG Charts option object. It is
 * the escape hatch for everything the typed per-type components do not cover:
 * combination charts, custom series, graphic elements, dataZoom and more.
 *
 * @module chart
 */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Bind, BindModule } from '@bdspark/sparkng/bind';
import type { ChartPassThrough } from '@bdspark/sparkng/types/chart';
import { BaseChart } from '../core/basechart';
import { CHART_TEMPLATE } from '../core/charttemplate';
import { ChartStyle } from '../style/chartstyle';
import type { SparkChartsOption } from '../types/chart.types';

/**
 * Chart renders any SparkNG Charts visualization from a complete option object. Use
 * it for combination charts, custom series and advanced configurations; prefer
 * the typed components (`LineChart`, `BarChart`, `PieChart`, ...) for the
 * common chart types.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart)
 * @group Components
 */
@Component({
    selector: 'p-chart',
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
    exportAs: 'pChart'
})
export class UIChart extends BaseChart<ChartPassThrough> {
    componentName = 'Chart';

    readonly chartType = 'custom';

    protected getSeriesOptions(): SparkChartsOption['series'] {
        return this.options?.series;
    }
}
