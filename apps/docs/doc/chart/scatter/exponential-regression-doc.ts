import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'exponential-regression-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Exponential Regression plots raw observations alongside an exponential trend curve.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ExponentialRegressionDoc {
    options = {
        xAxis: { type: 'value' },
        yAxis: { type: 'value' },
        series: [
            {
                name: 'Scatter',
                type: 'scatter',
                data: [
                    [1, 4.8],
                    [2, 5.2],
                    [3, 5.7],
                    [4, 6.5],
                    [5, 7.8],
                    [6, 9.5],
                    [7, 12.1],
                    [8, 15.6],
                    [9, 20.3],
                    [10, 27.1]
                ]
            },
            {
                name: 'Exponential Trend',
                type: 'line',
                smooth: true,
                data: [
                    [1, 4.7],
                    [2, 5.3],
                    [3, 6.1],
                    [4, 7.2],
                    [5, 8.8],
                    [6, 11.0],
                    [7, 14.1],
                    [8, 18.2],
                    [9, 23.8],
                    [10, 31.4]
                ]
            }
        ]
    };
}
