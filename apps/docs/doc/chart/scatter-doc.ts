import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'scatter-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A scatter chart plots <i>[x, y]</i> pairs to reveal correlations between two measures; both axes default to value scales.</p>
        </app-docsectiontext>
        <div class="card">
            <p-scatterchart [series]="series" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterDoc {
    series = [
        {
            name: 'Female',
            type: 'scatter',
            data: [
                [161.2, 51.6],
                [167.5, 59.0],
                [159.5, 49.2],
                [157.0, 63.0],
                [155.8, 53.6],
                [170.0, 59.0],
                [159.1, 47.6],
                [166.0, 69.8]
            ],
            symbolSize: 12
        },
        {
            name: 'Male',
            type: 'scatter',
            data: [
                [174.0, 65.6],
                [175.3, 71.8],
                [182.9, 80.8],
                [177.0, 73.2],
                [170.5, 62.6],
                [179.5, 73.2],
                [185.4, 79.2],
                [168.0, 61.6]
            ],
            symbolSize: 12
        }
    ];
}
