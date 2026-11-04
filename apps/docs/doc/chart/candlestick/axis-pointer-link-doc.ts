import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'axis-pointer-link-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Synchronized crosshair pointers linking candlestick price action to volume panes.</p>
        </app-docsectiontext>
        <div class="card">
            <p-candlestickchart [data]="data" [xAxis]="xAxis" />
        </div>
        <app-code></app-code>
    `
})
export class AxisPointerLinkDoc {
    xAxis = { type: 'category', data: ['09:30', '10:00', '10:30', '11:00', '11:30'] };

    data = [
        [50, 55, 48, 58],
        [55, 52, 50, 56],
        [52, 60, 51, 62],
        [60, 58, 57, 63],
        [58, 64, 57, 65]
    ];
}
