import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'sort-data-bar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Sorts bars automatically by descending numerical amount.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SortDataBarDoc {
    options = {
        dataset: [
            {
                dimensions: ['name', 'age', 'score'],
                source: [
                    ['Hannah', 41, 314],
                    ['Ian', 20, 651],
                    ['John', 52, 287],
                    ['Kevin', 37, 720]
                ]
            },
            {
                transform: { type: 'sort', config: { dimension: 'score', order: 'desc' } }
            }
        ],
        xAxis: { type: 'category' },
        yAxis: {},
        series: { type: 'bar', datasetIndex: 1, encode: { x: 'name', y: 'score' } }
    };
}
