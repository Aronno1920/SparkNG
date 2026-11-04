import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'doughnut-chart-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Standard doughnut chart featuring an open center for aggregate counters.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class DoughnutChartDoc {
    options = {
        tooltip: { trigger: 'item' },
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                data: [
                    { value: 335, name: 'Direct' },
                    { value: 310, name: 'Email' },
                    { value: 234, name: 'Affiliate' },
                    { value: 135, name: 'Video' },
                    { value: 1548, name: 'Search' }
                ]
            }
        ]
    };
}
