import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'gauge-barometer-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Gauge Barometer chart displays atmospheric pressure with dual hPa and mmHg scales.</p>
        </app-docsectiontext>
        <div class="card">
            <p-gaugechart [value]="1013" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class GaugeBarometerDoc {
    options = {
        series: [
            {
                type: 'gauge',
                min: 950,
                max: 1050,
                axisLine: { lineStyle: { width: 10 } },
                detail: { formatter: '{value} hPa', fontSize: 18 }
            }
        ]
    };
}
