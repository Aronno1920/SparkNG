import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-sunburst-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Multi-tiered radial hierarchy rendered as concentric circular sectors.</p>
        </app-docsectiontext>
        <div class="card">
            <p-sunburstchart [data]="data" />
        </div>
        <app-code></app-code>
    `
})
export class BasicSunburstDoc {
    data = [
        {
            name: 'Grandpa',
            children: [
                {
                    name: 'Uncle Leo',
                    value: 15,
                    children: [
                        { name: 'Cousin Jack', value: 2 },
                        { name: 'Cousin Mary', value: 5 }
                    ]
                },
                {
                    name: 'Father',
                    value: 10,
                    children: [{ name: 'Me', value: 5 }]
                }
            ]
        }
    ];
}
