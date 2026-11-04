import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'combo-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>The generic <i>p-chart</i> accepts a complete SparkNG Charts option object, which is the escape hatch for combinations — mixing series types in one plot — and for everything beyond the typed components.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ComboDoc {
    options = {
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        yAxis: [
            { type: 'value', name: 'Precipitation' },
            { type: 'value', name: 'Temperature' }
        ],
        series: [
            { name: 'Precipitation', type: 'bar', data: [20, 49, 70, 232, 256, 767, 135] },
            { name: 'Temperature', type: 'line', yAxisIndex: 1, smooth: true, data: [12, 13, 14, 16, 18, 21, 23] }
        ]
    };
}
