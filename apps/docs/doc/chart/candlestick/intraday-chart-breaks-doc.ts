import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'intraday-chart-breaks-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Intraday Chart with Breaks omits non-trading hours and weekend gaps from the financial timeline.</p>
        </app-docsectiontext>
        <div class="card">
            <p-candlestickchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class IntradayChartBreaksDoc {
    data = [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42]
    ];

    options = {
        xAxis: {
            type: 'category',
            data: ['09:30', '10:30', '11:30', '13:30']
        }
    };
}
