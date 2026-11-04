import { AppDoc } from '@/components/doc/app.doc';
import { AreaPiecesDoc } from '@/doc/linecharts/area-pieces-doc';
import { BasicAreaDoc } from '@/doc/linecharts/basic-area-doc';
import { BasicDoc } from '@/doc/linecharts/basic-doc';
import { BeijingAqiDoc } from '@/doc/linecharts/beijing-aqi-doc';
import { BumpDoc } from '@/doc/linecharts/bump-doc';
import { CartesianDoc } from '@/doc/linecharts/cartesian-doc';
import { ClickToAddDoc } from '@/doc/linecharts/click-to-add-doc';
import { ConfidenceBandDoc } from '@/doc/linecharts/confidence-band-doc';
import { CustomGraphicDoc } from '@/doc/linecharts/custom-graphic-doc';
import { DatatransformFilterDoc } from '@/doc/linecharts/datatransform-filter-doc';
import { DraggablePointsDoc } from '@/doc/linecharts/draggable-points-doc';
import { DynamicDataDoc } from '@/doc/linecharts/dynamic-data-doc';
import { ElectricityDoc } from '@/doc/linecharts/electricity-doc';
import { FisheyeDoc } from '@/doc/linecharts/fisheye-doc';
import { FunctionPlotDoc } from '@/doc/linecharts/function-plot-doc';
import { GradientStackedAreaDoc } from '@/doc/linecharts/gradient-stacked-area-doc';
import { LargeScaleAreaDoc } from '@/doc/linecharts/large-scale-area-doc';
import { LineEasingDoc } from '@/doc/linecharts/line-easing-doc';
import { LineGradientDoc } from '@/doc/linecharts/line-gradient-doc';
import { LineRaceDoc } from '@/doc/linecharts/line-race-doc';
import { LineAndItemStylesDoc } from '@/doc/linecharts/line-and-item-styles-doc';
import { LineYCategoryDoc } from '@/doc/linecharts/line-y-category-doc';
import { LogAxisDoc } from '@/doc/linecharts/log-axis-doc';
import { MarklinesDoc } from '@/doc/linecharts/marklines-doc';
import { MultipleXaxesDoc } from '@/doc/linecharts/multiple-xaxes-doc';
import { PolarValueaxesDoc } from '@/doc/linecharts/polar-valueaxes-doc';
import { RainfallDoc } from '@/doc/linecharts/rainfall-doc';
import { RainfallVsEvaporationDoc } from '@/doc/linecharts/rainfall-vs-evaporation-doc';
import { SmoothedDoc } from '@/doc/linecharts/smoothed-doc';
import { StackedAreaDoc } from '@/doc/linecharts/stacked-area-doc';
import { StackedLineDoc } from '@/doc/linecharts/stacked-line-doc';
import { StepLineDoc } from '@/doc/linecharts/step-line-doc';
import { TemperatureDoc } from '@/doc/linecharts/temperature-doc';
import { TimeAxisDoc } from '@/doc/linecharts/time-axis-doc';
import { TooltipDatazoomMobileDoc } from '@/doc/linecharts/tooltip-datazoom-mobile-doc';
import { UsageDoc } from '@/doc/linecharts/usage-doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Line Chart Component - SparkNG"
            header="Line"
            description="Line chart visualizes trends as series of points connected by straight, stepped or smooth lines with optional area shading, powered by the SparkNG Charts engine."
            [docs]="docs"
            [apiDocs]="['LineChart']"
        ></app-doc>
    `
})
export class LineChartsDemo {
    docs = [
        { id: 'usage', label: 'Usage', component: UsageDoc },
        { id: 'basic', label: 'Basic Line', component: BasicDoc },
        { id: 'smoothed', label: 'Smoothed Line', component: SmoothedDoc },
        { id: 'basic-area', label: 'Basic Area', component: BasicAreaDoc },
        { id: 'stacked-line', label: 'Stacked Line', component: StackedLineDoc },
        { id: 'stacked-area', label: 'Stacked Area', component: StackedAreaDoc },
        { id: 'gradient-stacked-area', label: 'Gradient Stacked Area', component: GradientStackedAreaDoc },
        { id: 'bump', label: 'Bump (Ranking)', component: BumpDoc },
        { id: 'temperature', label: 'Temperature Change', component: TemperatureDoc },
        { id: 'area-pieces', label: 'Area Pieces', component: AreaPiecesDoc },
        { id: 'datatransform-filter', label: 'Data Transform Filter', component: DatatransformFilterDoc },
        { id: 'line-gradient', label: 'Line Gradient', component: LineGradientDoc },
        { id: 'electricity', label: 'Distribution of Electricity', component: ElectricityDoc },
        { id: 'large-scale-area', label: 'Large Scale Area', component: LargeScaleAreaDoc },
        { id: 'confidence-band', label: 'Confidence Band', component: ConfidenceBandDoc },
        { id: 'rainfall-vs-evaporation', label: 'Rainfall vs Evaporation', component: RainfallVsEvaporationDoc },
        { id: 'beijing-aqi', label: 'Beijing AQI', component: BeijingAqiDoc },
        { id: 'multiple-xaxes', label: 'Multiple X Axes', component: MultipleXaxesDoc },
        { id: 'rainfall', label: 'Rainfall', component: RainfallDoc },
        { id: 'time-axis', label: 'Time Axis', component: TimeAxisDoc },
        { id: 'dynamic-data', label: 'Dynamic Data + Time Axis', component: DynamicDataDoc },
        { id: 'function-plot', label: 'Function Plot', component: FunctionPlotDoc },
        { id: 'line-race', label: 'Line Race', component: LineRaceDoc },
        { id: 'marklines', label: 'Marklines', component: MarklinesDoc },
        { id: 'line-and-item-styles', label: 'Line Style and Item Style', component: LineAndItemStylesDoc },
        { id: 'cartesian', label: 'Cartesian Coordinate System', component: CartesianDoc },
        { id: 'log-axis', label: 'Log Axis', component: LogAxisDoc },
        { id: 'step-line', label: 'Step Line', component: StepLineDoc },
        { id: 'line-easing', label: 'Line Easing', component: LineEasingDoc },
        { id: 'fisheye', label: 'Fisheye Lens', component: FisheyeDoc },
        { id: 'line-y-category', label: 'Line Y Category', component: LineYCategoryDoc },
        { id: 'custom-graphic', label: 'Custom Graphic Component', component: CustomGraphicDoc },
        { id: 'click-to-add', label: 'Click to Add Points', component: ClickToAddDoc },
        { id: 'polar-valueaxes', label: 'Two Value-Axes in Polar', component: PolarValueaxesDoc },
        { id: 'tooltip-datazoom-mobile', label: 'Tooltip and DataZoom on Mobile', component: TooltipDatazoomMobileDoc },
        { id: 'draggable-points', label: 'Draggable Points', component: DraggablePointsDoc }
    ];
}
