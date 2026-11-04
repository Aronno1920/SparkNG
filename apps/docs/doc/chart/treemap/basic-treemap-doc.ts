import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-treemap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Proportional nested rectangular tiling showing relative hierarchy weights.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treemapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BasicTreemapDoc {
    options = {
        series: [
            {
                type: 'treemap',
                data: [
                    { name: 'Node A', value: 10 },
                    { name: 'Node B', value: 20 },
                    { name: 'Node C', value: 30 }
                ]
            }
        ]
    };
}
