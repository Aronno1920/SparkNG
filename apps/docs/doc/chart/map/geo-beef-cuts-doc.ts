import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'geo-beef-cuts-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>GEO Beef Cuts showcases custom SVG vector shapes mapped to interactive geographic and diagram regions.</p>
        </app-docsectiontext>
        <div class="card">
            <p-mapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class GeoBeefCutsDoc {
    options = {
        title: { text: 'SVG Custom Regions', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [
            {
                name: 'Beef Cuts',
                type: 'map',
                map: 'beef_cuts',
                roam: true,
                data: [
                    { name: 'Chuck', value: 80 },
                    { name: 'Rib', value: 95 },
                    { name: 'Loin', value: 90 },
                    { name: 'Round', value: 70 }
                ]
            }
        ]
    };
}
