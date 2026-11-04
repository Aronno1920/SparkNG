import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'rounded-bar-polar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Polar bar series with rounded caps on radial bars.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class RoundedBarPolarDoc {
    options = {
        polar: { radius: [30, '80%'] },
        angleAxis: { max: 100, startAngle: 90 },
        radiusAxis: { type: 'category', data: ['Score A', 'Score B', 'Score C'] },
        series: [
            {
                type: 'bar',
                data: [65, 80, 95],
                coordinateSystem: 'polar',
                roundCap: true,
                itemStyle: { color: '#6366f1' }
            }
        ]
    };
}
