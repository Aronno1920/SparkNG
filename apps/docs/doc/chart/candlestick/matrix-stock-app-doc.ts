import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'matrix-stock-app-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Matrix Stock Application showcases multi-chart synchronisation with linked crosshairs and dataZoom.</p>
        </app-docsectiontext>
        <div class="card">
            <p-candlestickchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MatrixStockAppDoc {
    data = [
        [2320.26, 2320.26, 2287.3, 2362.94],
        [2300, 2291.3, 2288.26, 2308.38],
        [2295.35, 2346.5, 2295.35, 2346.92]
    ];

    options = {
        axisPointer: { link: [{ xAxisIndex: 'all' }] }
    };
}
