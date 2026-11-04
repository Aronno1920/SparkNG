import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'simple-gauge-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Minimalist circular progress ring with centered percentage readout.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SimpleGaugeDoc {
    options = {
        series: [
            {
                type: 'gauge',
                progress: { show: true, width: 8 },
                axisLine: { lineStyle: { width: 8 } },
                pointer: { show: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                detail: { valueAnimation: true, fontSize: 32, offsetCenter: [0, 0], formatter: '{value}%' },
                data: [{ value: 78 }]
            }
        ]
    };
}
