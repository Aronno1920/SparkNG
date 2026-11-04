import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'tooltip-datazoom-mobile-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Touch friendly defaults: the tooltip follows the finger without transition delay and an <i>inside</i> dataZoom responds to pinch gestures, so no slider space is needed on small screens.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" height="18rem" />
        </div>
        <app-code></app-code>
    `
})
export class TooltipDatazoomMobileDoc {
    xs: string[] = [];

    data: number[] = [];

    options: any;

    constructor() {
        for (let i = 0; i < 90; i++) {
            this.xs.push(String(i));
            this.data.push(Math.round((Math.sin(i / 10) + 1) * 90 + Math.random() * 30));
        }
        this.options = {
            tooltip: {
                trigger: 'axis',
                transitionDuration: 0,
                confine: true,
                axisPointer: { type: 'cross', label: { precision: 0 } }
            },
            grid: { left: 48, right: 16 },
            xAxis: { type: 'category', boundaryGap: false, data: this.xs },
            yAxis: { type: 'value', boundaryGap: [0, '100%'] },
            dataZoom: [
                { type: 'inside', start: 40, end: 70, zoomOnMouseWheel: true, zoomLock: false },
                { type: 'inside', filterMode: 'weakFilter' }
            ],
            series: [{ type: 'line', showSymbol: false, data: this.data, areaStyle: { opacity: 0.15 } }]
        };
    }
}
