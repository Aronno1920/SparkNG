import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'speed-gauge-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Vehicle speedometer display with km/h units and dynamic needle angle.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SpeedGaugeDoc {
    options = {
        series: [
            {
                type: 'gauge',
                min: 0,
                max: 220,
                splitNumber: 11,
                detail: { formatter: '{value} km/h' },
                data: [{ value: 120, name: 'SPEED' }]
            }
        ]
    };
}
