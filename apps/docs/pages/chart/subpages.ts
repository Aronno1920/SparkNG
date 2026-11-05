import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/chart/accessibility-doc';
import { Component } from '@angular/core';
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
import { BasicBarDoc } from '@/doc/chart/bar/basic-bar-doc';
import { AxisAlignWithTickDoc } from '@/doc/chart/bar/axis-align-with-tick-doc';
import { BarWithBackgroundDoc } from '@/doc/chart/bar/bar-with-background-doc';
import { SetStyleOfSingleBarDoc } from '@/doc/chart/bar/set-style-of-single-bar-doc';
import { WaterfallBarDoc } from '@/doc/chart/bar/waterfall-bar-doc';
import { BarNegativeValueDoc } from '@/doc/chart/bar/bar-negative-value-doc';
import { RadialPolarBarLabelDoc } from '@/doc/chart/bar/radial-polar-bar-label-doc';
import { TangentialPolarBarLabelDoc } from '@/doc/chart/bar/tangential-polar-bar-label-doc';
import { WorldPopulationDoc } from '@/doc/chart/bar/world-population-doc';
import { PolarEndAngleDoc } from '@/doc/chart/bar/polar-end-angle-doc';
import { BarAxisBreaksDoc } from '@/doc/chart/bar/bar-axis-breaks-doc';
import { ClickableColumnGradientDoc } from '@/doc/chart/bar/clickable-column-gradient-doc';
import { BarLabelRotationDoc } from '@/doc/chart/bar/bar-label-rotation-doc';
import { StackedColumnDoc } from '@/doc/chart/bar/stacked-column-doc';
import { StackedBarBorderRadiusDoc } from '@/doc/chart/bar/stacked-bar-border-radius-doc';
import { StackedBarNormalizationDoc } from '@/doc/chart/bar/stacked-bar-normalization-doc';
import { StackedBarNormalizationVariationDoc } from '@/doc/chart/bar/stacked-bar-normalization-variation-doc';
import { StackedHorizontalBarDoc } from '@/doc/chart/bar/stacked-horizontal-bar-doc';
import { BrushSelectColumnDoc } from '@/doc/chart/bar/brush-select-column-doc';
import { RainfallAndEvaporationDoc } from '@/doc/chart/bar/rainfall-and-evaporation-doc';
import { MixedLineAndBarDoc } from '@/doc/chart/bar/mixed-line-and-bar-doc';
import { MultipleYAxesDoc } from '@/doc/chart/bar/multiple-y-axes-doc';
import { AnimationDelayDoc } from '@/doc/chart/bar/animation-delay-doc';
import { BarRaceDoc } from '@/doc/chart/bar/bar-race-doc';
import { BarMultiDrilldownDoc } from '@/doc/chart/bar/bar-multi-drilldown-doc';
import { WeatherStatisticsDoc } from '@/doc/chart/bar/weather-statistics-doc';
import { DynamicDataDoc } from '@/doc/chart/bar/dynamic-data-doc';
import { BarPolarDoc } from '@/doc/chart/bar/bar-polar-doc';
import { StackedBarPolarDoc } from '@/doc/chart/bar/stacked-bar-polar-doc';
import { StackedBarPolarRadialDoc } from '@/doc/chart/bar/stacked-bar-polar-radial-doc';
import { RoundedBarPolarDoc } from '@/doc/chart/bar/rounded-bar-polar-doc';
import { BarAxisBreaksBrushDoc } from '@/doc/chart/bar/bar-axis-breaks-brush-doc';
import { SortDataBarDoc } from '@/doc/chart/bar/sort-data-bar-doc';
import { MixZoomOnValueDoc } from '@/doc/chart/bar/mix-zoom-on-value-doc';
import { LargeScaleBarDoc } from '@/doc/chart/bar/large-scale-bar-doc';
import { BarDrilldownAnimationDoc } from '@/doc/chart/bar/bar-drilldown-animation-doc';
import { FinanceIndicesDoc } from '@/doc/chart/bar/finance-indices-doc';
import { WatermarkEchartsDownloadDoc } from '@/doc/chart/bar/watermark-echarts-download-doc';
import { RefererWebsiteDoc } from '@/doc/chart/pie/referer-website-doc';
import { DoughnutRoundedDoc } from '@/doc/chart/pie/doughnut-rounded-doc';
import { DoughnutChartDoc } from '@/doc/chart/pie/doughnut-chart-doc';
import { HalfDoughnutDoc } from '@/doc/chart/pie/half-doughnut-doc';
import { PiePadAngleDoc } from '@/doc/chart/pie/pie-pad-angle-doc';
import { CustomizedPieDoc } from '@/doc/chart/pie/customized-pie-doc';
import { TexturePieDoc } from '@/doc/chart/pie/texture-pie-doc';
import { NightingaleChartDoc } from '@/doc/chart/pie/nightingale-chart-doc';
import { PieLabelAlignDoc } from '@/doc/chart/pie/pie-label-align-doc';
import { LabelLineAdjustDoc } from '@/doc/chart/pie/label-line-adjust-doc';
import { PieScrollableLegendDoc } from '@/doc/chart/pie/pie-scrollable-legend-doc';
import { PieSpecialLabelDoc } from '@/doc/chart/pie/pie-special-label-doc';
import { NestedPiesDoc } from '@/doc/chart/pie/nested-pies-doc';
import { PartitionDataPiesDoc } from '@/doc/chart/pie/partition-data-pies-doc';
import { CalendarPieDoc } from '@/doc/chart/pie/calendar-pie-doc';
import { DefaultArrangementPieDoc } from '@/doc/chart/pie/default-arrangement-pie-doc';
import { BasicScatterDoc } from '@/doc/chart/scatter/basic-scatter-doc';
import { AnscombQuartetDoc } from '@/doc/chart/scatter/anscomb-quartet-doc';
import { EffectScatterDoc } from '@/doc/chart/scatter/effect-scatter-doc';
import { ScatterSingleAxisDoc } from '@/doc/chart/scatter/scatter-single-axis-doc';
import { HeightWeightDistributionDoc } from '@/doc/chart/scatter/height-weight-distribution-doc';
import { BubbleChartDoc } from '@/doc/chart/scatter/bubble-chart-doc';
import { ScatterAqiColorDoc } from '@/doc/chart/scatter/scatter-aqi-color-doc';
import { ScatterNutrientsDoc } from '@/doc/chart/scatter/scatter-nutrients-doc';
import { LifeExpectancyGdpDoc } from '@/doc/chart/scatter/life-expectancy-gdp-doc';
import { ScatterMatrixDoc } from '@/doc/chart/scatter/scatter-matrix-doc';
import { ClusteringProcessDoc } from '@/doc/chart/scatter/clustering-process-doc';
import { ExponentialRegressionDoc } from '@/doc/chart/scatter/exponential-regression-doc';
import { LinearRegressionDoc } from '@/doc/chart/scatter/linear-regression-doc';
import { PolynomialRegressionDoc } from '@/doc/chart/scatter/polynomial-regression-doc';
import { ScatterJitteringDoc } from '@/doc/chart/scatter/scatter-jittering-doc';
import { PunchCardGithubDoc } from '@/doc/chart/scatter/punch-card-github-doc';
import { AggregateScatterToBarDoc } from '@/doc/chart/scatter/aggregate-scatter-to-bar-doc';
import { SymbolShapeMorphDoc } from '@/doc/chart/scatter/symbol-shape-morph-doc';
import { LargeScatterDoc } from '@/doc/chart/scatter/large-scatter-doc';
import { ScatterNebulaDoc } from '@/doc/chart/scatter/scatter-nebula-doc';
import { VisualInteractionStreamDoc } from '@/doc/chart/scatter/visual-interaction-stream-doc';
import { MasterPainterChoicesDoc } from '@/doc/chart/scatter/master-painter-choices-doc';
import { LogarithmicRegressionDoc } from '@/doc/chart/scatter/logarithmic-regression-doc';
import { CalendarChartsDoc } from '@/doc/chart/scatter/calendar-charts-doc';
import { GeoGraphDoc } from '@/doc/chart/map/geo-graph-doc';
import { GeoChoroplethScatterDoc } from '@/doc/chart/map/geo-choropleth-scatter-doc';
import { PopulationDensityHkDoc } from '@/doc/chart/map/population-density-hk-doc';
import { UsaPopulationEstimatesDoc } from '@/doc/chart/map/usa-population-estimates-doc';
import { UsaChoroplethProjectionDoc } from '@/doc/chart/map/usa-choropleth-projection-doc';
import { GeoBeefCutsDoc } from '@/doc/chart/map/geo-beef-cuts-doc';
import { FlightSeatmapDoc } from '@/doc/chart/map/flight-seatmap-doc';
import { GeoSvgLinesDoc } from '@/doc/chart/map/geo-svg-lines-doc';
import { GeoSvgTrafficDoc } from '@/doc/chart/map/geo-svg-traffic-doc';
import { MorphingMapBarDoc } from '@/doc/chart/map/morphing-map-bar-doc';
import { HexagonalBinningDoc } from '@/doc/chart/map/hexagonal-binning-doc';
import { BasicCandlestickDoc } from '@/doc/chart/candlestick/basic-candlestick-doc';
import { OhlcChartDoc } from '@/doc/chart/candlestick/ohlc-chart-doc';
import { ShanghaiIndexDoc } from '@/doc/chart/candlestick/shanghai-index-doc';
import { LargeScaleCandlestickDoc } from '@/doc/chart/candlestick/large-scale-candlestick-doc';
import { AxisPointerLinkDoc } from '@/doc/chart/candlestick/axis-pointer-link-doc';
import { CandlestickBrushDoc } from '@/doc/chart/candlestick/candlestick-brush-doc';
import { IntradayChartBreaksDoc } from '@/doc/chart/candlestick/intraday-chart-breaks-doc';
import { IntradayChartBreaks2Doc } from '@/doc/chart/candlestick/intraday-chart-breaks-2-doc';
import { ShanghaiIndex2015Doc } from '@/doc/chart/candlestick/shanghai-index-2015-doc';
import { MatrixStockAppDoc } from '@/doc/chart/candlestick/matrix-stock-app-doc';
import { BasicRadarDoc } from '@/doc/chart/radar/basic-radar-doc';
import { AqiRadarDoc } from '@/doc/chart/radar/aqi-radar-doc';
import { CustomizedRadarDoc } from '@/doc/chart/radar/customized-radar-doc';
import { BrowserProportionRadarDoc } from '@/doc/chart/radar/browser-proportion-radar-doc';
import { MultipleRadarDoc } from '@/doc/chart/radar/multiple-radar-doc';
import { DataTransformAggregateDoc } from '@/doc/chart/boxplot/data-transform-aggregate-doc';
import { BoxplotLightVelocityDoc } from '@/doc/chart/boxplot/boxplot-light-velocity-doc';
import { BoxplotLightVelocity2Doc } from '@/doc/chart/boxplot/boxplot-light-velocity2-doc';
import { MultipleCategoriesBoxplotDoc } from '@/doc/chart/boxplot/multiple-categories-boxplot-doc';
import { BasicHeatmapDoc } from '@/doc/chart/heatmap/basic-heatmap-doc';
import { CalendarHeatmapDoc } from '@/doc/chart/heatmap/calendar-heatmap-doc';
import { DiscreteHeatmapDoc } from '@/doc/chart/heatmap/discrete-heatmap-doc';
import { PolarHeatmapDoc } from '@/doc/chart/heatmap/polar-heatmap-doc';
import { ContinuousHeatmapDoc } from '@/doc/chart/heatmap/continuous-heatmap-doc';
import { BasicGraphDoc } from '@/doc/chart/graph/basic-graph-doc';
import { ForceDirectedGraphDoc } from '@/doc/chart/graph/force-directed-graph-doc';
import { CircularLayoutGraphDoc } from '@/doc/chart/graph/circular-layout-graph-doc';
import { CategoriesGraphDoc } from '@/doc/chart/graph/categories-graph-doc';
import { NpmDependenciesGraphDoc } from '@/doc/chart/graph/npm-dependencies-graph-doc';
import { BasicTreeDoc } from '@/doc/chart/tree/basic-tree-doc';
import { LeftToRightTreeDoc } from '@/doc/chart/tree/left-to-right-tree-doc';
import { TopToBottomTreeDoc } from '@/doc/chart/tree/top-to-bottom-tree-doc';
import { RadialTreeDoc } from '@/doc/chart/tree/radial-tree-doc';
import { MultipleTreesDoc } from '@/doc/chart/tree/multiple-trees-doc';
import { BasicTreemapDoc } from '@/doc/chart/treemap/basic-treemap-doc';
import { DiskUsageDoc } from '@/doc/chart/treemap/disk-usage-doc';
import { ShowParentLabelsDoc } from '@/doc/chart/treemap/show-parent-labels-doc';
import { GradientMappingTreemapDoc } from '@/doc/chart/treemap/gradient-mapping-treemap-doc';
import { HowTrillionSpentDoc } from '@/doc/chart/treemap/how-trillion-spent-doc';
import { TransitionTreemapSunburstDoc } from '@/doc/chart/treemap/transition-treemap-sunburst-doc';
import { BasicSunburstDoc } from '@/doc/chart/sunburst/basic-sunburst-doc';
import { SunburstRoundedCornerDoc } from '@/doc/chart/sunburst/sunburst-rounded-corner-doc';
import { SunburstLabelRotateDoc } from '@/doc/chart/sunburst/sunburst-label-rotate-doc';
import { MonochromeSunburstDoc } from '@/doc/chart/sunburst/monochrome-sunburst-doc';
import { SunburstVisualmapDoc } from '@/doc/chart/sunburst/sunburst-visualmap-doc';
import { DrinkFlavorsDoc } from '@/doc/chart/sunburst/drink-flavors-doc';
import { BookRecordsDoc } from '@/doc/chart/sunburst/book-records-doc';
import { BasicSankeyDoc } from '@/doc/chart/sankey/basic-sankey-doc';
import { SankeyOrientVerticalDoc } from '@/doc/chart/sankey/sankey-orient-vertical-doc';
import { ItemstyleEachNodeSankeyDoc } from '@/doc/chart/sankey/itemstyle-each-node-sankey-doc';
import { SankeyLevelsSettingDoc } from '@/doc/chart/sankey/sankey-levels-setting-doc';
import { GradientEdgeSankeyDoc } from '@/doc/chart/sankey/gradient-edge-sankey-doc';
import { NodeAlignLeftSankeyDoc } from '@/doc/chart/sankey/node-align-left-sankey-doc';
import { NodeAlignRightSankeyDoc } from '@/doc/chart/sankey/node-align-right-sankey-doc';
import { BasicFunnelDoc } from '@/doc/chart/funnel/basic-funnel-doc';
import { FunnelCompareDoc } from '@/doc/chart/funnel/funnel-compare-doc';
import { CustomizedFunnelDoc } from '@/doc/chart/funnel/customized-funnel-doc';
import { MultipleFunnelsDoc } from '@/doc/chart/funnel/multiple-funnels-doc';
import { GaugeBasicDoc } from '@/doc/chart/gauge/gauge-basic-doc';
import { SimpleGaugeDoc } from '@/doc/chart/gauge/simple-gauge-doc';
import { SpeedGaugeDoc } from '@/doc/chart/gauge/speed-gauge-doc';
import { ProgressGaugeDoc } from '@/doc/chart/gauge/progress-gauge-doc';
import { StageSpeedGaugeDoc } from '@/doc/chart/gauge/stage-speed-gauge-doc';
import { GradeGaugeDoc } from '@/doc/chart/gauge/grade-gauge-doc';
import { MultiTitleGaugeDoc } from '@/doc/chart/gauge/multi-title-gauge-doc';
import { TemperatureGaugeDoc } from '@/doc/chart/gauge/temperature-gauge-doc';
import { RingGaugeDoc } from '@/doc/chart/gauge/ring-gauge-doc';
import { ClockGaugeDoc } from '@/doc/chart/gauge/clock-gauge-doc';
import { GaugeCarDoc } from '@/doc/chart/gauge/gauge-car-doc';
import { GaugeBarometerDoc } from '@/doc/chart/gauge/gauge-barometer-doc';
import { SimpleDatasetDoc } from '@/doc/chart/dataset/simple-dataset-doc';
import { DatasetObjectArrayDoc } from '@/doc/chart/dataset/dataset-object-array-doc';
import { SeriesLayoutColumnRowDoc } from '@/doc/chart/dataset/series-layout-column-row-doc';
import { SimpleEncodeDoc } from '@/doc/chart/dataset/simple-encode-doc';
import { ShareDatasetDoc } from '@/doc/chart/dataset/share-dataset-doc';
import { EncodeAndMatrixDoc } from '@/doc/chart/dataset/encode-and-matrix-doc';
import { TooltipDatazoomMobileDoc } from '@/doc/chart/dataset/tooltip-datazoom-mobile-doc';
import { LargeScaleAreaChartDoc } from '@/doc/chart/dataset/large-scale-area-chart-doc';
import { GanttAirportFlightsDoc } from '@/doc/chart/dataset/gantt-airport-flights-doc';
import { WindBarbDoc } from '@/doc/chart/dataset/wind-barb-doc';
import { ErrorScatterCartesianDoc } from '@/doc/chart/dataset/error-scatter-cartesian-doc';
import { BasicRichTextDoc } from '@/doc/chart/richtext/basic-richtext-doc';
import { PieRichTextDoc } from '@/doc/chart/richtext/pie-richtext-doc';
import { WeatherRichTextDoc } from '@/doc/chart/richtext/weather-richtext-doc';
import { AxisRichTextDoc } from '@/doc/chart/richtext/axis-richtext-doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Bar Chart Component - SparkNG" header="Bar" description="Bar charts visualize discrete categories as horizontal or vertical rectangular columns." [docs]="docs" [apiDocs]="['BarChart']"></app-doc> `
})
export class BarChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: BarUsageDoc },
        { id: 'basic-bar', label: 'Basic Bar', component: BasicBarDoc },
        { id: 'axis-align-with-tick', label: 'Axis Align with Tick', component: AxisAlignWithTickDoc },
        { id: 'bar-with-background', label: 'Bar with Background', component: BarWithBackgroundDoc },
        { id: 'set-style-of-single-bar', label: 'Set Style of Single Bar', component: SetStyleOfSingleBarDoc },
        { id: 'waterfall-bar', label: 'Waterfall Chart', component: WaterfallBarDoc },
        { id: 'bar-negative-value', label: 'Bar Chart with Negative Value', component: BarNegativeValueDoc },
        { id: 'radial-polar-bar-label', label: 'Radial Polar Bar Label Position', component: RadialPolarBarLabelDoc },
        { id: 'tangential-polar-bar-label', label: 'Tangential Polar Bar Label Position', component: TangentialPolarBarLabelDoc },
        { id: 'world-population', label: 'World Population', component: WorldPopulationDoc },
        { id: 'polar-end-angle', label: 'Polar endAngle', component: PolarEndAngleDoc },
        { id: 'bar-axis-breaks', label: 'Bar Chart with Axis Breaks', component: BarAxisBreaksDoc },
        { id: 'clickable-column-gradient', label: 'Clickable Column Chart with Gradient', component: ClickableColumnGradientDoc },
        { id: 'bar-label-rotation', label: 'Bar Label Rotation', component: BarLabelRotationDoc },
        { id: 'stacked-column', label: 'Stacked Column Chart', component: StackedColumnDoc },
        { id: 'stacked-bar-border-radius', label: 'Stacked Bar with borderRadius', component: StackedBarBorderRadiusDoc },
        { id: 'stacked-bar-normalization', label: 'Stacked Bar Normalization', component: StackedBarNormalizationDoc },
        { id: 'stacked-bar-normalization-variation', label: 'Stacked Bar Normalization and Variation', component: StackedBarNormalizationVariationDoc },
        { id: 'stacked-horizontal-bar', label: 'Stacked Horizontal Bar', component: StackedHorizontalBarDoc },
        { id: 'brush-select-column', label: 'Brush Select on Column Chart', component: BrushSelectColumnDoc },
        { id: 'rainfall-and-evaporation', label: 'Rainfall and Evaporation', component: RainfallAndEvaporationDoc },
        { id: 'mixed-line-and-bar', label: 'Mixed Line and Bar', component: MixedLineAndBarDoc },
        { id: 'mix-zoom-on-value', label: 'Mix Zoom On Value', component: MixZoomOnValueDoc },
        { id: 'multiple-y-axes', label: 'Multiple Y Axes', component: MultipleYAxesDoc },
        { id: 'animation-delay', label: 'Animation Delay', component: AnimationDelayDoc },
        { id: 'large-scale-bar', label: 'Large Scale Bar Chart', component: LargeScaleBarDoc },
        { id: 'bar-drilldown-animation', label: 'Bar Chart Drilldown Animation', component: BarDrilldownAnimationDoc },
        { id: 'bar-race', label: 'Bar Race', component: BarRaceDoc },
        { id: 'bar-multi-drilldown', label: 'Bar Chart Multi-level Drilldown Animation', component: BarMultiDrilldownDoc },
        { id: 'weather-statistics', label: 'Weather Statistics', component: WeatherStatisticsDoc },
        { id: 'dynamic-data', label: 'Dynamic Data', component: DynamicDataDoc },
        { id: 'finance-indices', label: 'Finance Indices 2002', component: FinanceIndicesDoc },
        { id: 'watermark-echarts-download', label: 'Watermark - ECharts Download', component: WatermarkEchartsDownloadDoc },
        { id: 'bar-polar', label: 'Bar Chart on Polar', component: BarPolarDoc },
        { id: 'stacked-bar-polar', label: 'Stacked Bar Chart on Polar', component: StackedBarPolarDoc },
        { id: 'stacked-bar-polar-radial', label: 'Stacked Bar Chart on Polar (Radial)', component: StackedBarPolarRadialDoc },
        { id: 'rounded-bar-polar', label: 'Rounded Bar on Polar', component: RoundedBarPolarDoc },
        { id: 'bar-axis-breaks-brush', label: 'Bar Chart with Axis Breaks (Brush-enabled)', component: BarAxisBreaksBrushDoc },
        { id: 'sort-data-bar', label: 'Sort Data in Bar Chart', component: SortDataBarDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Pie Chart Component - SparkNG" header="Pie" description="Pie charts partition a circular area into radial wedges proportional to category values." [docs]="docs" [apiDocs]="['PieChart']"></app-doc> `
})
export class PieChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: PieUsageDoc },
        { id: 'referer-website', label: 'Referer of a Website', component: RefererWebsiteDoc },
        { id: 'doughnut-rounded', label: 'Doughnut Chart with Rounded Corner', component: DoughnutRoundedDoc },
        { id: 'doughnut-chart', label: 'Doughnut Chart', component: DoughnutChartDoc },
        { id: 'half-doughnut', label: 'Half Doughnut Chart', component: HalfDoughnutDoc },
        { id: 'pie-pad-angle', label: 'Pie with padAngle', component: PiePadAngleDoc },
        { id: 'customized-pie', label: 'Customized Pie', component: CustomizedPieDoc },
        { id: 'texture-pie', label: 'Texture on Pie Chart', component: TexturePieDoc },
        { id: 'nightingale-chart', label: 'Nightingale Chart', component: NightingaleChartDoc },
        { id: 'pie-label-align', label: 'Pie Label Align', component: PieLabelAlignDoc },
        { id: 'label-line-adjust', label: 'Label Line Adjust', component: LabelLineAdjustDoc },
        { id: 'pie-scrollable-legend', label: 'Pie with Scrollable Legend', component: PieScrollableLegendDoc },
        { id: 'pie-special-label', label: 'Pie Special Label', component: PieSpecialLabelDoc },
        { id: 'nested-pies', label: 'Nested Pies', component: NestedPiesDoc },
        { id: 'partition-data-pies', label: 'Partition Data to Pies', component: PartitionDataPiesDoc },
        { id: 'default-arrangement-pie', label: 'Default arrangement', component: DefaultArrangementPieDoc },
        { id: 'calendar-pie', label: 'Calendar Pie', component: CalendarPieDoc },
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
            description="Scatter charts display multidimensional observations as geometric points on Cartesian or single-axis planes."
            [docs]="docs"
            [apiDocs]="['ScatterChart']"
        ></app-doc>
    `
})
export class ScatterChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: ScatterUsageDoc },
        { id: 'basic-scatter', label: 'Basic Scatter Chart', component: BasicScatterDoc },
        { id: 'anscomb-quartet', label: "Anscomb's quartet", component: AnscombQuartetDoc },
        { id: 'clustering-process', label: 'Clustering Process', component: ClusteringProcessDoc },
        { id: 'exponential-regression', label: 'Exponential Regression', component: ExponentialRegressionDoc },
        { id: 'effect-scatter', label: 'Effect Scatter Chart', component: EffectScatterDoc },
        { id: 'linear-regression', label: 'Linear Regression', component: LinearRegressionDoc },
        { id: 'polynomial-regression', label: 'Polynomial Regression', component: PolynomialRegressionDoc },
        { id: 'scatter-jittering', label: 'Scatter with Jittering', component: ScatterJitteringDoc },
        { id: 'punch-card-github', label: 'Punch Card of Github', component: PunchCardGithubDoc },
        { id: 'scatter-single-axis', label: 'Scatter on Single Axis', component: ScatterSingleAxisDoc },
        { id: 'height-weight-distribution', label: 'Distribution of Height and Weight', component: HeightWeightDistributionDoc },
        { id: 'aggregate-scatter-to-bar', label: 'Aggregate Scatter to Bar', component: AggregateScatterToBarDoc },
        { id: 'symbol-shape-morph', label: 'Symbol Shape Morph', component: SymbolShapeMorphDoc },
        { id: 'large-scatter', label: 'Large Scatter', component: LargeScatterDoc },
        { id: 'scatter-nebula', label: 'Scatter Nebula', component: ScatterNebulaDoc },
        { id: 'visual-interaction-stream', label: 'Visual interaction with stream', component: VisualInteractionStreamDoc },
        { id: 'bubble-chart', label: 'Bubble Chart', component: BubbleChartDoc },
        { id: 'scatter-aqi-color', label: 'Scatter Aqi Color', component: ScatterAqiColorDoc },
        { id: 'scatter-nutrients', label: 'Scatter Nutrients', component: ScatterNutrientsDoc },
        { id: 'life-expectancy-gdp', label: 'Life Expectancy and GDP', component: LifeExpectancyGdpDoc },
        { id: 'master-painter-choices', label: 'Master Painter Color Choices', component: MasterPainterChoicesDoc },
        { id: 'logarithmic-regression', label: 'Logarithmic Regression', component: LogarithmicRegressionDoc },
        { id: 'scatter-matrix', label: 'Scatter Matrix', component: ScatterMatrixDoc },
        { id: 'calendar-charts', label: 'Calendar Charts', component: CalendarChartsDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Map Chart Component - SparkNG" header="GEO / Map" description="Map charts display geospatial boundaries, choropleths, scatter markers and trajectory overlays." [docs]="docs" [apiDocs]="['MapChart']"></app-doc>
    `
})
export class MapChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: MapUsageDoc },
        { id: 'geo-graph', label: 'Geo Graph', component: GeoGraphDoc },
        { id: 'geo-choropleth-scatter', label: 'Geo Choropleth and Scatter', component: GeoChoroplethScatterDoc },
        { id: 'geo-beef-cuts', label: 'GEO Beef Cuts', component: GeoBeefCutsDoc },
        { id: 'flight-seatmap', label: 'Flight Seatmap with SVG', component: FlightSeatmapDoc },
        { id: 'geo-svg-lines', label: 'GEO SVG Lines', component: GeoSvgLinesDoc },
        { id: 'geo-svg-traffic', label: 'GEO SVG Traffic', component: GeoSvgTrafficDoc },
        { id: 'morphing-map-bar', label: 'Morphing between Map and Bar', component: MorphingMapBarDoc },
        { id: 'population-density-hk', label: 'Population Density of HongKong (2011)', component: PopulationDensityHkDoc },
        { id: 'usa-population-estimates', label: 'USA Population Estimates (2012)', component: UsaPopulationEstimatesDoc },
        { id: 'usa-choropleth-projection', label: 'USA Choropleth Map with Projection', component: UsaChoroplethProjectionDoc },
        { id: 'hexagonal-binning', label: 'Hexagonal Binning', component: HexagonalBinningDoc },
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
            description="Candlestick charts visualize financial asset price action through open-high-low-close bars."
            [docs]="docs"
            [apiDocs]="['CandlestickChart']"
        ></app-doc>
    `
})
export class CandlestickChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: CandlestickUsageDoc },
        { id: 'basic-candlestick', label: 'Basic Candlestick', component: BasicCandlestickDoc },
        { id: 'ohlc-chart', label: 'OHLC Chart', component: OhlcChartDoc },
        { id: 'shanghai-index', label: 'ShangHai Index', component: ShanghaiIndexDoc },
        { id: 'large-scale-candlestick', label: 'Large Scale Candlestick', component: LargeScaleCandlestickDoc },
        { id: 'axis-pointer-link', label: 'Axis Pointer Link and Touch', component: AxisPointerLinkDoc },
        { id: 'intraday-chart-breaks', label: 'Intraday Chart with Breaks', component: IntradayChartBreaksDoc },
        { id: 'intraday-chart-breaks-2', label: 'Intraday Chart with Breaks (II)', component: IntradayChartBreaks2Doc },
        { id: 'candlestick-brush', label: 'Candlestick Brush', component: CandlestickBrushDoc },
        { id: 'shanghai-index-2015', label: 'ShangHai Index, 2015', component: ShanghaiIndex2015Doc },
        { id: 'matrix-stock-app', label: 'Matrix Stock Application', component: MatrixStockAppDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Radar Chart Component - SparkNG" header="Radar" description="Radar charts project multiple quantitative variables across equidistant radial coordinate axes." [docs]="docs" [apiDocs]="['RadarChart']"></app-doc>
    `
})
export class RadarChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: RadarUsageDoc },
        { id: 'basic-radar', label: 'Basic Radar Chart', component: BasicRadarDoc },
        { id: 'aqi-radar', label: 'AQI - Radar Chart', component: AqiRadarDoc },
        { id: 'customized-radar', label: 'Customized Radar Chart', component: CustomizedRadarDoc },
        { id: 'browser-proportion-radar', label: 'Proportion of Browsers', component: BrowserProportionRadarDoc },
        { id: 'multiple-radar', label: 'Multiple Radar', component: MultipleRadarDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Boxplot Chart Component - SparkNG" header="Boxplot" description="Boxplot charts summarize numerical distributions through five-number statistics." [docs]="docs" [apiDocs]="['BoxplotChart']"></app-doc> `
})
export class BoxplotChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: BoxplotUsageDoc },
        { id: 'data-transform-aggregate', label: 'Data Transform Simple Aggregate', component: DataTransformAggregateDoc },
        { id: 'boxplot-light-velocity', label: 'Boxplot Light Velocity', component: BoxplotLightVelocityDoc },
        { id: 'boxplot-light-velocity2', label: 'Boxplot Light Velocity2', component: BoxplotLightVelocity2Doc },
        { id: 'multiple-categories-boxplot', label: 'Multiple Categories', component: MultipleCategoriesBoxplotDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Heatmap Chart Component - SparkNG" header="Heatmap" description="Heatmap charts visualize values in a matrix as color gradations." [docs]="docs" [apiDocs]="['HeatmapChart']"></app-doc> `
})
export class HeatmapChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: HeatmapUsageDoc },
        { id: 'basic-heatmap', label: 'Basic Heatmap', component: BasicHeatmapDoc },
        { id: 'calendar-heatmap', label: 'Calendar Heatmap', component: CalendarHeatmapDoc },
        { id: 'discrete-heatmap', label: 'Discrete Heatmap', component: DiscreteHeatmapDoc },
        { id: 'polar-heatmap', label: 'Polar Heatmap', component: PolarHeatmapDoc },
        { id: 'continuous-heatmap', label: 'Continuous Heatmap', component: ContinuousHeatmapDoc },
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
        { id: 'basic-graph', label: 'Basic Graph', component: BasicGraphDoc },
        { id: 'force-directed-graph', label: 'Force-Directed Graph', component: ForceDirectedGraphDoc },
        { id: 'circular-layout-graph', label: 'Circular Layout', component: CircularLayoutGraphDoc },
        { id: 'categories-graph', label: 'Graph with Categories', component: CategoriesGraphDoc },
        { id: 'npm-dependencies-graph', label: 'NPM Dependencies Graph', component: NpmDependenciesGraphDoc },
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
        { id: 'basic-tree', label: 'Basic Tree', component: BasicTreeDoc },
        { id: 'left-to-right-tree', label: 'Left to Right Tree', component: LeftToRightTreeDoc },
        { id: 'top-to-bottom-tree', label: 'Top to Bottom Tree', component: TopToBottomTreeDoc },
        { id: 'radial-tree', label: 'Radial Tree', component: RadialTreeDoc },
        { id: 'multiple-trees', label: 'Multiple Trees', component: MultipleTreesDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Treemap Chart Component - SparkNG"
            header="Treemap"
            description="Treemap charts display nested hierarchical data structures using proportioned nested rectangles."
            [docs]="docs"
            [apiDocs]="['TreemapChart']"
        ></app-doc>
    `
})
export class TreemapChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: TreemapUsageDoc },
        { id: 'basic-treemap', label: 'Basic Treemap', component: BasicTreemapDoc },
        { id: 'disk-usage', label: 'Disk Usage', component: DiskUsageDoc },
        { id: 'show-parent-labels', label: 'Show Parent Labels', component: ShowParentLabelsDoc },
        { id: 'gradient-mapping-treemap', label: 'Gradient Mapping', component: GradientMappingTreemapDoc },
        { id: 'how-trillion-spent', label: 'How $3.7 Trillion is Spent', component: HowTrillionSpentDoc },
        { id: 'transition-treemap-sunburst', label: 'Transition between Treemap and Sunburst', component: TransitionTreemapSunburstDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Sunburst Chart Component - SparkNG" header="Sunburst" description="Sunburst charts visualize hierarchical data through concentric rings partitioned by value." [docs]="docs" [apiDocs]="['SunburstChart']"></app-doc>
    `
})
export class SunburstChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: SunburstUsageDoc },
        { id: 'basic-sunburst', label: 'Basic Sunburst', component: BasicSunburstDoc },
        { id: 'sunburst-rounded-corner', label: 'Sunburst with Rounded Corner', component: SunburstRoundedCornerDoc },
        { id: 'sunburst-label-rotate', label: 'Sunburst Label Rotate', component: SunburstLabelRotateDoc },
        { id: 'monochrome-sunburst', label: 'Monochrome Sunburst', component: MonochromeSunburstDoc },
        { id: 'sunburst-visualmap', label: 'Sunburst VisualMap', component: SunburstVisualmapDoc },
        { id: 'drink-flavors', label: 'Drink Flavors', component: DrinkFlavorsDoc },
        { id: 'book-records', label: 'Book Records', component: BookRecordsDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc docTitle="Angular Sankey Chart Component - SparkNG" header="Sankey" description="Sankey charts visualize quantity and flow transfer between interconnected network states." [docs]="docs" [apiDocs]="['SankeyChart']"></app-doc>
    `
})
export class SankeyChartDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: SankeyUsageDoc },
        { id: 'basic-sankey', label: 'Basic Sankey', component: BasicSankeyDoc },
        { id: 'sankey-orient-vertical', label: 'Sankey Orient Vertical', component: SankeyOrientVerticalDoc },
        { id: 'itemstyle-each-node-sankey', label: 'Specify ItemStyle for Each Node in Sankey', component: ItemstyleEachNodeSankeyDoc },
        { id: 'sankey-levels-setting', label: 'Sankey with Levels Setting', component: SankeyLevelsSettingDoc },
        { id: 'gradient-edge-sankey', label: 'Gradient Edge', component: GradientEdgeSankeyDoc },
        { id: 'node-align-left-sankey', label: 'Node Align Left in Sankey', component: NodeAlignLeftSankeyDoc },
        { id: 'node-align-right-sankey', label: 'Node Align Right in Sankey', component: NodeAlignRightSankeyDoc },
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
        { id: 'basic-funnel', label: 'Funnel Chart', component: BasicFunnelDoc },
        { id: 'funnel-compare', label: 'Funnel Compare', component: FunnelCompareDoc },
        { id: 'customized-funnel', label: 'Customized Funnel', component: CustomizedFunnelDoc },
        { id: 'multiple-funnels', label: 'Multiple Funnels', component: MultipleFunnelsDoc },
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
        { id: 'gauge-basic', label: 'Gauge Basic chart', component: GaugeBasicDoc },
        { id: 'simple-gauge', label: 'Simple Gauge', component: SimpleGaugeDoc },
        { id: 'speed-gauge', label: 'Speed Gauge', component: SpeedGaugeDoc },
        { id: 'progress-gauge', label: 'Progress Gauge', component: ProgressGaugeDoc },
        { id: 'stage-speed-gauge', label: 'Stage Speed Gauge', component: StageSpeedGaugeDoc },
        { id: 'grade-gauge', label: 'Grade Gauge', component: GradeGaugeDoc },
        { id: 'multi-title-gauge', label: 'Multi Title Gauge', component: MultiTitleGaugeDoc },
        { id: 'temperature-gauge', label: 'Temperature Gauge chart', component: TemperatureGaugeDoc },
        { id: 'ring-gauge', label: 'Ring Gauge', component: RingGaugeDoc },
        { id: 'clock-gauge', label: 'Clock', component: ClockGaugeDoc },
        { id: 'gauge-car', label: 'Gauge Car', component: GaugeCarDoc },
        { id: 'gauge-barometer', label: 'Gauge Barometer chart', component: GaugeBarometerDoc },
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
        { id: 'simple-dataset', label: 'Simple Example of Dataset', component: SimpleDatasetDoc },
        { id: 'dataset-object-array', label: 'Dataset in Object Array', component: DatasetObjectArrayDoc },
        { id: 'series-layout-column-row', label: 'Series Layout By Column or Row', component: SeriesLayoutColumnRowDoc },
        { id: 'simple-encode', label: 'Simple Encode', component: SimpleEncodeDoc },
        { id: 'share-dataset', label: 'Share Dataset', component: ShareDatasetDoc },
        { id: 'encode-and-matrix', label: 'Encode and Matrix', component: EncodeAndMatrixDoc },
        { id: 'tooltip-datazoom-mobile', label: 'Tooltip and DataZoom on Mobile', component: TooltipDatazoomMobileDoc },
        { id: 'large-scale-area-chart', label: 'Large scale area chart', component: LargeScaleAreaChartDoc },
        { id: 'gantt-airport-flights', label: 'Gantt Chart of Airport Flights', component: GanttAirportFlightsDoc },
        { id: 'wind-barb', label: 'Wind Barb', component: WindBarbDoc },
        { id: 'error-scatter-cartesian', label: 'Error Scatter on Cartesian', component: ErrorScatterCartesianDoc },
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
        { id: 'basic-richtext', label: 'Basic Rich Text', component: BasicRichTextDoc },
        { id: 'pie-richtext', label: 'Pie Rich Text', component: PieRichTextDoc },
        { id: 'weather-richtext', label: 'Weather Rich Text', component: WeatherRichTextDoc },
        { id: 'axis-richtext', label: 'Axis Rich Text', component: AxisRichTextDoc },
        { id: 'accessibility', label: 'Accessibility', component: AccessibilityDoc }
    ];
}
