import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'anscomb-quartet-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Four datasets with nearly identical statistical properties but distinctly different distributions.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class AnscombQuartetDoc {
    options = {
        title: { text: "Anscombe's Quartet", left: 'center' },
        grid: { left: 50, right: 30 },
        xAxis: { type: 'value' },
        yAxis: { type: 'value' },
        series: [
            {
                type: 'scatter',
                data: [
                    [10, 8.04],
                    [8, 6.95],
                    [13, 7.58],
                    [9, 8.81],
                    [11, 8.33],
                    [14, 9.96],
                    [6, 7.24],
                    [4, 4.26],
                    [12, 10.84],
                    [7, 4.82],
                    [5, 5.68]
                ]
            }
        ]
    };
}
