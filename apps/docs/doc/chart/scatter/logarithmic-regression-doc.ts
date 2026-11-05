import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'logarithmic-regression-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Logarithmic Regression fits diminishing-return growth curves to experimental data.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LogarithmicRegressionDoc {
    options = {
        xAxis: { type: 'value' },
        yAxis: { type: 'value' },
        series: [
            {
                type: 'scatter',
                data: [
                    [1, 2],
                    [2, 4.5],
                    [4, 6.2],
                    [8, 8.1],
                    [16, 9.8],
                    [32, 11.5]
                ]
            },
            {
                type: 'line',
                smooth: true,
                data: [
                    [1, 2.1],
                    [2, 4.3],
                    [4, 6.3],
                    [8, 8.2],
                    [16, 9.9],
                    [32, 11.7]
                ],
                lineStyle: { color: '#f59e0b' }
            }
        ]
    };
}
