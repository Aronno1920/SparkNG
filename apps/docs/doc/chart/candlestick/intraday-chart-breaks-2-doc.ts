import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'intraday-chart-breaks-2-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Intraday Chart with Breaks (II) combines OHLC candlesticks with volume sub-plots across broken time axes.</p>
        </app-docsectiontext>
        <div class="card">
            <p-candlestickchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class IntradayChartBreaks2Doc {
    data = [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42],
        [15, 28, 12, 35]
    ];

    options = {
        xAxis: {
            type: 'category',
            data: ['09:30', '10:00', '10:30', '11:00', '11:30']
        }
    };
}
