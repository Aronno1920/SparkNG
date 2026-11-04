import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/chart/accessibility-doc';
import { BarDoc } from '@/doc/chart/bar-doc';
import { BasicDoc } from '@/doc/chart/basic-doc';
import { BoxplotDoc } from '@/doc/chart/boxplot-doc';
import { CandlestickDoc } from '@/doc/chart/candlestick-doc';
import { ComboDoc } from '@/doc/chart/combo-doc';
import { DatasetDoc } from '@/doc/chart/dataset-doc';
import { DoughnutDoc } from '@/doc/chart/doughnut-doc';
import { FunnelDoc } from '@/doc/chart/funnel-doc';
import { GaugeDoc } from '@/doc/chart/gauge-doc';
import { GraphDoc } from '@/doc/chart/graph-doc';
import { HeatmapDoc } from '@/doc/chart/heatmap-doc';
import { HorizontalBarDoc } from '@/doc/chart/horizontalbar-doc';
import { InstallationDoc } from '@/doc/chart/installation-doc';
import { LineAreaDoc } from '@/doc/chart/linearea-doc';
import { MapDoc } from '@/doc/chart/map-doc';
import { PieDoc } from '@/doc/chart/pie-doc';
import { PTComponent } from '@/doc/chart/pt/PTComponent';
import { RadarDoc } from '@/doc/chart/radar-doc';
import { RichTextDoc } from '@/doc/chart/richtext-doc';
import { SankeyDoc } from '@/doc/chart/sankey-doc';
import { ScatterDoc } from '@/doc/chart/scatter-doc';
import { StackedBarDoc } from '@/doc/chart/stackedbar-doc';
import { SunburstDoc } from '@/doc/chart/sunburst-doc';
import { TreeDoc } from '@/doc/chart/tree-doc';
import { TreemapDoc } from '@/doc/chart/treemap-doc';
import { UsageDoc } from '@/doc/chart/usage-doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Chart Component - SparkNG"
            header="Charts"
            description="Chart components are powered by the SparkNG Charts engine, with theming that follows the active SparkNG preset."
            [docs]="docs"
            [apiDocs]="[
                'Chart',
                'LineChart',
                'BarChart',
                'PieChart',
                'ScatterChart',
                'MapChart',
                'CandlestickChart',
                'RadarChart',
                'BoxplotChart',
                'HeatmapChart',
                'GraphChart',
                'TreeChart',
                'TreemapChart',
                'SunburstChart',
                'SankeyChart',
                'FunnelChart',
                'GaugeChart'
            ]"
            themeDocs="chart"
            [ptDocs]="ptComponent"
        ></app-doc>
    `
})
export class ChartDemo {
    ptComponent = PTComponent;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'installation',
            label: 'Installation',
            component: InstallationDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'linearea',
            label: 'Line Styles',
            component: LineAreaDoc
        },
        {
            id: 'bar',
            label: 'Bar',
            component: BarDoc
        },
        {
            id: 'horizontalbar',
            label: 'Horizontal Bar',
            component: HorizontalBarDoc
        },
        {
            id: 'stackedbar',
            label: 'Stacked Bar',
            component: StackedBarDoc
        },
        {
            id: 'pie',
            label: 'Pie',
            component: PieDoc
        },
        {
            id: 'doughnut',
            label: 'Doughnut',
            component: DoughnutDoc
        },
        {
            id: 'scatter',
            label: 'Scatter',
            component: ScatterDoc
        },
        {
            id: 'candlestick',
            label: 'Candlestick',
            component: CandlestickDoc
        },
        {
            id: 'radar',
            label: 'Radar',
            component: RadarDoc
        },
        {
            id: 'boxplot',
            label: 'Boxplot',
            component: BoxplotDoc
        },
        {
            id: 'heatmap',
            label: 'Heatmap',
            component: HeatmapDoc
        },
        {
            id: 'map',
            label: 'Geo / Map',
            component: MapDoc
        },
        {
            id: 'graph',
            label: 'Graph',
            component: GraphDoc
        },
        {
            id: 'tree',
            label: 'Tree',
            component: TreeDoc
        },
        {
            id: 'treemap',
            label: 'Treemap',
            component: TreemapDoc
        },
        {
            id: 'sunburst',
            label: 'Sunburst',
            component: SunburstDoc
        },
        {
            id: 'sankey',
            label: 'Sankey',
            component: SankeyDoc
        },
        {
            id: 'funnel',
            label: 'Funnel',
            component: FunnelDoc
        },
        {
            id: 'gauge',
            label: 'Gauge',
            component: GaugeDoc
        },
        {
            id: 'dataset',
            label: 'Dataset',
            component: DatasetDoc
        },
        {
            id: 'richtext',
            label: 'Rich Text',
            component: RichTextDoc
        },
        {
            id: 'combo',
            label: 'Combo',
            component: ComboDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
