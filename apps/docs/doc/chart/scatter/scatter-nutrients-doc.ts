import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'scatter-nutrients-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Scatter plotting nutritional densities (protein vs calories).</p>
        </app-docsectiontext>
        <div class="card">
            <p-scatterchart [series]="series" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterNutrientsDoc {
    series = [
        {
            name: 'Dairy',
            type: 'scatter',
            data: [
                [8.1, 150],
                [3.4, 65],
                [12.0, 220],
                [6.5, 110]
            ]
        }
    ];
}
