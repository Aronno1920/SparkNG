import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ChartModule, UIChart } from '@bdspark/sparkng/chart';

@Component({
    selector: 'dynamic-data-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Live data on a time axis: a timer appends points and shifts the window; the chart instance is updated through the component API.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart #chart [options]="initialOptions" />
        </div>
        <app-code></app-code>
    `
})
export class DynamicDataDoc implements OnDestroy {
    @ViewChild('chart') chartComponent!: UIChart;

    data: [number, number][] = [];

    private timer: ReturnType<typeof setInterval> | null = null;

    private readonly oneSecond = 1000;

    constructor() {
        const now = Date.now();
        let value = 100;
        for (let i = -60; i <= 0; i++) {
            value += Math.random() * 8 - 4;
            this.data.push([now + i * this.oneSecond, Math.round(value)]);
        }
    }

    ngAfterViewInit(): void {
        this.timer = setInterval(() => {
            const last = this.data[this.data.length - 1];
            const nextValue = Math.round(last[1] + Math.random() * 8 - 4);
            this.data.push([Date.now(), nextValue]);
            this.data.shift();
            this.chartComponent.setOption({
                series: [{ data: this.data }]
            });
        }, 1000);
    }

    ngOnDestroy(): void {
        if (this.timer) clearInterval(this.timer);
    }

    get initialOptions() {
        return {
            tooltip: { trigger: 'axis' },
            grid: { left: 48, right: 24 },
            xAxis: { type: 'time', splitLine: { show: false } },
            yAxis: { type: 'value', boundaryGap: [0, '100%'] },
            series: [{ type: 'line', showSymbol: false, data: this.data }]
        };
    }
}
