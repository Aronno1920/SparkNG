import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-heatmap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Basic Cartesian Heatmap represents hourly activity by day with color intensity.</p>
        </app-docsectiontext>
        <div class="card">
            <p-heatmapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BasicHeatmapDoc {
    options = {
        tooltip: { position: 'top' },
        grid: { height: '50%', top: '10%' },
        xAxis: {
            type: 'category',
            data: ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p'],
            splitArea: { show: true }
        },
        yAxis: {
            type: 'category',
            data: ['Saturday', 'Friday', 'Thursday', 'Wednesday', 'Tuesday', 'Monday', 'Sunday'],
            splitArea: { show: true }
        },
        visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
        },
        series: [
            {
                name: 'Punch Card',
                type: 'heatmap',
                data: [
                    [0, 0, 5],
                    [0, 1, 1],
                    [0, 2, 0],
                    [0, 3, 0],
                    [0, 4, 0],
                    [0, 5, 0],
                    [0, 6, 0],
                    [1, 0, 7],
                    [1, 1, 0],
                    [1, 2, 0],
                    [1, 3, 0],
                    [1, 4, 0],
                    [1, 5, 0],
                    [1, 6, 0],
                    [2, 0, 1],
                    [2, 1, 1],
                    [2, 2, 0],
                    [2, 3, 0],
                    [2, 4, 0],
                    [2, 5, 0],
                    [2, 6, 0],
                    [3, 0, 7],
                    [3, 1, 3],
                    [3, 2, 0],
                    [3, 3, 0],
                    [3, 4, 0],
                    [3, 5, 0],
                    [3, 6, 0],
                    [4, 0, 3],
                    [4, 1, 2],
                    [4, 2, 1],
                    [4, 3, 9],
                    [4, 4, 8],
                    [4, 5, 10],
                    [4, 6, 6],
                    [5, 0, 6],
                    [5, 1, 7],
                    [5, 2, 8],
                    [5, 3, 4],
                    [5, 4, 3],
                    [5, 5, 2],
                    [5, 6, 1],
                    [6, 0, 8],
                    [6, 1, 9],
                    [6, 2, 10],
                    [6, 3, 7],
                    [6, 4, 5],
                    [6, 5, 4],
                    [6, 6, 2],
                    [7, 0, 9],
                    [7, 1, 8],
                    [7, 2, 7],
                    [7, 3, 6],
                    [7, 4, 4],
                    [7, 5, 3],
                    [7, 6, 1],
                    [8, 0, 5],
                    [8, 1, 4],
                    [8, 2, 6],
                    [8, 3, 7],
                    [8, 4, 8],
                    [8, 5, 9],
                    [8, 6, 5],
                    [9, 0, 3],
                    [9, 1, 2],
                    [9, 2, 1],
                    [9, 3, 5],
                    [9, 4, 7],
                    [9, 5, 8],
                    [9, 6, 4],
                    [10, 0, 1],
                    [10, 1, 0],
                    [10, 2, 2],
                    [10, 3, 4],
                    [10, 4, 6],
                    [10, 5, 7],
                    [10, 6, 3],
                    [11, 0, 0],
                    [11, 1, 0],
                    [11, 2, 1],
                    [11, 3, 2],
                    [11, 4, 3],
                    [11, 5, 5],
                    [11, 6, 2]
                ],
                label: { show: true },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
}
