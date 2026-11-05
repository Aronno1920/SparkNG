import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'cartesian-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Two-value-axis cartesian coordinate system plotting arbitrary [x, y] coordinate pairs.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class CartesianDoc {
    options = {
        xAxis: {},
        yAxis: {},
        series: [
            {
                data: [
                    [10, 40],
                    [50, 100],
                    [40, 20]
                ],
                type: 'line'
            }
        ]
    };
}
