import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'how-trillion-spent-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Hierarchical federal government spending categories broken down proportionally.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treemapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class HowTrillionSpentDoc {
    options = {
        title: { text: 'Federal Budget Expenditure' },
        series: [
            {
                type: 'treemap',
                data: [
                    { name: 'Social Security', value: 1200 },
                    { name: 'Healthcare', value: 950 },
                    { name: 'Defense', value: 800 },
                    { name: 'Interest', value: 450 },
                    { name: 'Education', value: 300 }
                ]
            }
        ]
    };
}
