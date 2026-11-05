import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'stacked-bar-normalization-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Each stack is normalized to 100%: raw counts are divided by their column total and the labels display the resulting percentages.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class StackedBarNormalizationDoc {
    rawData = [
        [100, 302, 301, 334, 390, 330, 320],
        [320, 132, 101, 134, 90, 230, 210],
        [220, 182, 191, 234, 290, 330, 310],
        [150, 212, 201, 154, 190, 330, 410],
        [820, 832, 901, 934, 1290, 1330, 1320]
    ];

    totalData: number[] = [];

    options: any;

    constructor() {
        for (let i = 0; i < this.rawData[0].length; ++i) {
            let sum = 0;
            for (let j = 0; j < this.rawData.length; ++j) {
                sum += this.rawData[j][i];
            }
            this.totalData.push(sum);
        }

        const series = ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'].map((name, sid) => {
            return {
                name,
                type: 'bar',
                stack: 'total',
                barWidth: '60%',
                label: {
                    show: true,
                    formatter: (params: any) => Math.round(params.value * 1000) / 10 + '%'
                },
                data: this.rawData[sid].map((d: number, did: number) => (this.totalData[did] <= 0 ? 0 : d / this.totalData[did]))
            };
        });

        this.options = {
            legend: {
                selectedMode: false
            },
            yAxis: {
                type: 'value'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            series
        };
    }
}
