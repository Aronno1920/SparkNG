import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'geo-choropleth-scatter-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Choropleth regional boundary shading combined with city scatter overlays.</p>
        </app-docsectiontext>
        <div class="card">
            <p-mapchart [data]="data" map="world" />
        </div>
        <app-code></app-code>
    `
})
export class GeoChoroplethScatterDoc {
    data = [
        { name: 'Brazil', value: 215 },
        { name: 'India', value: 1420 },
        { name: 'Australia', value: 26 }
    ];
}
