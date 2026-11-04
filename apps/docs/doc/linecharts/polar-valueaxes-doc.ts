import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'polar-valueaxes-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Lines also live in polar coordinates with value axes on both the angle and the radius — a spiral emerges when the angle grows with the data index.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PolarValueaxesDoc {
    data: [number, number][] = [];

    options: any;

    constructor() {
        for (let i = 0; i <= 360; i += 4) {
            const radians = (i * Math.PI) / 180;
            const radius = i / 2;
            this.data.push([+radius.toFixed(1), +(Math.sin(radians * 3) * 40 + radius / 2).toFixed(1)]);
        }
        this.options = {
            polar: {},
            tooltip: { trigger: 'axis' },
            angleAxis: { type: 'value', startAngle: 0, max: 180 },
            radiusAxis: { type: 'value' },
            series: [
                {
                    coordinateSystem: 'polar',
                    type: 'line',
                    showSymbol: false,
                    data: this.data
                }
            ]
        };
    }
}
