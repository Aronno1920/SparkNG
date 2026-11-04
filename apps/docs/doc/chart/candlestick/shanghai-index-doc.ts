import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'shanghai-index-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Stock index candlestick chart paired with moving average indicator lines (MA5, MA10).</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ShanghaiIndexDoc {
    options = {
        title: { text: 'Shanghai Index', left: 0 },
        tooltip: { trigger: 'axis' },
        legend: { data: ['Daily', 'MA5', 'MA10'] },
        xAxis: { type: 'category', data: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'] },
        yAxis: { scale: true },
        series: [
            {
                name: 'Daily',
                type: 'candlestick',
                data: [
                    [20, 34, 10, 38],
                    [40, 35, 30, 50],
                    [31, 38, 33, 44],
                    [38, 15, 5, 42],
                    [20, 28, 18, 35]
                ]
            },
            { name: 'MA5', type: 'line', data: [20, 27.5, 28.6, 26.2, 26.4], smooth: true }
        ]
    };
}
