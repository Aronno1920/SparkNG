import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'continuous-heatmap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Continuous Heatmap renders smooth density distributions with continuous gradient mapping.</p>
        </app-docsectiontext>
        <div class="card">
            <p-heatmapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ContinuousHeatmapDoc {
    options = {
        tooltip: { position: 'top' },
        grid: { height: '50%', top: '10%' },
        xAxis: {
            type: 'category',
            data: ['0h', '2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h']
        },
        yAxis: {
            type: 'category',
            data: ['North', 'East', 'South', 'West']
        },
        visualMap: {
            min: 0,
            max: 100,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%',
            inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            }
        },
        series: [
            {
                name: 'Network Traffic',
                type: 'heatmap',
                data: [
                    [0, 0, 12],
                    [1, 0, 18],
                    [2, 0, 25],
                    [3, 0, 38],
                    [4, 0, 65],
                    [5, 0, 85],
                    [6, 0, 92],
                    [7, 0, 88],
                    [8, 0, 75],
                    [9, 0, 60],
                    [10, 0, 42],
                    [11, 0, 20],
                    [0, 1, 15],
                    [1, 1, 22],
                    [2, 1, 30],
                    [3, 1, 45],
                    [4, 1, 72],
                    [5, 1, 95],
                    [6, 1, 98],
                    [7, 1, 91],
                    [8, 1, 80],
                    [9, 1, 68],
                    [10, 1, 49],
                    [11, 1, 26],
                    [0, 2, 8],
                    [1, 2, 14],
                    [2, 2, 19],
                    [3, 2, 32],
                    [4, 2, 58],
                    [5, 2, 78],
                    [6, 2, 82],
                    [7, 2, 79],
                    [8, 2, 65],
                    [9, 2, 52],
                    [10, 2, 35],
                    [11, 2, 16],
                    [0, 3, 10],
                    [1, 3, 16],
                    [2, 3, 24],
                    [3, 3, 40],
                    [4, 3, 68],
                    [5, 3, 89],
                    [6, 3, 94],
                    [7, 3, 86],
                    [8, 3, 72],
                    [9, 3, 58],
                    [10, 3, 39],
                    [11, 3, 19]
                ]
            }
        ]
    };
}
