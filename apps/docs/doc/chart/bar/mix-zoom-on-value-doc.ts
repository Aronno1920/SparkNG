import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'mix-zoom-on-value-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Mix Zoom On Value provides interactive zoom sliders and inside zooming on value axes.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MixZoomOnValueDoc {
    data = [
        { category: '1', value: 10 },
        { category: '2', value: 52 },
        { category: '3', value: 200 },
        { category: '4', value: 334 },
        { category: '5', value: 390 },
        { category: '6', value: 330 },
        { category: '7', value: 220 }
    ];

    options = {
        dataZoom: [
            { type: 'inside', yAxisIndex: 0 },
            { type: 'slider', yAxisIndex: 0, left: 'right' }
        ]
    };
}
