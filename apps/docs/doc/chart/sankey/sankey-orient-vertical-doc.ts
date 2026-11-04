import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'sankey-orient-vertical-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Vertical top-to-bottom layout for hierarchy flows and funnel progression tracking.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SankeyOrientVerticalDoc {
    options = {
        series: {
            type: 'sankey',
            orient: 'vertical',
            data: [{ name: 'Top' }, { name: 'Mid A' }, { name: 'Mid B' }, { name: 'Bottom' }],
            links: [
                { source: 'Top', target: 'Mid A', value: 6 },
                { source: 'Top', target: 'Mid B', value: 4 },
                { source: 'Mid A', target: 'Bottom', value: 5 }
            ]
        }
    };
}
