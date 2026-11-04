import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'sankey-levels-setting-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Applies customized line curvature, colors, and paddings per hierarchy tier.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SankeyLevelsSettingDoc {
    options = {
        series: {
            type: 'sankey',
            levels: [
                { depth: 0, itemStyle: { color: '#f87171' }, lineStyle: { color: 'source', opacity: 0.6 } },
                { depth: 1, itemStyle: { color: '#60a5fa' } }
            ],
            data: [{ name: 'Start' }, { name: 'Branch 1' }, { name: 'Branch 2' }],
            links: [
                { source: 'Start', target: 'Branch 1', value: 10 },
                { source: 'Start', target: 'Branch 2', value: 20 }
            ]
        }
    };
}
