import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-polar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Polar coordinate bar chart with radial petals.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BarPolarDoc {
    options = {
        polar: {},
        angleAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] },
        radiusAxis: {},
        series: [{ type: 'bar', data: [1, 2, 3, 4], coordinateSystem: 'polar' }]
    };
}
