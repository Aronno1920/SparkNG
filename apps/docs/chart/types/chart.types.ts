/**
 * @file
 * Shared types of the SparkNG chart module powered by SparkNG Charts.
 *
 * The module re-exports the relevant public types so that applications
 * never need to import low-level engine types directly for typing purposes.
 *
 * @module charttypes
 */
import type {
    BarSeriesOption,
    CandlestickSeriesOption,
    ECElementEvent,
    SparkChartsType,
    SparkChartsOption,
    FunnelSeriesOption,
    GaugeSeriesOption,
    GraphSeriesOption,
    LineSeriesOption,
    MapSeriesOption,
    PieSeriesOption,
    RadarSeriesOption,
    SankeySeriesOption,
    ScatterSeriesOption,
    SunburstSeriesOption,
    TreeSeriesOption
} from '@bdspark/sparkng-charts';

// Re-exported chart engine public types for consumer convenience.
export type {
    AriaComponentOption,
    BarSeriesOption,
    CandlestickSeriesOption,
    DatasetComponentOption,
    DataZoomComponentOption,
    SparkChartsInitOpts,
    SparkChartsCoreOption,
    SparkChartsOption,
    ECElementEvent,
    SparkChartsType,
    FunnelSeriesOption,
    GaugeSeriesOption,
    GeoComponentOption,
    GraphSeriesOption,
    GridComponentOption,
    GraphicComponentOption,
    LegendComponentOption,
    LineSeriesOption,
    MapSeriesOption,
    PieSeriesOption,
    RadarComponentOption,
    RadarSeriesOption,
    ResizeOpts,
    SankeySeriesOption,
    ScatterSeriesOption,
    SeriesOption,
    SetOptionOpts,
    SunburstSeriesOption,
    TitleComponentOption,
    ToolboxComponentOption,
    TooltipComponentOption,
    TreeSeriesOption,
    VisualMapComponentOption,
    XAxisComponentOption,
    YAxisComponentOption
} from '@bdspark/sparkng-charts';

/**
 * A running chart instance as returned by the chart engine. Exposed through the
 * `chart` property of every chart component and through {@link ChartInitEvent}.
 * @group Interface
 */
export type SparkChartInstance = SparkChartsType;
export type SChartInstance = SparkChartsType;
export type SChartsOption = SparkChartsOption;
export type SChartTheme = SparkChartTheme;

/**
 * Chart theme object accepted by the `theme` property of the chart components.
 * @group Interface
 */
export interface SparkChartTheme {
    color?: string[];
    backgroundColor?: string;
    textStyle?: Record<string, any>;
    [key: string]: any;
}

/**
 * Payload emitted when the underlying chart finishes initialization.
 * @see {@link BaseChart.onChartInit}
 * @group Interface
 */
export interface ChartInitEvent {
    /**
     * The raw chart instance that was just created.
     */
    chart: SparkChartsType;
}

/**
 * Payload emitted by the chart mouse events. Mirrors the engine
 * `ECElementEvent` and additionally carries the native DOM event.
 * @see {@link BaseChart.onChartClick}
 * @see {@link BaseChart.onChartDblClick}
 * @see {@link BaseChart.onChartMouseOver}
 * @see {@link BaseChart.onChartMouseOut}
 * @group Interface
 */
export interface ChartMouseEvent extends ECElementEvent {
    /**
     * The native DOM event that triggered the interaction, when available.
     */
    originalEvent?: Event;
}

/**
 * Simple series data of the {@link LineChart} component.
 * @group Interface
 */
export type LineChartData = NonNullable<LineSeriesOption['data']>;

/**
 * Simple series data of the {@link BarChart} component.
 * @group Interface
 */
export type BarChartData = NonNullable<BarSeriesOption['data']>;

/**
 * Simple series data of the {@link PieChart} component.
 * @group Interface
 */
export type PieChartData = NonNullable<PieSeriesOption['data']>;

/**
 * Simple series data of the {@link ScatterChart} component.
 * @group Interface
 */
export type ScatterChartData = NonNullable<ScatterSeriesOption['data']>;

/**
 * Simple series data of the {@link MapChart} component.
 * @group Interface
 */
export type MapChartData = NonNullable<MapSeriesOption['data']>;

/**
 * Simple series data of the {@link CandlestickChart} component. Each item is an
 * `[open, close, lowest, highest]` tuple.
 * @group Interface
 */
export type CandlestickChartData = NonNullable<CandlestickSeriesOption['data']>;

/**
 * Simple series data of the {@link RadarChart} component.
 * @group Interface
 */
export type RadarChartData = NonNullable<RadarSeriesOption['data']>;

/**
 * Node list of the {@link GraphChart} component.
 * @group Interface
 */
export type GraphChartNodes = NonNullable<GraphSeriesOption['data']>;

/**
 * Edge list of the {@link GraphChart} component.
 * @group Interface
 */
export type GraphChartLinks = NonNullable<GraphSeriesOption['links']>;

/**
 * Category list of the {@link GraphChart} component.
 * @group Interface
 */
export type GraphChartCategories = NonNullable<GraphSeriesOption['categories']>;

/**
 * Simple series data of the {@link TreeChart} component.
 * @group Interface
 */
export type TreeChartData = NonNullable<TreeSeriesOption['data']>;

/**
 * Simple series data of the {@link SunburstChart} component.
 * @group Interface
 */
export type SunburstChartData = NonNullable<SunburstSeriesOption['data']>;

/**
 * Node list of the {@link SankeyChart} component.
 * @group Interface
 */
export type SankeyChartNodes = NonNullable<SankeySeriesOption['nodes']>;

/**
 * Edge list of the {@link SankeyChart} component.
 * @group Interface
 */
export type SankeyChartLinks = NonNullable<SankeySeriesOption['links']>;

/**
 * Simple series data of the {@link FunnelChart} component.
 * @group Interface
 */
export type FunnelChartData = NonNullable<FunnelSeriesOption['data']>;

/**
 * Simple series data of the {@link GaugeChart} component.
 * @group Interface
 */
export type GaugeChartData = NonNullable<GaugeSeriesOption['data']>;

/**
 * Renderer used to draw the chart.
 * @group Interface
 */
export type ChartRenderer = 'canvas' | 'svg';
