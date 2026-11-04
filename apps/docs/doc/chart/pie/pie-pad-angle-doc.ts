import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'pie-pad-angle-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Pie slices separated by a distinct angular padding interval.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PiePadAngleDoc {
    options = {
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                padAngle: 5,
                itemStyle: { borderRadius: 6 },
                data: [
                    { value: 40, name: 'A' },
                    { value: 38, name: 'B' },
                    { value: 32, name: 'C' },
                    { value: 30, name: 'D' }
                ]
            }
        ]
    };
}
