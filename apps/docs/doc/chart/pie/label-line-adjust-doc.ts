import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'label-line-adjust-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Customized curved label leader lines with tailored line lengths.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LabelLineAdjustDoc {
    options = {
        series: [
            {
                type: 'pie',
                radius: '55%',
                labelLine: { length: 20, length2: 30, smooth: true },
                data: [
                    { value: 335, name: 'Direct' },
                    { value: 310, name: 'Email' },
                    { value: 234, name: 'Affiliate' }
                ]
            }
        ]
    };
}
