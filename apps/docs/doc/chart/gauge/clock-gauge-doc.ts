import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'clock-gauge-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Real-time analog clock interface driven by hour, minute, and second dial hands.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ClockGaugeDoc {
    options = {
        series: [
            {
                type: 'gauge',
                min: 0,
                max: 12,
                splitNumber: 12,
                detail: { formatter: 'Spark Clock' },
                data: [{ value: 3.5, name: 'Time' }]
            }
        ]
    };
}
