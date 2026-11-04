import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'boxplot-light-velocity2-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Boxplot distribution overlaid with individual outlier scatter markers.</p>
        </app-docsectiontext>
        <div class="card">
            <p-boxplotchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BoxplotLightVelocity2Doc {
    options = {
        xAxis: { type: 'category', data: ['Batch A', 'Batch B'] },
        yAxis: { type: 'value' },
        series: [
            {
                name: 'Summary',
                type: 'boxplot',
                data: [
                    [700, 800, 850, 900, 1000],
                    [650, 750, 820, 890, 980]
                ]
            },
            {
                name: 'Outlier',
                type: 'scatter',
                data: [
                    [0, 620],
                    [1, 1050]
                ]
            }
        ]
    };
}
