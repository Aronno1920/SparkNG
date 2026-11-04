import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'scatter-aqi-color-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Points colored continuously according to Air Quality Index thresholds.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterAqiColorDoc {
    options = {
        visualMap: {
            min: 0,
            max: 300,
            dimension: 1,
            inRange: { color: ['#67c23a', '#e6a23c', '#f56c6c', '#909399'] }
        },
        xAxis: { type: 'value' },
        yAxis: { type: 'value' },
        series: [
            {
                type: 'scatter',
                data: [
                    [10, 45],
                    [20, 85],
                    [30, 140],
                    [40, 210],
                    [50, 280]
                ]
            }
        ]
    };
}
