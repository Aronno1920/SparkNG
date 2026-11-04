import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'node-align-right-sankey-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Aligns stage column nodes flush along the right boundary.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class NodeAlignRightSankeyDoc {
    options = {
        series: {
            type: 'sankey',
            nodeAlign: 'right',
            data: [{ name: 'Inflow' }, { name: 'Outflow' }],
            links: [{ source: 'Inflow', target: 'Outflow', value: 20 }]
        }
    };
}
