import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'world-population-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Compares regional populations across multiple census years using horizontal bars.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [yAxis]="yAxis" horizontal />
        </div>
        <app-code></app-code>
    `
})
export class WorldPopulationDoc {
    yAxis = { type: 'category', data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'] };

    series = [
        { name: '1990', type: 'bar', data: [150, 181, 249, 870, 1135, 5280] },
        { name: '2020', type: 'bar', data: [212, 273, 331, 1380, 1439, 7794] }
    ];
}
