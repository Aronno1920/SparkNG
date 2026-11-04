import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, ViewChild } from '@angular/core';
import { ChartModule, LineChart } from '@bdspark/sparkng/chart';

@Component({
    selector: 'draggable-points-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>The data points are draggable: <i>graphic</i> circles are overlaid on the series and moved with the pointer, updating the underlying data on drag end.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart #chart [series]="series" [xAxis]="{ type: 'value', min: 0, max: 100 }" [yAxis]="{ type: 'value', min: 0, max: 100 }" [tooltip]="{ trigger: 'none' }" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class DraggablePointsDoc {
    @ViewChild('chart') chartComponent!: LineChart;

    data: [number, number][] = [
        [10, 30],
        [30, 60],
        [50, 40],
        [70, 75],
        [90, 50]
    ];

    series = [
        {
            type: 'line',
            symbolSize: 1,
            data: this.data
        }
    ];

    private get chart(): any {
        return this.chartComponent?.chart;
    }

    onInit(event: any): void {
        const chart = event.chart;
        const updateOverlay = () => {
            const grid = chart.getModel().getComponent('grid', 0).coordinateSystem;
            const graphicChildren = this.data.map((point, index) => ({
                type: 'circle',
                id: 'handle-' + index,
                position: grid.dataToPoint(point),
                shape: { r: 7 },
                style: { fill: '#5470c6', stroke: '#fff', lineWidth: 2 },
                draggable: true,
                ondrag: (e: any) => {
                    const position = [e.target.x, e.target.y];
                    const dataPoint = grid.pointToData(position);
                    this.data[index] = [+dataPoint[0].toFixed(1), +dataPoint[1].toFixed(1)];
                },
                ondragend: () => {
                    this.chartComponent.setOption({ series: [{ data: this.data }] });
                }
            }));
            chart.setOption({ graphic: graphicChildren });
        };
        updateOverlay();
        chart.on('finished', updateOverlay);
    }
}
