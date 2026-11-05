import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'linear-regression-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Linear Regression overlays a fitted linear regression line over scattered data points.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LinearRegressionDoc {
    options = {
        xAxis: { scale: true },
        yAxis: { scale: true },
        series: [
            {
                name: 'Observed Data',
                type: 'scatter',
                data: [
                    [1, 2.1],
                    [2, 3.8],
                    [3, 5.2],
                    [4, 6.9],
                    [5, 8.4],
                    [6, 10.1],
                    [7, 11.9],
                    [8, 13.7],
                    [9, 15.5],
                    [10, 17.2]
                ]
            },
            {
                name: 'Linear Fit',
                type: 'line',
                data: [
                    [1, 2.0],
                    [10, 17.3]
                ],
                lineStyle: { color: '#ef4444', width: 2 }
            }
        ]
    };
}
