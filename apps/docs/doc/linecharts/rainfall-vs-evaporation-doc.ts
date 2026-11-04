import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'rainfall-vs-evaporation-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Monthly rainfall and evaporation compared with bars, plus their difference as a line on a second axis.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class RainfallVsEvaporationDoc {
    options = {
        tooltip: { trigger: 'axis' },
        legend: {},
        xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
        yAxis: [
            { type: 'value', name: 'ml', min: 0 },
            { type: 'value', name: 'Balance', axisLabel: { formatter: '{value} ml' } }
        ],
        series: [
            { name: 'Evaporation', type: 'bar', data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3] },
            { name: 'Rainfall', type: 'bar', data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3] },
            {
                name: 'Balance',
                type: 'line',
                yAxisIndex: 1,
                smooth: true,
                data: [0.6, 1.0, 2.0, 3.2, 3.1, -6.0, 40.0, 20.0, 16.1, -1.2, -0.4, -1.0]
            }
        ]
    };
}
