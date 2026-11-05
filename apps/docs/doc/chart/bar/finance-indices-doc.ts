import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'finance-indices-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Finance Indices 2002 displays financial indicator comparisons with multi-series bar layout.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class FinanceIndicesDoc {
    data = [
        { category: 'Q1', series1: 320, series2: 220, series3: 150 },
        { category: 'Q2', series1: 302, series2: 182, series3: 212 },
        { category: 'Q3', series1: 301, series2: 191, series3: 201 },
        { category: 'Q4', series1: 334, series2: 234, series3: 154 }
    ];

    options = {
        legend: { bottom: 0 }
    };
}
