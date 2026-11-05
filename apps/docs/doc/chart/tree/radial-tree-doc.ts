import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'radial-tree-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Radial Tree distributes nested branches outward in a 360-degree circular layout.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treechart [data]="tree" layout="radial" [symbol]="'emptyCircle'" />
        </div>
        <app-code></app-code>
    `
})
export class RadialTreeDoc {
    tree = {
        name: 'Universe',
        children: [
            {
                name: 'Milky Way',
                children: [{ name: 'Solar System', children: [{ name: 'Earth' }, { name: 'Mars' }, { name: 'Jupiter' }] }, { name: 'Alpha Centauri' }]
            },
            {
                name: 'Andromeda',
                children: [{ name: 'Star Cluster 1' }, { name: 'Star Cluster 2' }]
            },
            {
                name: 'Triangulum',
                children: [{ name: 'Nebula A' }]
            }
        ]
    };
}
