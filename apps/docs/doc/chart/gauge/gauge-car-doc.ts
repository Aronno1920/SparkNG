import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'gauge-car-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Automotive dashboard cluster dial showing RPM and fuel reserve indicators.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class GaugeCarDoc {
    options = {
        series: [
            {
                type: 'gauge',
                min: 0,
                max: 8,
                detail: { formatter: '{value} x1000 RPM' },
                data: [{ value: 4.2, name: 'TACHO' }]
            }
        ]
    };
}
