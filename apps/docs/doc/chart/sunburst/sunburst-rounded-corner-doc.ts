import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'sunburst-rounded-corner-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Sunburst sector arcs styled with smooth rounded corner caps and inner stroke gaps.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SunburstRoundedCornerDoc {
    options = {
        series: {
            type: 'sunburst',
            data: [
                {
                    name: 'A',
                    value: 20,
                    children: [
                        { name: 'A1', value: 12 },
                        { name: 'A2', value: 8 }
                    ]
                },
                { name: 'B', value: 15 }
            ],
            radius: [0, '90%'],
            itemStyle: { borderRadius: 7, borderWidth: 2 }
        }
    };
}
