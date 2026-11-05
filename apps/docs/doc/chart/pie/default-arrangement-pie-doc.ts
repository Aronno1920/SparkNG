import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'default-arrangement-pie-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Default arrangement displays multiple pie series partitioned across layout quadrants.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class DefaultArrangementPieDoc {
    options = {
        title: [
            { text: 'Regional Distribution', left: '25%', top: '5%', textAlign: 'center' },
            { text: 'Product Share', left: '75%', top: '5%', textAlign: 'center' }
        ],
        series: [
            {
                type: 'pie',
                radius: '40%',
                center: ['25%', '50%'],
                data: [
                    { value: 335, name: 'North' },
                    { value: 310, name: 'South' },
                    { value: 234, name: 'East' },
                    { value: 135, name: 'West' }
                ]
            },
            {
                type: 'pie',
                radius: '40%',
                center: ['75%', '50%'],
                data: [
                    { value: 400, name: 'Hardware' },
                    { value: 300, name: 'Software' },
                    { value: 200, name: 'Services' }
                ]
            }
        ]
    };
}
