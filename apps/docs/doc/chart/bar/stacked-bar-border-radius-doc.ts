import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'stacked-bar-border-radius-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Only the last segment of each stack receives a <i>borderRadius</i>; the stack boundaries are computed first so rounded corners land on the correct bars.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class StackedBarBorderRadiusDoc {
    series: any[] = [
        { data: [120, 200, 150, 80, 70, 110, 130], type: 'bar', stack: 'a', name: 'a' },
        { data: [10, 46, 64, '-', 0, '-', 0], type: 'bar', stack: 'a', name: 'b' },
        { data: [30, '-', 0, 20, 10, '-', 0], type: 'bar', stack: 'a', name: 'c' },
        { data: [30, '-', 0, 20, 10, '-', 0], type: 'bar', stack: 'b', name: 'd' },
        { data: [10, 20, 150, 0, '-', 50, 10], type: 'bar', stack: 'b', name: 'e' }
    ];

    options: any;

    constructor() {
        const stackInfo: { [key: string]: { stackStart: number[]; stackEnd: number[] } } = {};
        for (let i = 0; i < this.series[0].data.length; ++i) {
            for (let j = 0; j < this.series.length; ++j) {
                const stackName = this.series[j].stack;
                if (!stackName) {
                    continue;
                }
                if (!stackInfo[stackName]) {
                    stackInfo[stackName] = {
                        stackStart: [],
                        stackEnd: []
                    };
                }
                const info = stackInfo[stackName];
                const data = this.series[j].data[i];
                if (data && data !== '-') {
                    if (info.stackStart[i] == null) {
                        info.stackStart[i] = j;
                    }
                    info.stackEnd[i] = j;
                }
            }
        }
        for (let i = 0; i < this.series.length; ++i) {
            const data = this.series[i].data;
            const info = stackInfo[this.series[i].stack];
            for (let j = 0; j < this.series[i].data.length; ++j) {
                const isEnd = info.stackEnd[j] === i;
                const topBorder = isEnd ? 20 : 0;
                const bottomBorder = 0;
                data[j] = {
                    value: data[j],
                    itemStyle: {
                        borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
                    }
                };
            }
        }

        this.options = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: this.series
        };
    }
}
