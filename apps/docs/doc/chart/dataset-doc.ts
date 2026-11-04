import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'dataset-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>
                The <i>dataset</i> input feeds any chart from a single reusable data source. Series reference columns through <i>encode</i> and dataset <i>transform</i>s such as sort or filter reshape the data before it is plotted — no duplicated
                copies per series.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [dataset]="dataset" [series]="series" [xAxis]="{ type: 'category' }" [yAxis]="{ type: 'value' }" />
        </div>
        <app-code></app-code>
    `
})
export class DatasetDoc {
    dataset = {
        dimensions: ['Product', '2015', '2016', '2017'],
        source: [
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
    };

    series = [{ type: 'bar', dataset: { transform: { type: 'sort', config: { dimension: '2017', order: 'desc' } } }, encode: { x: 'Product', y: '2017' }, name: '2017 (sorted)' }];
}
