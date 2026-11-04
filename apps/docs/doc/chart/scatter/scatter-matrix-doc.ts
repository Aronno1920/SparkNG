import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'scatter-matrix-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Matrix of scatter subplots comparing combinations across multidimensional metrics.</p>
        </app-docsectiontext>
        <div class="card">
            <p-scatterchart [series]="series" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterMatrixDoc {
    series = [
        {
            type: 'scatter',
            data: [
                [1, 2],
                [2, 3],
                [3, 5],
                [4, 7]
            ]
        }
    ];
}
