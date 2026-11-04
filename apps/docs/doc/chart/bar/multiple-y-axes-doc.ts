import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'multiple-y-axes-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Bar chart mapped to distinct independent Y-axes with matching color accents.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MultipleYAxesDoc {
    options = {
        xAxis: [{ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }],
        yAxis: [
            { type: 'value', name: 'Primary' },
            { type: 'value', name: 'Secondary', position: 'right' }
        ],
        series: [
            { name: 'Primary', type: 'bar', data: [20, 49, 70, 23, 25] },
            { name: 'Secondary', type: 'bar', yAxisIndex: 1, data: [120, 149, 170, 123, 125] }
        ]
    };
}
