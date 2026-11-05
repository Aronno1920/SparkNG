import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'categories-graph-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Graph with Categories groups nodes by type, color-coding them and allowing toggling via the legend.</p>
        </app-docsectiontext>
        <div class="card">
            <p-graphchart [nodes]="nodes" [links]="links" [categories]="categories" [legend]="{ bottom: 0 }" />
        </div>
        <app-code></app-code>
    `
})
export class CategoriesGraphDoc {
    categories = [{ name: 'Framework' }, { name: 'Language' }, { name: 'Tooling' }];

    nodes = [
        { name: 'SparkNG', category: 0, symbolSize: 32 },
        { name: 'TypeScript', category: 1, symbolSize: 28 },
        { name: 'Angular', category: 0, symbolSize: 30 },
        { name: 'Tailwind CSS', category: 2, symbolSize: 22 },
        { name: 'Vite', category: 2, symbolSize: 20 },
        { name: 'RxJS', category: 1, symbolSize: 22 }
    ];

    links = [
        { source: 'SparkNG', target: 'Angular' },
        { source: 'SparkNG', target: 'TypeScript' },
        { source: 'SparkNG', target: 'Tailwind CSS' },
        { source: 'Angular', target: 'TypeScript' },
        { source: 'Angular', target: 'RxJS' },
        { source: 'TypeScript', target: 'Vite' }
    ];
}
