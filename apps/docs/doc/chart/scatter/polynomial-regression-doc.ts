import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'polynomial-regression-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Polynomial Regression overlays a curved polynomial trend across scatter clusters.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PolynomialRegressionDoc {
    options = {
        xAxis: { type: 'value' },
        yAxis: { type: 'value' },
        series: [
            {
                name: 'Data',
                type: 'scatter',
                data: [
                    [1, 10],
                    [2, 7],
                    [3, 5],
                    [4, 4],
                    [5, 4.5],
                    [6, 6],
                    [7, 8.5],
                    [8, 12],
                    [9, 17],
                    [10, 23]
                ]
            },
            {
                name: 'Polynomial Curve',
                type: 'line',
                smooth: true,
                data: [
                    [1, 9.8],
                    [2, 6.8],
                    [3, 4.9],
                    [4, 4.1],
                    [5, 4.5],
                    [6, 6.1],
                    [7, 8.8],
                    [8, 12.6],
                    [9, 17.5],
                    [10, 23.6]
                ],
                lineStyle: { color: '#8b5cf6' }
            }
        ]
    };
}
