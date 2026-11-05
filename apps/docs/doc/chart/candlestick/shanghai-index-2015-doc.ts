import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'shanghai-index-2015-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Shanghai Index, 2015 visualizes historic market volatility with dual MA indicators and volume bars.</p>
        </app-docsectiontext>
        <div class="card">
            <p-candlestickchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ShanghaiIndex2015Doc {
    data = [
        [2320.26, 2302.6, 2287.3, 2362.94],
        [2300, 2291.3, 2288.26, 2308.38],
        [2295.35, 2346.5, 2295.35, 2346.92],
        [2347.22, 2358.98, 2337.35, 2363.8],
        [2360.75, 2382.48, 2347.89, 2383.76]
    ];

    options = {
        xAxis: {
            data: ['2015-01-05', '2015-01-06', '2015-01-07', '2015-01-08', '2015-01-09']
        }
    };
}
