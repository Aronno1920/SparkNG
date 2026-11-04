import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-negative-value-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Visualizes positive and negative deviations spanning above and below a central baseline.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [xAxis]="xAxis" />
        </div>
        <app-code></app-code>
    `
})
export class BarNegativeValueDoc {
    xAxis = {
        type: 'category',
        axisTick: { show: false },
        data: ['Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two', 'One']
    };

    series = [
        {
            name: 'Cost',
            type: 'bar',
            stack: 'Total',
            label: { show: true },
            data: [
                { value: -0.07, label: { position: 'right' } },
                { value: -0.09, label: { position: 'right' } },
                0.2,
                0.44,
                { value: -0.23, label: { position: 'right' } },
                0.08,
                { value: -0.17, label: { position: 'right' } },
                0.47,
                { value: -0.36, label: { position: 'right' } },
                0.18
            ]
        }
    ];
}
