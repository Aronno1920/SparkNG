import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'stacked-area-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Stacked lines with <i>areaStyle</i> form a stacked area chart; each band shows its cumulative contribution.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', boundaryGap: false, data: days }" />
        </div>
        <app-code></app-code>
    `
})
export class StackedAreaDoc {
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    series = [
        { name: 'Email', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Union Ads', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: [220, 182, 191, 234, 290, 330, 310] },
        { name: 'Video Ads', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: [150, 232, 201, 154, 190, 330, 410] },
        { name: 'Direct', type: 'line', stack: 'Total', areaStyle: {}, emphasis: { focus: 'series' }, data: [320, 332, 301, 334, 390, 330, 320] }
    ];
}
