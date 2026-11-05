import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-graph-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Basic Graph renders nodes and links connecting entities with clean labels.</p>
        </app-docsectiontext>
        <div class="card">
            <p-graphchart [nodes]="nodes" [links]="links" />
        </div>
        <app-code></app-code>
    `
})
export class BasicGraphDoc {
    nodes = [
        { name: 'Node 1', symbolSize: 30 },
        { name: 'Node 2', symbolSize: 25 },
        { name: 'Node 3', symbolSize: 25 },
        { name: 'Node 4', symbolSize: 20 },
        { name: 'Node 5', symbolSize: 20 }
    ];

    links = [
        { source: 'Node 1', target: 'Node 2' },
        { source: 'Node 1', target: 'Node 3' },
        { source: 'Node 2', target: 'Node 4' },
        { source: 'Node 2', target: 'Node 5' },
        { source: 'Node 3', target: 'Node 5' }
    ];
}
