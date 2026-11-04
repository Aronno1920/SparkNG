import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'multi-title-gauge-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Composite dashboard cluster displaying CPU, RAM, and Disk utilization simultaneously.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MultiTitleGaugeDoc {
    options = {
        series: [
            {
                type: 'gauge',
                center: ['25%', '50%'],
                radius: '65%',
                data: [{ value: 45, name: 'CPU' }]
            },
            {
                type: 'gauge',
                center: ['75%', '50%'],
                radius: '65%',
                data: [{ value: 82, name: 'RAM' }]
            }
        ]
    };
}
