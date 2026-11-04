import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'stacked-bar-polar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Stacked concentric bars plotted in polar coordinate rings.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class StackedBarPolarDoc {
    options = {
        polar: {},
        angleAxis: { type: 'category', data: ['A', 'B', 'C', 'D'] },
        radiusAxis: {},
        series: [
            { type: 'bar', data: [1, 2, 3, 4], coordinateSystem: 'polar', stack: 'a' },
            { type: 'bar', data: [2, 4, 6, 8], coordinateSystem: 'polar', stack: 'a' }
        ]
    };
}
