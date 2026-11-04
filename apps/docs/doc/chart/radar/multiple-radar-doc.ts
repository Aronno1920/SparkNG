import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'multiple-radar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Dual radar polygons side-by-side on a single canvas for comparative analysis.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MultipleRadarDoc {
    options = {
        radar: [
            {
                indicator: [
                    { name: 'A', max: 100 },
                    { name: 'B', max: 100 },
                    { name: 'C', max: 100 }
                ],
                center: ['25%', '50%'],
                radius: 80
            },
            {
                indicator: [
                    { name: 'X', max: 100 },
                    { name: 'Y', max: 100 },
                    { name: 'Z', max: 100 }
                ],
                center: ['75%', '50%'],
                radius: 80
            }
        ],
        series: [
            { type: 'radar', radarIndex: 0, data: [{ value: [60, 73, 85] }] },
            { type: 'radar', radarIndex: 1, data: [{ value: [85, 90, 70] }] }
        ]
    };
}
