import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-area-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>An area chart fills the region below the line; enable it with the <i>area</i> property.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', boundaryGap: false, data: days }" [yAxis]="{ type: 'value' }" />
        </div>
        <app-code></app-code>
    `
})
export class BasicAreaDoc {
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    series = [
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: { opacity: 0.3 },
            emphasis: { focus: 'series' },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: { opacity: 0.3 },
            emphasis: { focus: 'series' },
            data: [220, 182, 191, 234, 290, 330, 310]
        }
    ];
}
