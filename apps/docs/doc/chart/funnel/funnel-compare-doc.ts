import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'funnel-compare-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Dual overlapping funnels comparing projected conversion expectations against actual outcomes.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class FunnelCompareDoc {
    options = {
        tooltip: { trigger: 'item' },
        series: [
            {
                name: 'Expected',
                type: 'funnel',
                left: '10%',
                width: '80%',
                label: { formatter: '{b} Expected' },
                data: [
                    { value: 100, name: 'Visit' },
                    { value: 60, name: 'Order' }
                ]
            },
            {
                name: 'Actual',
                type: 'funnel',
                left: '10%',
                width: '80%',
                maxSize: '80%',
                label: { position: 'inside', formatter: '{c}%' },
                data: [
                    { value: 80, name: 'Visit' },
                    { value: 45, name: 'Order' }
                ]
            }
        ]
    };
}
