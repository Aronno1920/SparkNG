import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'stacked-column-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Stacks multiple series vertically to illustrate segment contributions to whole totals.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [xAxis]="xAxis" />
        </div>
        <app-code></app-code>
    `
})
export class StackedColumnDoc {
    xAxis = { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] };

    series = [
        { name: 'Product A', type: 'bar', stack: 'total', data: [120, 132, 101, 134, 90] },
        { name: 'Product B', type: 'bar', stack: 'total', data: [220, 182, 191, 234, 290] },
        { name: 'Product C', type: 'bar', stack: 'total', data: [150, 232, 201, 154, 190] }
    ];
}
