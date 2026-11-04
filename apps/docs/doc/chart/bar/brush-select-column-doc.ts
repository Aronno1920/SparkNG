import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'brush-select-column-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Interactive rectangular brush selection for highlighting regions of interest.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BrushSelectColumnDoc {
    options = {
        brush: { toolbox: ['rect', 'clear'], xAxisIndex: 0 },
        xAxis: { type: 'category', data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
        yAxis: { type: 'value' },
        series: [{ type: 'bar', data: [10, 52, 200, 334, 390, 330, 220, 180, 240, 310] }]
    };
}
