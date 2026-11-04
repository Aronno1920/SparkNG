import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'custom-graphic-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>The <i>graphic</i> component overlays free-form shapes on the plot — annotations, lines and text positioned in pixel or percentage coordinates.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class CustomGraphicDoc {
    options = {
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        yAxis: { type: 'value' },
        series: [
            {
                type: 'line',
                data: [150, 232, 201, 254, 290, 330, 310],
                markLine: { symbol: 'none', data: [{ yAxis: 280 }] }
            }
        ],
        graphic: [
            {
                type: 'group',
                right: 24,
                top: 24,
                children: [
                    {
                        type: 'rect',
                        shape: { width: 132, height: 34, r: 6 },
                        style: { fill: 'rgba(84,112,198,0.12)', stroke: '#5470c6' }
                    },
                    {
                        type: 'text',
                        left: 12,
                        top: 8,
                        style: { text: 'Threshold 280', fill: '#5470c6', font: '13px sans-serif' }
                    }
                ]
            },
            {
                type: 'text',
                left: 'center',
                bottom: 12,
                style: { text: 'Peak days above the annotated threshold', fill: '#888', font: '12px sans-serif' }
            }
        ]
    };
}
