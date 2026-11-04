import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'stacked-bar-normalization-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>100% normalized stacked bars illustrating percentage shares across categories.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [xAxis]="xAxis" />
        </div>
        <app-code></app-code>
    `
})
export class StackedBarNormalizationDoc {
    xAxis = { type: 'category', data: ['Engineering', 'Design', 'Marketing', 'Sales'] };

    series = [
        { name: 'Full-time (%)', type: 'bar', stack: 'ratio', data: [80, 70, 60, 75] },
        { name: 'Contractor (%)', type: 'bar', stack: 'ratio', data: [20, 30, 40, 25] }
    ];
}
