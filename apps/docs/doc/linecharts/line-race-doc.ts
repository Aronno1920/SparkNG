import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ChartModule, UIChart } from '@bdspark/sparkng/chart';

@Component({
    selector: 'line-race-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A line race reveals each point as time passes: the series animates through its data using <i>animationDuration</i> and per-point delays.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LineRaceDoc {
    years: string[] = [];

    values: number[] = [];

    options: any;

    constructor() {
        for (let year = 1990; year <= 2024; year++) {
            this.years.push(String(year));
            const trend = (year - 1990) * 2.2 + Math.sin((year - 1990) / 3) * 30;
            this.values.push(Math.round(120 + trend + Math.random() * 20));
        }
        const total = this.years.length;
        this.options = {
            tooltip: { trigger: 'axis' },
            grid: { left: 56, right: 24 },
            xAxis: { type: 'category', data: this.years },
            yAxis: { type: 'value' },
            animationDuration: 6000,
            animationDurationUpdate: 800,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            series: [
                {
                    name: 'Revenue',
                    type: 'line',
                    data: this.values,
                    smooth: true,
                    lineStyle: { width: 3 },
                    areaStyle: { opacity: 0.2 },
                    animationDelay: (index: number) => (index / total) * 5000,
                    animationDelayUpdate: (index: number) => (index / total) * 800
                }
            ]
        };
    }
}
