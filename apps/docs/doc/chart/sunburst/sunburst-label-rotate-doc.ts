import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'sunburst-label-rotate-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Labels configured with radial, tangential, and horizontal rotation orientations.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SunburstLabelRotateDoc {
    options = {
        series: {
            type: 'sunburst',
            data: [
                {
                    name: 'Core',
                    children: [
                        { name: 'Leaf 1', value: 10 },
                        { name: 'Leaf 2', value: 20 }
                    ]
                }
            ],
            label: { rotate: 'radial' }
        }
    };
}
