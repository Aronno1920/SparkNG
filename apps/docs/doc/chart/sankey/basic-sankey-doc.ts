import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-sankey-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Flow quantity diagram mapping energy, budget, or traffic transfers across stage nodes.</p>
        </app-docsectiontext>
        <div class="card">
            <p-sankeychart [data]="data" [links]="links" />
        </div>
        <app-code></app-code>
    `
})
export class BasicSankeyDoc {
    data = [{ name: 'a' }, { name: 'b' }, { name: 'a1' }, { name: 'a2' }, { name: 'b1' }, { name: 'c' }];

    links = [
        { source: 'a', target: 'a1', value: 5 },
        { source: 'a', target: 'a2', value: 3 },
        { source: 'b', target: 'b1', value: 8 },
        { source: 'a', target: 'b1', value: 3 },
        { source: 'b1', target: 'a1', value: 1 },
        { source: 'b1', target: 'c', value: 2 }
    ];
}
