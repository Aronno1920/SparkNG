import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'circular-layout-graph-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Circular Layout Graph positions nodes around a circle with curved connecting edges.</p>
        </app-docsectiontext>
        <div class="card">
            <p-graphchart [nodes]="nodes" [links]="links" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class CircularLayoutGraphDoc {
    nodes = [
        { name: 'Alpha', symbolSize: 25 },
        { name: 'Beta', symbolSize: 25 },
        { name: 'Gamma', symbolSize: 25 },
        { name: 'Delta', symbolSize: 25 },
        { name: 'Epsilon', symbolSize: 25 },
        { name: 'Zeta', symbolSize: 25 }
    ];

    links = [
        { source: 'Alpha', target: 'Beta' },
        { source: 'Alpha', target: 'Delta' },
        { source: 'Beta', target: 'Gamma' },
        { source: 'Beta', target: 'Zeta' },
        { source: 'Gamma', target: 'Delta' },
        { source: 'Delta', target: 'Epsilon' },
        { source: 'Epsilon', target: 'Zeta' },
        { source: 'Zeta', target: 'Alpha' }
    ];

    options = {
        series: [
            {
                type: 'graph',
                layout: 'circular',
                roam: true,
                label: { show: true, position: 'right' },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                }
            }
        ]
    };
}
