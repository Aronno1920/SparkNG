import { ChartDemo } from './';
import {
    BarChartDemo,
    BoxplotChartDemo,
    CandlestickChartDemo,
    DatasetChartDemo,
    FunnelChartDemo,
    GaugeChartDemo,
    GraphChartDemo,
    HeatmapChartDemo,
    MapChartDemo,
    ParallelChartDemo,
    PieChartDemo,
    RadarChartDemo,
    RichTextChartDemo,
    SankeyChartDemo,
    ScatterChartDemo,
    SunburstChartDemo,
    TreeChartDemo,
    TreemapChartDemo
} from './subpages';

export default [
    {
        path: '',
        component: ChartDemo
    },
    {
        path: 'line',
        loadChildren: () => import('@/pages/linecharts/routes')
    },
    {
        path: 'bar',
        component: BarChartDemo
    },
    {
        path: 'pie',
        component: PieChartDemo
    },
    {
        path: 'scatter',
        component: ScatterChartDemo
    },
    {
        path: 'map',
        component: MapChartDemo
    },
    {
        path: 'candlestick',
        component: CandlestickChartDemo
    },
    {
        path: 'radar',
        component: RadarChartDemo
    },
    {
        path: 'boxplot',
        component: BoxplotChartDemo
    },
    {
        path: 'heatmap',
        component: HeatmapChartDemo
    },
    {
        path: 'graph',
        component: GraphChartDemo
    },
    {
        path: 'tree',
        component: TreeChartDemo
    },
    {
        path: 'treemap',
        component: TreemapChartDemo
    },
    {
        path: 'sunburst',
        component: SunburstChartDemo
    },
    {
        path: 'sankey',
        component: SankeyChartDemo
    },
    {
        path: 'parallel',
        component: ParallelChartDemo
    },
    {
        path: 'funnel',
        component: FunnelChartDemo
    },
    {
        path: 'gauge',
        component: GaugeChartDemo
    },
    {
        path: 'dataset',
        component: DatasetChartDemo
    },
    {
        path: 'richtext',
        component: RichTextChartDemo
    }
];
