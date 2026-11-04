import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-candlestick-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Standard OHLC candlestick chart showing open, close, low, and high equity prices.</p>
        </app-docsectiontext>
        <div class="card">
            <p-candlestickchart [data]="data" [xAxis]="xAxis" />
        </div>
        <app-code></app-code>
    `
})
export class BasicCandlestickDoc {
    xAxis = { type: 'category', data: ['2025-01-02', '2025-01-03', '2025-01-04', '2025-01-05'] };

    data = [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42]
    ];
}
