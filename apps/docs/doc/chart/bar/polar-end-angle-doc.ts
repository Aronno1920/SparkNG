import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'polar-end-angle-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Polar bars constrained within a customized angle span arc.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PolarEndAngleDoc {
    options = {
        angleAxis: { max: 2, startAngle: 30, endAngle: 210 },
        radiusAxis: { type: 'category', data: ['v', 'w', 'x', 'y', 'z'] },
        polar: {},
        series: [{ type: 'bar', data: [1.2, 1.8, 0.9, 1.5, 2.0], coordinateSystem: 'polar', name: 'A' }]
    };
}
