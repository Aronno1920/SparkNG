import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'multiple-funnels-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Side-by-side funnel diagrams comparing conversion pipelines across quarters.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MultipleFunnelsDoc {
    options = {
        series: [
            {
                type: 'funnel',
                left: '5%',
                width: '40%',
                data: [
                    { value: 100, name: 'Q1 Leads' },
                    { value: 40, name: 'Q1 Won' }
                ]
            },
            {
                type: 'funnel',
                left: '55%',
                width: '40%',
                data: [
                    { value: 100, name: 'Q2 Leads' },
                    { value: 65, name: 'Q2 Won' }
                ]
            }
        ]
    };
}
