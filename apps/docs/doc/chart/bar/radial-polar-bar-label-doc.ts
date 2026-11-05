import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'radial-polar-bar-label-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Labels sit at the middle of each radial bar; switching <i>label.position</i> between <i>start</i>, <i>insideStart</i>, <i>end</i> and <i>insideEnd</i> moves them along the radius.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class RadialPolarBarLabelDoc {
    options = {
        title: [
            {
                text: 'Radial Polar Bar Label Position (middle)'
            }
        ],
        polar: {
            radius: [30, '80%']
        },
        radiusAxis: {
            max: 4
        },
        angleAxis: {
            type: 'category',
            data: ['a', 'b', 'c', 'd'],
            startAngle: 75
        },
        tooltip: {},
        series: {
            type: 'bar',
            data: [2, 1.2, 2.4, 3.6],
            coordinateSystem: 'polar',
            label: {
                show: true,
                position: 'middle', // or 'start', 'insideStart', 'end', 'insideEnd'
                formatter: '{b}: {c}'
            }
        },
        animation: false
    };
}
