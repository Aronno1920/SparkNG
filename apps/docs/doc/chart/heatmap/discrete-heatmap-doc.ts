import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'discrete-heatmap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Discrete Heatmap breaks data ranges into categorized color intervals with a piecewise legend.</p>
        </app-docsectiontext>
        <div class="card">
            <p-heatmapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class DiscreteHeatmapDoc {
    options = {
        tooltip: { position: 'top' },
        grid: { height: '55%', top: '15%' },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            splitArea: { show: true }
        },
        yAxis: {
            type: 'category',
            data: ['Morning', 'Afternoon', 'Evening', 'Night'],
            splitArea: { show: true }
        },
        visualMap: {
            type: 'piecewise',
            pieces: [
                { min: 8, label: 'High (8-10)', color: '#ef4444' },
                { min: 4, max: 7, label: 'Medium (4-7)', color: '#f59e0b' },
                { max: 3, label: 'Low (0-3)', color: '#10b981' }
            ],
            orient: 'horizontal',
            left: 'center',
            top: 20
        },
        series: [
            {
                name: 'Server Load',
                type: 'heatmap',
                data: [
                    [0, 0, 2],
                    [0, 1, 7],
                    [0, 2, 9],
                    [0, 3, 3],
                    [1, 0, 1],
                    [1, 1, 6],
                    [1, 2, 8],
                    [1, 3, 2],
                    [2, 0, 3],
                    [2, 1, 8],
                    [2, 2, 10],
                    [2, 3, 4],
                    [3, 0, 2],
                    [3, 1, 5],
                    [3, 2, 7],
                    [3, 3, 3],
                    [4, 0, 4],
                    [4, 1, 9],
                    [4, 2, 9],
                    [4, 3, 5]
                ],
                label: { show: true }
            }
        ]
    };
}
