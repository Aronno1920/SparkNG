import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'candlestick-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A candlestick chart visualizes <i>[open, close, lowest, highest]</i> price tuples per period; the value axis starts at the data range by default instead of zero.</p>
        </app-docsectiontext>
        <div class="card">
            <p-candlestickchart [data]="prices" [xAxis]="{ type: 'category', data: dates }" />
        </div>
        <app-code></app-code>
    `
})
export class CandlestickDoc {
    dates = ['2025-06-02', '2025-06-05', '2025-06-06', '2025-06-09', '2025-06-10', '2025-06-11', '2025-06-12', '2025-06-13'];

    prices = [
        [2320.26, 2320.26, 2287.3, 2362.94],
        [2300, 2291.3, 2288.26, 2308.38],
        [2295.35, 2346.5, 2295.35, 2345.92],
        [2347.22, 2358.98, 2337.35, 2363.8],
        [2360.75, 2382.48, 2347.89, 2383.76],
        [2383.43, 2385.42, 2371.23, 2391.82],
        [2377.41, 2419.02, 2369.57, 2428.58],
        [2425.92, 2428.15, 2417.64, 2450.6]
    ];
}
