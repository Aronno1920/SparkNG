import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'large-scale-area-chart-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Area chart rendering thousands of records smoothly with slider and inside DataZoom controls.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LargeScaleAreaChartDoc {
    options = {
        tooltip: { trigger: 'axis' },
        dataZoom: [
            { type: 'inside', start: 0, end: 50 },
            { type: 'slider', start: 0, end: 50 }
        ],
        xAxis: { type: 'category', data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'] },
        yAxis: { type: 'value' },
        series: [{ type: 'line', areaStyle: {}, data: [22, 18, 15, 12, 35, 68, 92, 85, 78, 90, 64, 40] }]
    };
}
