import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'large-scale-candlestick-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>High-frequency time-series candlestick chart with interactive DataZoom viewport control.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LargeScaleCandlestickDoc {
    options = {
        xAxis: { type: 'category', data: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'] },
        yAxis: { scale: true },
        dataZoom: [{ type: 'inside' }, { type: 'slider' }],
        series: [
            {
                type: 'candlestick',
                data: [
                    [100, 110, 95, 115],
                    [110, 105, 102, 112],
                    [105, 120, 104, 122],
                    [120, 118, 115, 125],
                    [118, 130, 117, 135],
                    [130, 125, 120, 132],
                    [125, 140, 124, 142],
                    [140, 138, 132, 145]
                ]
            }
        ]
    };
}
