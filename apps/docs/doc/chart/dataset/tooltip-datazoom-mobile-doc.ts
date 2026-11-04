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
            <p>Touch-friendly interactive DataZoom slider with dense timeline tooltips.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class TooltipDatazoomMobileDoc {
    options = {
        tooltip: { trigger: 'axis', confine: true },
        dataZoom: [{ type: 'inside' }, { type: 'slider' }],
        xAxis: { type: 'category', data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
        yAxis: { type: 'value' },
        series: [{ type: 'line', data: [15, 23, 22, 21, 13, 14, 26, 35, 42, 38], smooth: true }]
    };
}
