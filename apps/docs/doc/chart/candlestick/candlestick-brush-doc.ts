import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'candlestick-brush-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Brush selection tool for inspecting date ranges and calculating period returns.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class CandlestickBrushDoc {
    options = {
        brush: { toolbox: ['lineX', 'clear'], xAxisIndex: 0 },
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
        yAxis: { scale: true },
        series: [
            {
                type: 'candlestick',
                data: [
                    [20, 30, 15, 35],
                    [30, 25, 20, 32],
                    [25, 35, 24, 38],
                    [35, 40, 32, 42],
                    [40, 38, 35, 45]
                ]
            }
        ]
    };
}
