import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'ring-gauge-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Concentric multi-ring activity tracker gauge similar to fitness wearable dials.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class RingGaugeDoc {
    options = {
        series: [
            {
                type: 'gauge',
                startAngle: 90,
                endAngle: -270,
                pointer: { show: false },
                progress: { show: true, overlap: false, roundCap: true, clip: false },
                axisLine: { lineStyle: { width: 30 } },
                data: [
                    { value: 80, name: 'Move', title: { offsetCenter: ['0%', '-20%'] } },
                    { value: 60, name: 'Exercise', title: { offsetCenter: ['0%', '0%'] } },
                    { value: 40, name: 'Stand', title: { offsetCenter: ['0%', '20%'] } }
                ]
            }
        ]
    };
}
