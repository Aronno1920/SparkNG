import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/chart/accessibility-doc';
import { BarDoc } from '@/doc/chart/bar-doc';
import { BoxplotDoc } from '@/doc/chart/boxplot-doc';
import { CandlestickDoc } from '@/doc/chart/candlestick-doc';
import { DatasetDoc } from '@/doc/chart/dataset-doc';
import { DoughnutDoc } from '@/doc/chart/doughnut-doc';
import { FunnelDoc } from '@/doc/chart/funnel-doc';
import { GaugeDoc } from '@/doc/chart/gauge-doc';
import { GraphDoc } from '@/doc/chart/graph-doc';
import { HeatmapDoc } from '@/doc/chart/heatmap-doc';
import { HorizontalBarDoc } from '@/doc/chart/horizontalbar-doc';
import { MapDoc } from '@/doc/chart/map-doc';
import { PieDoc } from '@/doc/chart/pie-doc';
import { RadarDoc } from '@/doc/chart/radar-doc';
import { RichTextDoc } from '@/doc/chart/richtext-doc';
import { SankeyDoc } from '@/doc/chart/sankey-doc';
import { ScatterDoc } from '@/doc/chart/scatter-doc';
import { StackedBarDoc } from '@/doc/chart/stackedbar-doc';
import { SunburstDoc } from '@/doc/chart/sunburst-doc';
import { TreeDoc } from '@/doc/chart/tree-doc';
import { TreemapDoc } from '@/doc/chart/treemap-doc';
import {
    BarUsageDoc,
    BoxplotUsageDoc,
    CandlestickUsageDoc,
    DatasetUsageDoc,
    FunnelUsageDoc,
    GaugeUsageDoc,
    GraphUsageDoc,
    HeatmapUsageDoc,
    MapUsageDoc,
    PieUsageDoc,
    RadarUsageDoc,
    RichTextUsageDoc,
    SankeyUsageDoc,
    ScatterUsageDoc,
    SunburstUsageDoc,
    TreeUsageDoc,
    TreemapUsageDoc
} from '@/doc/chart/usage-docs';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Bar Chart Component - SparkNG" header="Bar" description="Bar chart visualizes categorical comparisons with vertical or horizontal bars, optionally stacked." [docs]="docs" [apiDocs]="['BarChart']"></app-doc>
    `
})
export class BarChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: BarUsageDoc },
        { id: 'basic', label: 'Basic Bar', component: BarDoc },
        { id: 'horizontal', label: 'Horizontal Bar', component: HorizontalBarDoc },
        { id: 'stacked', label: 'Stacked Bar', component: StackedBarDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Pie Chart Component - SparkNG" header="Pie" description="Pie chart is a circular statistical graphic divided into slices to illustrate numerical proportions." [docs]="docs" [apiDocs]="['PieChart']"></app-doc>
    `
})
export class PieChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: PieUsageDoc },
        { id: 'basic', label: 'Basic Pie', component: PieDoc },
        { id: 'doughnut', label: 'Doughnut', component: DoughnutDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Scatter Chart Component - SparkNG"
            header="Scatter"
            description="Scatter chart plots [x, y] coordinates to reveal correlations and distributions between measures."
            [docs]="docs"
            [apiDocs]="['ScatterChart']"
        ></app-doc>
    `
})
export class ScatterChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: ScatterUsageDoc },
        { id: 'basic', label: 'Scatter', component: ScatterDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Map Chart Component - SparkNG" header="GEO/Map" description="Map charts visualize geographical statistical data projected across registered GeoJSON maps." [docs]="docs" [apiDocs]="['MapChart']"></app-doc> `
})
export class MapChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: MapUsageDoc },
        { id: 'basic', label: 'Map', component: MapDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Candlestick Chart Component - SparkNG"
            header="Candlestick"
            description="Candlestick chart visualizes financial time-series showing open, close, lowest, and highest prices."
            [docs]="docs"
            [apiDocs]="['CandlestickChart']"
        ></app-doc>
    `
})
export class CandlestickChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: CandlestickUsageDoc },
        { id: 'basic', label: 'Candlestick', component: CandlestickDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Radar Chart Component - SparkNG"
            header="Radar"
            description="Radar chart plots multivariate data on a two-dimensional chart of three or more quantitative variables represented on axes starting from the same point."
            [docs]="docs"
            [apiDocs]="['RadarChart']"
        ></app-doc>
    `
})
export class RadarChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: RadarUsageDoc },
        { id: 'basic', label: 'Radar', component: RadarDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Boxplot Chart Component - SparkNG" header="Boxplot" description="Boxplot visualizes statistical distributions through quartiles, medians, and outliers." [docs]="docs" [apiDocs]="['Chart']"></app-doc> `
})
export class BoxplotChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: BoxplotUsageDoc },
        { id: 'basic', label: 'Boxplot', component: BoxplotDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Heatmap Chart Component - SparkNG" header="Heatmap" description="Heatmap charts visualize values in a matrix as color gradations." [docs]="docs" [apiDocs]="['Chart']"></app-doc> `
})
export class HeatmapChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: HeatmapUsageDoc },
        { id: 'basic', label: 'Heatmap', component: HeatmapDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Graph Chart Component - SparkNG"
            header="Graph"
            description="Graph charts visualize network topologies, nodes and relations using force-directed or circular layouts."
            [docs]="docs"
            [apiDocs]="['GraphChart']"
        ></app-doc>
    `
})
export class GraphChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: GraphUsageDoc },
        { id: 'basic', label: 'Graph', component: GraphDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Tree Chart Component - SparkNG" header="Tree" description="Tree charts visualize hierarchical data as an orthogonal or radial tree diagram." [docs]="docs" [apiDocs]="['TreeChart']"></app-doc> `
})
export class TreeChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: TreeUsageDoc },
        { id: 'basic', label: 'Tree', component: TreeDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Treemap Chart Component - SparkNG" header="Treemap" description="Treemap charts display hierarchical data as a set of nested, proportionally-sized rectangles." [docs]="docs" [apiDocs]="['Chart']"></app-doc>
    `
})
export class TreemapChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: TreemapUsageDoc },
        { id: 'basic', label: 'Treemap', component: TreemapDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Sunburst Chart Component - SparkNG" header="Sunburst" description="Sunburst charts visualize hierarchical data displayed in concentric rings." [docs]="docs" [apiDocs]="['SunburstChart']"></app-doc> `
})
export class SunburstChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: SunburstUsageDoc },
        { id: 'basic', label: 'Sunburst', component: SunburstDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Sankey Chart Component - SparkNG" header="Sankey" description="Sankey diagrams visualize flow and transfer quantities between stages of a network." [docs]="docs" [apiDocs]="['SankeyChart']"></app-doc> `
})
export class SankeyChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: SankeyUsageDoc },
        { id: 'basic', label: 'Sankey', component: SankeyDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Funnel Chart Component - SparkNG" header="Funnel" description="Funnel charts visualize progressive narrowing stages of a workflow or conversion pipeline." [docs]="docs" [apiDocs]="['FunnelChart']"></app-doc>
    `
})
export class FunnelChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: FunnelUsageDoc },
        { id: 'basic', label: 'Funnel', component: FunnelDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Gauge Chart Component - SparkNG" header="Gauge" description="Gauge charts display a metric value on a radial meter with pointers and progress arcs." [docs]="docs" [apiDocs]="['GaugeChart']"></app-doc> `
})
export class GaugeChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: GaugeUsageDoc },
        { id: 'basic', label: 'Gauge', component: GaugeDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Dataset Chart Component - SparkNG" header="Dataset" description="Dataset component decouples data management and transforms from series styling." [docs]="docs" [apiDocs]="['Chart']"></app-doc> `
})
export class DatasetChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: DatasetUsageDoc },
        { id: 'basic', label: 'Dataset', component: DatasetDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Rich Text Chart Component - SparkNG" header="Rich Text" description="Rich Text formatting supports stylized labels, badges, backgrounds and images within charts." [docs]="docs" [apiDocs]="['Chart']"></app-doc>
    `
})
export class RichTextChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: RichTextUsageDoc },
        { id: 'basic', label: 'Rich Text', component: RichTextDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}
