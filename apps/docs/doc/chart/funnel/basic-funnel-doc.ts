import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-funnel-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Standard sales conversion funnel tracking drop-off across pipeline stages.</p>
        </app-docsectiontext>
        <div class="card">
            <p-funnelchart [data]="data" />
        </div>
        <app-code></app-code>
    `
})
export class BasicFunnelDoc {
    data = [
        { value: 100, name: 'Visits' },
        { value: 80, name: 'Inquiries' },
        { value: 60, name: 'Quotes' },
        { value: 40, name: 'Orders' },
        { value: 20, name: 'Renewals' }
    ];
}
