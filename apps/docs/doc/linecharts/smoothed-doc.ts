import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'smoothed-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Smoothed curves are enabled with the <i>smooth</i> property of the line series.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', boundaryGap: false, data: days }" />
        </div>
        <app-code></app-code>
    `
})
export class SmoothedDoc {
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    series = [
        { name: 'Email', type: 'line', smooth: true, data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Search', type: 'line', smooth: true, data: [220, 182, 191, 234, 290, 330, 310] }
    ];
}
