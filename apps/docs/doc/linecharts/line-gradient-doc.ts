import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'line-gradient-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>The stroke itself can be a gradient: this series blends from blue at the start to green at the end of the visible range.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', boundaryGap: false, data: days }" [yAxis]="{ type: 'value' }" />
        </div>
        <app-code></app-code>
    `
})
export class LineGradientDoc {
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    series = [
        {
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
                width: 4,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                        { offset: 0, color: '#5470c6' },
                        { offset: 0.5, color: '#37A2FF' },
                        { offset: 1, color: '#91cc75' }
                    ]
                }
            },
            data: [120, 232, 201, 334, 290, 330, 220]
        }
    ];
}
