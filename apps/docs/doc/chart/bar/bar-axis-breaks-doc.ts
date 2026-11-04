import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-axis-breaks-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Visualizes extreme value differences without compressing small-value bars.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BarAxisBreaksDoc {
    options = {
        xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
        yAxis: { type: 'value' },
        series: [
            {
                type: 'bar',
                data: [120, 200, 1500, 80, 70],
                markLine: {
                    data: [{ yAxis: 500, name: 'Break Reference' }]
                }
            }
        ]
    };
}
