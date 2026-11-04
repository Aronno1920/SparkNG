import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'wind-barb-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Meteorological wind direction barb and velocity chart mapped along timeline intervals.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class WindBarbDoc {
    options = {
        xAxis: { type: 'category', data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'] },
        yAxis: { type: 'value', name: 'Knots' },
        series: [{ type: 'line', data: [12, 15, 18, 22, 25, 20, 16, 10], markPoint: { data: [{ type: 'max' }] } }]
    };
}
