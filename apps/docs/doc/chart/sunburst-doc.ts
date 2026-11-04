import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'sunburst-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A sunburst chart maps hierarchy depth to concentric rings; sector size is proportional to the leaf <i>value</i>s.</p>
        </app-docsectiontext>
        <div class="card">
            <p-sunburstchart [data]="data" [radius]="['10%', '90%']" />
        </div>
        <app-code></app-code>
    `
})
export class SunburstDoc {
    data = [
        {
            name: 'Components',
            children: [
                {
                    name: 'Inputs',
                    children: [
                        { name: 'Select', value: 18 },
                        { name: 'DatePicker', value: 14 },
                        { name: 'AutoComplete', value: 10 }
                    ]
                },
                {
                    name: 'Data',
                    children: [
                        { name: 'Table', value: 22 },
                        { name: 'Chart', value: 16 },
                        { name: 'Scheduler', value: 9 }
                    ]
                }
            ]
        },
        {
            name: 'Directives',
            children: [
                { name: 'Ripple', value: 8 },
                { name: 'Tooltip', value: 11 },
                { name: 'FocusTrap', value: 6 }
            ]
        }
    ];
}
