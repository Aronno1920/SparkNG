import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'large-scatter-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>One million points in two large-mode scatter series with inside and slider dataZoom and animation disabled.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LargeScatterDoc {
    genData(len: number, offset?: number) {
        const arr = new Float32Array(len * 2);
        let off = 0;

        for (let i = 0; i < len; i++) {
            const x = +Math.random() * 10;
            const y = +Math.sin(x) - x * (len % 2 ? 0.1 : -0.1) * Math.random() + (offset || 0) / 10;
            arr[off++] = x;
            arr[off++] = y;
        }
        return arr;
    }

    data1 = this.genData(5e5);

    data2 = this.genData(5e5, 10);

    options = {
        title: {
            text: (this.data1.length / 2 + this.data2.length / 2).toLocaleString('en-US') + ' Points'
        },
        tooltip: {},
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {}
            }
        },
        legend: {
            orient: 'vertical',
            right: 10
        },
        xAxis: [{}],
        yAxis: [{}],
        dataZoom: [
            {
                type: 'inside'
            },
            {
                type: 'slider'
            }
        ],
        animation: false,
        series: [
            {
                name: 'A',
                type: 'scatter',
                data: this.data1,
                dimensions: ['x', 'y'],
                symbolSize: 3,
                itemStyle: {
                    opacity: 0.4
                },
                large: true
            },
            {
                name: 'B',
                type: 'scatter',
                data: this.data2,
                dimensions: ['x', 'y'],
                symbolSize: 3,
                itemStyle: {
                    opacity: 0.4
                },
                large: true
            }
        ]
    };
}
