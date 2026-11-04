import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'population-density-hk-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Regional population density heat map visual map projection.</p>
        </app-docsectiontext>
        <div class="card">
            <p-mapchart [data]="data" map="world" />
        </div>
        <app-code></app-code>
    `
})
export class PopulationDensityHkDoc {
    data = [
        { name: 'Central', value: 25000 },
        { name: 'Wan Chai', value: 19000 },
        { name: 'Eastern', value: 31000 }
    ];
}
