import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'clickable-column-gradient-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Interactive column chart featuring a vertical linear gradient fill.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ClickableColumnGradientDoc {
    options = {
        title: { text: 'Gradient Columns' },
        xAxis: { data: ['A', 'B', 'C', 'D', 'E', 'F'], axisTick: { show: false } },
        yAxis: { axisLine: { show: false }, axisTick: { show: false } },
        series: [
            {
                type: 'bar',
                showBackground: true,
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: '#83bff6' },
                            { offset: 1, color: '#188df0' }
                        ]
                    }
                },
                data: [220, 182, 191, 234, 290, 330]
            }
        ]
    };
}
