import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'usa-population-estimates-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>State-by-state population metrics with stepped color scale ranges.</p>
        </app-docsectiontext>
        <div class="card">
            <p-mapchart [data]="data" map="world" />
        </div>
        <app-code></app-code>
    `
})
export class UsaPopulationEstimatesDoc {
    data = [
        { name: 'California', value: 39 },
        { name: 'Texas', value: 30 },
        { name: 'Florida', value: 22 }
    ];
}
