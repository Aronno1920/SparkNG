import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bubble-chart-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Scatter chart where point radius represents a third numerical metric.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BubbleChartDoc {
    options = {
        xAxis: { type: 'value', name: 'GDP' },
        yAxis: { type: 'value', name: 'Life Expectancy' },
        series: [
            {
                type: 'scatter',
                symbolSize: (data: any[]) => data[2] / 5,
                data: [
                    [28604, 77, 170],
                    [31163, 77.4, 240],
                    [1516, 68, 80],
                    [13670, 74.7, 120],
                    [28599, 75, 190]
                ]
            }
        ]
    };
}
