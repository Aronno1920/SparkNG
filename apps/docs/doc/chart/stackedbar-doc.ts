import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'stackedbar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Series that share the same <i>stack</i> group are drawn cumulatively on top of each other.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [xAxis]="{ type: 'category', data: days }" />
        </div>
        <app-code></app-code>
    `
})
export class StackedBarDoc {
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    series = [
        { name: 'Email', type: 'bar', stack: 'total', data: [120, 132, 101, 134, 90] },
        { name: 'Search', type: 'bar', stack: 'total', data: [220, 182, 191, 234, 290] },
        { name: 'Direct', type: 'bar', stack: 'total', data: [150, 232, 201, 154, 190] }
    ];
}
