import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'node-align-left-sankey-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Aligns stage column nodes flush along the left boundary.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class NodeAlignLeftSankeyDoc {
    options = {
        series: {
            type: 'sankey',
            nodeAlign: 'left',
            data: [{ name: 'Source' }, { name: 'Dest' }],
            links: [{ source: 'Source', target: 'Dest', value: 10 }]
        }
    };
}
