import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'polar-end-angle-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Two polar coordinate systems limit their angle axes with <i>startAngle</i> and <i>endAngle</i>, one spanning the first quadrant and the other the third.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PolarEndAngleDoc {
    options = {
        tooltip: {},
        angleAxis: [
            {
                type: 'category',
                polarIndex: 0,
                startAngle: 90,
                endAngle: 0,
                data: ['S1', 'S2', 'S3']
            },
            {
                type: 'category',
                polarIndex: 1,
                startAngle: -90,
                endAngle: -180,
                data: ['T1', 'T2', 'T3']
            }
        ],
        radiusAxis: [{ polarIndex: 0 }, { polarIndex: 1 }],
        polar: [{}, {}],
        series: [
            {
                type: 'bar',
                polarIndex: 0,
                data: [1, 2, 3],
                coordinateSystem: 'polar'
            },
            {
                type: 'bar',
                polarIndex: 1,
                data: [1, 2, 3],
                coordinateSystem: 'polar'
            }
        ]
    };
}
