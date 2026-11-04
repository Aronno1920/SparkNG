import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'tangential-polar-bar-label-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Displays polar bars with labels rotated tangentially along circular arcs.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class TangentialPolarBarLabelDoc {
    options = {
        title: [{ text: 'Tangential Polar Bar' }],
        polar: { radius: [30, '80%'] },
        angleAxis: { max: 4, startAngle: 75 },
        radiusAxis: { type: 'category', data: ['a', 'b', 'c', 'd'] },
        tooltip: {},
        series: {
            type: 'bar',
            data: [2, 1.2, 2.4, 3.6],
            coordinateSystem: 'polar',
            label: { show: true, position: 'middle', formatter: '{b}: {c}' }
        }
    };
}
