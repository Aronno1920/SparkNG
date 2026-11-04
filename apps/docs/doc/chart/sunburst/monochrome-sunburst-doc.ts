import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'monochrome-sunburst-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Single-hue palette graduated across radial hierarchy depth rings.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MonochromeSunburstDoc {
    options = {
        series: {
            type: 'sunburst',
            data: [
                {
                    name: 'Origin',
                    itemStyle: { color: '#6366f1' },
                    children: [
                        { name: 'Branch A', value: 10 },
                        { name: 'Branch B', value: 20 }
                    ]
                }
            ]
        }
    };
}
