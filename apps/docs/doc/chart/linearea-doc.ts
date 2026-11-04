import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'linearea-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>The <i>smooth</i>, <i>area</i>, <i>step</i> and <i>stack</i> properties map to the matching line series options, so common line styles need no raw chart option configuration.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', data: days }" [yAxis]="{ type: 'value' }" />
        </div>
        <app-code></app-code>
    `
})
export class LineAreaDoc {
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    series = [
        { name: 'Email', type: 'line', stack: 'channel', smooth: true, areaStyle: {}, data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Search', type: 'line', stack: 'channel', smooth: true, areaStyle: {}, data: [220, 182, 191, 234, 290, 330, 310] },
        { name: 'Direct', type: 'line', stack: 'channel', smooth: true, areaStyle: {}, data: [150, 232, 201, 154, 190, 330, 410] }
    ];
}
