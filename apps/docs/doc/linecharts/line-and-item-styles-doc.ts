import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'line-and-item-styles-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Every visual aspect of the line and the symbols is configurable through <i>lineStyle</i> and <i>itemStyle</i> — width, dash type, joins and colors.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', data: months }" [yAxis]="{ type: 'value' }" [tooltip]="{ trigger: 'axis' }" />
        </div>
        <app-code></app-code>
    `
})
export class LineAndItemStylesDoc {
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    series = [
        {
            name: 'Solid + circles',
            type: 'line',
            symbol: 'circle',
            symbolSize: 9,
            lineStyle: { width: 4, color: '#5470c6' },
            itemStyle: { borderWidth: 2, borderColor: '#fff', color: '#5470c6' },
            data: [150, 232, 201, 254, 290, 330, 310, 356, 402, 387, 361, 399]
        },
        {
            name: 'Dashed + rects',
            type: 'line',
            symbol: 'rect',
            symbolSize: 10,
            lineStyle: { width: 3, type: 'dashed', color: '#91cc75' },
            itemStyle: { borderWidth: 2, borderColor: '#fff', color: '#91cc75' },
            data: [120, 182, 191, 204, 230, 270, 290, 276, 322, 307, 281, 319]
        },
        {
            name: 'Dotted + diamonds',
            type: 'line',
            symbol: 'diamond',
            symbolSize: 12,
            lineStyle: { width: 2, type: 'dotted', color: '#fac858' },
            itemStyle: { borderWidth: 2, borderColor: '#fff', color: '#fac858' },
            data: [90, 132, 151, 174, 200, 240, 260, 246, 292, 277, 251, 289]
        }
    ];
}
