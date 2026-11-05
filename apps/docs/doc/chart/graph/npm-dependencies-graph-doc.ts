import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'npm-dependencies-graph-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>NPM Dependencies Graph visualizes complex package dependency trees with multi-tier relationship links.</p>
        </app-docsectiontext>
        <div class="card">
            <p-graphchart [nodes]="nodes" [links]="links" [categories]="categories" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class NpmDependenciesGraphDoc {
    categories = [{ name: 'Root' }, { name: 'Direct' }, { name: 'Transitive' }];

    nodes = [
        { name: '@bdspark/sparkng', category: 0, symbolSize: 36 },
        { name: '@angular/core', category: 1, symbolSize: 26 },
        { name: '@angular/common', category: 1, symbolSize: 24 },
        { name: 'rxjs', category: 1, symbolSize: 24 },
        { name: 'tslib', category: 2, symbolSize: 18 },
        { name: 'zone.js', category: 2, symbolSize: 18 }
    ];

    links = [
        { source: '@bdspark/sparkng', target: '@angular/core' },
        { source: '@bdspark/sparkng', target: '@angular/common' },
        { source: '@bdspark/sparkng', target: 'rxjs' },
        { source: '@angular/core', target: 'rxjs' },
        { source: '@angular/core', target: 'tslib' },
        { source: '@angular/core', target: 'zone.js' }
    ];

    options = {
        series: [
            {
                type: 'graph',
                layout: 'force',
                roam: true,
                force: {
                    repulsion: 150,
                    edgeLength: [60, 120]
                },
                lineStyle: {
                    curveness: 0.1
                }
            }
        ]
    };
}
