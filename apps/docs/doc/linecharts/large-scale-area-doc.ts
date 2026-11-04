import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'large-scale-area-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Ten thousand points rendered fluently: <i>sampling</i> reduces the drawn vertices and <i>progressive</i> rendering streams the chart in chunks.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', boundaryGap: false, data: axisData }" [yAxis]="{ type: 'value', boundaryGap: [0, '100%'] }" [tooltip]="{ trigger: 'axis', axisPointer: { type: 'line' } }" />
        </div>
        <app-code></app-code>
    `
})
export class LargeScaleAreaDoc {
    count = 10000;

    axisData: string[] = [];

    data: number[] = [];

    series = [
        {
            type: 'line',
            showSymbol: false,
            data: this.data,
            sampling: 'lttb',
            areaStyle: {},
            progressive: 2000,
            progressiveThreshold: 5000
        }
    ];

    constructor() {
        let base = +new Date(2024, 9, 3);
        const oneDay = 24 * 3600 * 1000;
        for (let i = 0; i < this.count; i++) {
            const now = new Date((base += oneDay));
            this.axisData.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'));
            const noise = Math.random() * 60;
            this.data.push(Math.round((Math.sin(i / 60) + 1) * 120 + noise));
        }
    }
}
