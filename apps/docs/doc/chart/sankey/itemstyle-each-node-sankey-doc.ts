import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'itemstyle-each-node-sankey-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Individually styled node blocks with bespoke fill hues and borders.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ItemstyleEachNodeSankeyDoc {
    options = {
        series: {
            type: 'sankey',
            data: [
                { name: 'Income', itemStyle: { color: '#10b981' } },
                { name: 'Tax', itemStyle: { color: '#ef4444' } },
                { name: 'Savings', itemStyle: { color: '#3b82f6' } }
            ],
            links: [
                { source: 'Income', target: 'Tax', value: 25 },
                { source: 'Income', target: 'Savings', value: 75 }
            ]
        }
    };
}
