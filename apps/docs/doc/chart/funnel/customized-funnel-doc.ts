import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'customized-funnel-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Ascending pyramid funnel with custom stage gaps and prominent label typography.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class CustomizedFunnelDoc {
    options = {
        series: [
            {
                type: 'funnel',
                sort: 'ascending',
                gap: 2,
                label: { show: true, position: 'left' },
                data: [
                    { value: 20, name: 'Tier 1' },
                    { value: 50, name: 'Tier 2' },
                    { value: 90, name: 'Tier 3' }
                ]
            }
        ]
    };
}
