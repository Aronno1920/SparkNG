import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'step-line-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Step lines render discrete changes with the <i>step</i> property: <i>start</i>, <i>middle</i> and <i>end</i> control where the vertical jump happens.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', data: days }" [yAxis]="{ type: 'value' }" [tooltip]="{ trigger: 'axis' }" />
        </div>
        <app-code></app-code>
    `
})
export class StepLineDoc {
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    series = [
        { name: 'Step Start', type: 'line', step: 'start', data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Step Middle', type: 'line', step: 'middle', data: [220, 282, 201, 234, 290, 430, 410] },
        { name: 'Step End', type: 'line', step: 'end', data: [450, 432, 401, 454, 590, 530, 510] }
    ];
}
