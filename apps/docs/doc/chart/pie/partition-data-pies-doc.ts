import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'partition-data-pies-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Multiple synchronized mini-pies plotted across a multi-cell grid from a dataset.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PartitionDataPiesDoc {
    options = {
        dataset: {
            source: [
                ['Product', '2012', '2013', '2014'],
                ['Tea', 86.5, 92.1, 85.7],
                ['Milk', 41.1, 30.4, 65.1],
                ['Cheese', 24.1, 67.2, 79.5]
            ]
        },
        series: [
            { type: 'pie', radius: '30%', center: ['30%', '50%'], encode: { itemName: 'Product', value: '2012' } },
            { type: 'pie', radius: '30%', center: ['70%', '50%'], encode: { itemName: 'Product', value: '2014' } }
        ]
    };
}
