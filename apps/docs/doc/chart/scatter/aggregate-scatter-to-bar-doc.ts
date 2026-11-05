import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'aggregate-scatter-to-bar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Aggregate Scatter to Bar showcases transition between dispersed points and aggregated category columns.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class AggregateScatterToBarDoc {
    options = {
        xAxis: { type: 'category', data: ['A', 'B', 'C', 'D'] },
        yAxis: { type: 'value' },
        series: [
            {
                type: 'scatter',
                data: [
                    ['A', 15],
                    ['A', 18],
                    ['B', 25],
                    ['B', 22],
                    ['C', 35],
                    ['D', 12]
                ]
            }
        ]
    };
}
