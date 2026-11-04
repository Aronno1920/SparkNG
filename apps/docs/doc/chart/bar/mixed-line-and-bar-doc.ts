import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'mixed-line-and-bar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Combines bar columns and line trends on dual y-axes for volume and rate comparisons.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MixedLineAndBarDoc {
    options = {
        tooltip: { trigger: 'axis' },
        xAxis: [{ type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }],
        yAxis: [
            { type: 'value', name: 'Volume' },
            { type: 'value', name: 'Rate (%)' }
        ],
        series: [
            { name: 'Volume', type: 'bar', data: [200, 490, 700, 232, 256, 767] },
            { name: 'Rate (%)', type: 'line', yAxisIndex: 1, data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2] }
        ]
    };
}
