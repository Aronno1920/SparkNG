import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'dataset-object-array-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Feeds chart series directly from an array of JavaScript data objects.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class DatasetObjectArrayDoc {
    options = {
        legend: {},
        tooltip: {},
        dataset: {
            dimensions: ['product', 'count', 'score'],
            source: [
                { product: 'Matcha Latte', count: 823, score: 95.8 },
                { product: 'Milk Tea', count: 235, score: 81.4 },
                { product: 'Cheese Cocoa', count: 1042, score: 91.2 }
            ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [{ type: 'bar' }, { type: 'bar' }]
    };
}
