import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'stacked-line-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Lines that share a <i>stack</i> group are plotted cumulatively; hover a series to focus it.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', boundaryGap: false, data: days }" [tooltip]="{ trigger: 'axis', axisPointer: { type: 'cross' } }" />
        </div>
        <app-code></app-code>
    `
})
export class StackedLineDoc {
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    series = [
        { name: 'Email', type: 'line', stack: 'Total', data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Search', type: 'line', stack: 'Total', data: [220, 182, 191, 234, 290, 330, 310] },
        { name: 'Video Ads', type: 'line', stack: 'Total', data: [150, 232, 201, 154, 190, 330, 410] },
        { name: 'Direct', type: 'line', stack: 'Total', data: [320, 332, 301, 334, 390, 330, 320] }
    ];
}
