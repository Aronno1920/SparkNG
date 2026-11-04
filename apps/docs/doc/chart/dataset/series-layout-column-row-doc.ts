import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'series-layout-column-row-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Toggles series layout projection between column-based and row-based orientations.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SeriesLayoutColumnRowDoc {
    options = {
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['quarter', 'Q1', 'Q2', 'Q3', 'Q4'],
                ['Alpha', 41.1, 30.4, 65.1, 53.3],
                ['Beta', 86.5, 92.1, 85.7, 83.1]
            ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
            { type: 'bar', seriesLayoutBy: 'row' },
            { type: 'bar', seriesLayoutBy: 'row' }
        ]
    };
}
