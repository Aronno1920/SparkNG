import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'cartesian-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>The cartesian coordinate system in full: multiple grids share the canvas, each with its own axes and a line series, linked through one <i>connective</i> axis pointer.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class CartesianDoc {
    options = {
        axisPointer: { link: [{ xAxisIndex: 'all' }] },
        tooltip: { trigger: 'axis' },
        grid: [
            { left: 56, right: 24, top: 48, height: '32%' },
            { left: 56, right: 24, top: '58%', height: '32%' }
        ],
        xAxis: [
            { type: 'category', gridIndex: 0, boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
            { type: 'category', gridIndex: 1, boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
        ],
        yAxis: [
            { type: 'value', gridIndex: 0, name: 'Sessions' },
            { type: 'value', gridIndex: 1, name: 'Signups' }
        ],
        series: [
            { name: 'Sessions', type: 'line', xAxisIndex: 0, yAxisIndex: 0, smooth: true, data: [320, 332, 301, 334, 390, 330, 320] },
            { name: 'Signups', type: 'line', xAxisIndex: 1, yAxisIndex: 1, step: 'end', data: [32, 42, 38, 51, 62, 58, 71] }
        ]
    };
}
