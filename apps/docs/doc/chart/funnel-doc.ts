import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'funnel-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A funnel chart stacks pipeline stages as trapezoids proportional to their values; <i>sort</i> controls the ordering.</p>
        </app-docsectiontext>
        <div class="card">
            <p-funnelchart [data]="stages" />
        </div>
        <app-code></app-code>
    `
})
export class FunnelDoc {
    stages = [
        { value: 100, name: 'Visits' },
        { value: 80, name: 'Sign Ups' },
        { value: 60, name: 'Trials' },
        { value: 40, name: 'Quotes' },
        { value: 20, name: 'Purchases' }
    ];
}
