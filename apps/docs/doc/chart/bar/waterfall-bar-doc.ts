import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'waterfall-bar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A waterfall chart shows cumulative positive and negative running totals using stacked transparent bases.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [xAxis]="xAxis" />
        </div>
        <app-code></app-code>
    `
})
export class WaterfallBarDoc {
    xAxis = { type: 'category', data: ['Total', 'Rent', 'Utilities', 'Payroll', 'Marketing', 'Supplies'] };

    series = [
        {
            name: 'Placeholder',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
                borderColor: 'transparent',
                color: 'transparent'
            },
            emphasis: {
                itemStyle: {
                    borderColor: 'transparent',
                    color: 'transparent'
                }
            },
            data: [0, 1700, 1400, 600, 200, 0]
        },
        {
            name: 'Expenses',
            type: 'bar',
            stack: 'Total',
            label: { show: true, position: 'inside' },
            data: [2900, 1200, 300, 800, 400, 200]
        }
    ];
}
