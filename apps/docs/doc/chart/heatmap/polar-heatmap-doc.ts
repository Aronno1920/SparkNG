import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'polar-heatmap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Polar Heatmap maps values onto radial angle and radius sectors.</p>
        </app-docsectiontext>
        <div class="card">
            <p-heatmapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PolarHeatmapDoc {
    options = {
        polar: {},
        tooltip: {},
        visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: 20
        },
        angleAxis: {
            type: 'category',
            data: ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p'],
            boundaryGap: false,
            splitLine: { show: true, lineStyle: { color: '#ddd', type: 'dashed' } }
        },
        radiusAxis: {
            type: 'category',
            data: ['Zone A', 'Zone B', 'Zone C', 'Zone D'],
            z: 100
        },
        series: [
            {
                name: 'Polar Intensity',
                type: 'heatmap',
                coordinateSystem: 'polar',
                data: [
                    [0, 0, 2],
                    [0, 1, 4],
                    [0, 2, 7],
                    [0, 3, 9],
                    [1, 0, 3],
                    [1, 1, 5],
                    [1, 2, 8],
                    [1, 3, 6],
                    [2, 0, 1],
                    [2, 1, 2],
                    [2, 2, 4],
                    [2, 3, 3],
                    [3, 0, 5],
                    [3, 1, 7],
                    [3, 2, 9],
                    [3, 3, 8],
                    [4, 0, 6],
                    [4, 1, 8],
                    [4, 2, 10],
                    [4, 3, 9],
                    [5, 0, 4],
                    [5, 1, 6],
                    [5, 2, 7],
                    [5, 3, 5],
                    [6, 0, 3],
                    [6, 1, 4],
                    [6, 2, 5],
                    [6, 3, 4],
                    [7, 0, 2],
                    [7, 1, 3],
                    [7, 2, 6],
                    [7, 3, 7]
                ]
            }
        ]
    };
}
