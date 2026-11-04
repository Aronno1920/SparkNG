import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'ohlc-chart-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Traditional OHLC bar representation for trading session intervals.</p>
        </app-docsectiontext>
        <div class="card">
            <p-candlestickchart [data]="data" [xAxis]="xAxis" />
        </div>
        <app-code></app-code>
    `
})
export class OhlcChartDoc {
    xAxis = { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] };

    data = [
        [2320.26, 2320.26, 2287.3, 2362.94],
        [2300, 2291.3, 2288.26, 2308.38],
        [2295.35, 2346.5, 2295.35, 2346.92],
        [2347.22, 2358.98, 2337.35, 2363.8],
        [2360.75, 2382.48, 2347.89, 2383.76]
    ];
}
