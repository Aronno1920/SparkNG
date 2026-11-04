import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'usa-choropleth-projection-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Albers projected thematic map visualizing regional economic outputs.</p>
        </app-docsectiontext>
        <div class="card">
            <p-mapchart [data]="data" map="world" />
        </div>
        <app-code></app-code>
    `
})
export class UsaChoroplethProjectionDoc {
    data = [
        { name: 'United States', value: 25000 },
        { name: 'Canada', value: 2100 }
    ];
}
