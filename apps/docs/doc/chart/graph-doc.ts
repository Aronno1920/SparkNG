import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'graph-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A graph chart renders a network from <i>nodes</i> and <i>links</i>. The force <i>layout</i> simulates attraction between connected nodes; <i>categories</i> group them for the legend.</p>
        </app-docsectiontext>
        <div class="card">
            <p-graphchart [nodes]="nodes" [links]="links" [categories]="categories" [legend]="{ bottom: 0 }" />
        </div>
        <app-code></app-code>
    `
})
export class GraphDoc {
    categories = [{ name: 'Framework' }, { name: 'Language' }, { name: 'Tooling' }];

    nodes = [
        { name: 'Angular', category: 0, symbolSize: 30 },
        { name: 'TypeScript', category: 1, symbolSize: 26 },
        { name: 'RxJS', category: 1, symbolSize: 18 },
        { name: 'CLI', category: 2, symbolSize: 18 },
        { name: 'Vitest', category: 2, symbolSize: 16 }
    ];

    links = [
        { source: 'Angular', target: 'TypeScript' },
        { source: 'Angular', target: 'RxJS' },
        { source: 'Angular', target: 'CLI' },
        { source: 'TypeScript', target: 'Vitest' },
        { source: 'CLI', target: 'Vitest' }
    ];
}
