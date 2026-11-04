import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'grade-gauge-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Tiered performance grade meter evaluating score brackets (A, B, C, D).</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class GradeGaugeDoc {
    options = {
        series: [
            {
                type: 'gauge',
                min: 0,
                max: 100,
                detail: {
                    formatter: (val: number) => (val >= 90 ? 'Grade A' : val >= 75 ? 'Grade B' : 'Grade C')
                },
                data: [{ value: 92 }]
            }
        ]
    };
}
