import { NgModule } from '@angular/core';
import { SharedModule } from '@bdspark/sparkng/api';
import { BarChart } from '../components/barchart';
import { BoxplotChart } from '../components/boxplotchart';
import { CandlestickChart } from '../components/candlestickchart';
import { UIChart } from '../components/chart';
import { FunnelChart } from '../components/funnelchart';
import { GaugeChart } from '../components/gaugechart';
import { GraphChart } from '../components/graphchart';
import { HeatmapChart } from '../components/heatmapchart';
import { LineChart } from '../components/linechart';
import { MapChart } from '../components/mapchart';
import { PieChart } from '../components/piechart';
import { RadarChart } from '../components/radarchart';
import { SankeyChart } from '../components/sankeychart';
import { ScatterChart } from '../components/scatterchart';
import { SunburstChart } from '../components/sunburstchart';
import { TreeChart } from '../components/treechart';
import { TreemapChart } from '../components/treemapchart';

const CHARTS = [UIChart, LineChart, BarChart, PieChart, ScatterChart, MapChart, CandlestickChart, RadarChart, BoxplotChart, HeatmapChart, GraphChart, TreeChart, TreemapChart, SunburstChart, SankeyChart, FunnelChart, GaugeChart];

/**
 * Module that groups every chart component. All charts are also exported as
 * standalone components for direct imports.
 *
 * @module chartmodule
 */
@NgModule({
    imports: [...CHARTS],
    exports: [SharedModule, ...CHARTS]
})
export class ChartModule {}
