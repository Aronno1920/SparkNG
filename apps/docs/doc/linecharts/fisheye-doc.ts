import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ChartModule, LineChart } from '@bdspark/sparkng/chart';

@Component({
    selector: 'fisheye-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A fisheye lens magnifies the region around the pointer: the demo recomputes the visible x range with a radial distortion on every pointer move using the chart events and instance API.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart #chart [options]="options" (onChartMouseOver)="onPointer($event)" (onChartMouseOut)="onLeave()" />
        </div>
        <app-code></app-code>
    `
})
export class FisheyeDoc implements OnDestroy {
    @ViewChild('chart') chartComponent!: any;

    xs: string[] = [];

    raw: number[] = [];

    private distorting = false;

    options: any;

    constructor() {
        for (let i = 0; i < 120; i++) {
            this.xs.push(String(i));
            this.raw.push(Math.round((Math.sin(i / 9) + 1) * 140 + Math.random() * 30));
        }
        this.options = {
            tooltip: { trigger: 'none' },
            grid: { left: 48, right: 24 },
            xAxis: { type: 'category', data: this.xs },
            yAxis: { type: 'value' },
            animation: false,
            series: [
                {
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    data: [...this.raw]
                }
            ]
        };
    }

    onPointer(event: any): void {
        const index = event?.dataIndex;
        if (index === undefined || index === null || !this.chartComponent?.chart) return;
        this.distorting = true;
        const distorted = this.raw.map((value, i) => {
            const distance = Math.abs(i - index);
            const factor = Math.max(0, 1 - distance / 18);
            const bulge = factor * factor * 90;
            return Math.round(value + bulge);
        });
        this.chartComponent.setOption({ series: [{ data: distorted }] });
    }

    onLeave(): void {
        if (!this.distorting || !this.chartComponent?.chart) return;
        this.distorting = false;
        this.chartComponent.setOption({ series: [{ data: [...this.raw] }] });
    }

    ngOnDestroy(): void {
        this.distorting = false;
    }
}
