import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'stacked-horizontal-bar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Horizontal orientation of stacked series for wide or lengthy category labels.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [yAxis]="yAxis" horizontal />
        </div>
        <app-code></app-code>
    `
})
export class StackedHorizontalBarDoc {
    yAxis = { type: 'category', data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] };

    series = [
        { name: 'Direct', type: 'bar', stack: 'traffic', data: [320, 302, 301, 334, 390] },
        { name: 'Search', type: 'bar', stack: 'traffic', data: [120, 132, 101, 134, 90] },
        { name: 'Referral', type: 'bar', stack: 'traffic', data: [220, 182, 191, 234, 290] }
    ];
}
