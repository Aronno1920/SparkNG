import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'pie-special-label-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Rich-text formatted pie callouts showing percentages, icons, and item totals.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PieSpecialLabelDoc {
    options = {
        series: [
            {
                type: 'pie',
                radius: '60%',
                label: { formatter: '{b}: {d}%' },
                data: [
                    { value: 1048, name: 'Search' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' }
                ]
            }
        ]
    };
}
