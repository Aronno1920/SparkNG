import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, ViewChild } from '@angular/core';
import { ChartModule, LineChart } from '@bdspark/sparkng/chart';

@Component({
    selector: 'click-to-add-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Click anywhere on the chart to add a data point: the click position is converted to axis values and pushed into the series through the component API.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart #chart [series]="series" [xAxis]="{ type: 'value', min: 0, max: 100 }" [yAxis]="{ type: 'value', min: 0, max: 100 }" (onChartClick)="onClick($event)" />
        </div>
        <app-code></app-code>
    `
})
export class ClickToAddDoc {
    @ViewChild('chart') chartComponent!: LineChart;

    data: [number, number][] = [
        [12, 34],
        [38, 52],
        [61, 30]
    ];

    series = [
        {
            type: 'line',
            symbolSize: 10,
            clip: true,
            data: this.data
        }
    ];

    onClick(event: any): void {
        if (!event.value) return;
        this.data.push([event.value[0], event.value[1]]);
        this.data.sort((a, b) => a[0] - b[0]);
        this.chartComponent.setOption({ series: [{ data: this.data }] });
    }
}
