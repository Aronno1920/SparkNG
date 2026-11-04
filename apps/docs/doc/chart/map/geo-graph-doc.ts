import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'geo-graph-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Network topologies and flight routes projected over geographic map coordinates.</p>
        </app-docsectiontext>
        <div class="card">
            <p-mapchart [data]="data" map="world" />
        </div>
        <app-code></app-code>
    `
})
export class GeoGraphDoc {
    data = [
        { name: 'United States', value: 340 },
        { name: 'China', value: 1400 },
        { name: 'Germany', value: 84 }
    ];
}
