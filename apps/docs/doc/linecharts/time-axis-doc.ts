import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'time-axis-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Time axis area chart plotting 20,000 temporal data points with timestamp values and interactive <i>dataZoom</i> sliders.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class TimeAxisDoc {
    options: any;

    constructor() {
        let base = +new Date(1988, 9, 3);
        const oneDay = 24 * 3600 * 1000;
        const data: [number, number][] = [[base, Math.random() * 300]];

        for (let i = 1; i < 20000; i++) {
            const now = new Date((base += oneDay));
            data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
        }

        this.options = {
            tooltip: {
                trigger: 'axis',
                position: function (pt: any) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: 'Area Chart with Time Axis'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'time',
                boundaryGap: false
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%']
            },
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 20
                },
                {
                    start: 0,
                    end: 20
                }
            ],
            series: [
                {
                    name: 'Fake Data',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {},
                    data: data
                }
            ]
        };
    }
}
