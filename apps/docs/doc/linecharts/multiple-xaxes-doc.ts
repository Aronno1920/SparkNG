import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'multiple-xaxes-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Two x axes share one y axis: rainfall on the bottom axis and temperature on the top, each series bound with <i>xAxisIndex</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MultipleXaxesDoc {
    options = {
        tooltip: { trigger: 'axis' },
        legend: {},
        grid: { left: 64, right: 64 },
        xAxis: [
            { type: 'category', position: 'bottom', name: 'Rainfall', nameLocation: 'center', nameGap: 32, data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12'] },
            { type: 'category', position: 'top', name: 'Temperature', nameLocation: 'center', nameGap: 32, data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12'] }
        ],
        yAxis: { type: 'value' },
        series: [
            { name: 'Rainfall', type: 'line', xAxisIndex: 0, data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3] },
            { name: 'Temperature', type: 'line', xAxisIndex: 1, symbol: 'triangle', symbolSize: 8, data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2] }
        ]
    };
}
