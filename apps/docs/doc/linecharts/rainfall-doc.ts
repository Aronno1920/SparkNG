import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'rainfall-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Hourly rainfall over two days with <i>markArea</i> shading the night hours and the axis breaking between days.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class RainfallDoc {
    hours: string[] = [];

    data: number[] = [];

    options: any;

    constructor() {
        let base = +new Date(2025, 4, 2);
        const oneHour = 3600 * 1000;
        for (let i = 0; i < 48; i++) {
            const now = new Date((base += oneHour));
            this.hours.push(now.getDate() + 'd ' + now.getHours() + 'h');
            this.data.push(Math.round(Math.abs(Math.sin(i / 8)) * 40 + Math.random() * 6));
        }
        this.options = {
            tooltip: { trigger: 'axis' },
            grid: { left: 48, right: 24 },
            xAxis: { type: 'category', boundaryGap: false, data: this.hours },
            yAxis: { type: 'value', name: 'mm' },
            series: [
                {
                    name: 'Rainfall',
                    type: 'line',
                    areaStyle: {},
                    data: this.data,
                    markArea: {
                        itemStyle: { color: 'rgba(120,130,180,0.15)' },
                        data: [
                            [{ name: 'Night 1', xAxis: '2d 20h' }, { xAxis: '3d 6h' }],
                            [{ name: 'Night 2', xAxis: '3d 20h' }, { xAxis: '3d 23h' }]
                        ]
                    }
                }
            ]
        };
    }
}
