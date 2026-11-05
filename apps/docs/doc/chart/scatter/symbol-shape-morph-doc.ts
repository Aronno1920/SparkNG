import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'symbol-shape-morph-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Symbol Shape Morph renders scatter points with varied geometric symbols and custom shapes.</p>
        </app-docsectiontext>
        <div class="card">
            <p-scatterchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SymbolShapeMorphDoc {
    data = [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33]
    ];

    options = {
        series: [
            {
                type: 'scatter',
                symbol: 'pin',
                symbolSize: 24
            }
        ]
    };
}
