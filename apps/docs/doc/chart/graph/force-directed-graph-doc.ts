import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'force-directed-graph-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Force-Directed Graph uses simulated physical forces with repulsion and gravity to distribute nodes naturally.</p>
        </app-docsectiontext>
        <div class="card">
            <p-graphchart [nodes]="nodes" [links]="links" [categories]="categories" layout="force" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ForceDirectedGraphDoc {
    categories = [{ name: 'Core' }, { name: 'Module' }, { name: 'Plugin' }];

    nodes = [
        { name: 'Engine', category: 0, symbolSize: 35 },
        { name: 'Renderer', category: 1, symbolSize: 28 },
        { name: 'Parser', category: 1, symbolSize: 26 },
        { name: 'Animation', category: 1, symbolSize: 24 },
        { name: 'Tooltip', category: 2, symbolSize: 18 },
        { name: 'Legend', category: 2, symbolSize: 18 },
        { name: 'Zoom', category: 2, symbolSize: 18 }
    ];

    links = [
        { source: 'Engine', target: 'Renderer' },
        { source: 'Engine', target: 'Parser' },
        { source: 'Engine', target: 'Animation' },
        { source: 'Renderer', target: 'Tooltip' },
        { source: 'Renderer', target: 'Legend' },
        { source: 'Parser', target: 'Zoom' }
    ];

    options = {
        series: [
            {
                type: 'graph',
                layout: 'force',
                roam: true,
                force: {
                    repulsion: 120,
                    edgeLength: [50, 100],
                    gravity: 0.1
                }
            }
        ]
    };
}
