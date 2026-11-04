import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-race-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Dynamic bar race with horizontal bars sorted by descending values.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BarRaceDoc {
    options = {
        xAxis: { max: 'dataMax' },
        yAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'], inverse: true },
        series: [{ realtimeSort: true, type: 'bar', data: [120, 200, 150, 80, 240], label: { show: true, position: 'right' } }]
    };
}
