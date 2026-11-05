import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-race-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A realtime-sorted bar race: values grow every three seconds and the bars re-rank with a 3-second linear <i>animationDurationUpdate</i>, keeping only the largest three categories.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class BarRaceDoc implements OnDestroy {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    private timer: any;

    data: number[] = [];

    options: any;

    constructor() {
        for (let i = 0; i < 5; ++i) {
            this.data.push(Math.round(Math.random() * 200));
        }

        this.options = {
            xAxis: {
                max: 'dataMax'
            },
            yAxis: {
                type: 'category',
                data: ['A', 'B', 'C', 'D', 'E'],
                inverse: true,
                animationDuration: 300,
                animationDurationUpdate: 300,
                max: 2 // only the largest 3 bars will be displayed
            },
            series: [
                {
                    realtimeSort: true,
                    name: 'X',
                    type: 'bar',
                    data: this.data,
                    label: {
                        show: true,
                        position: 'right',
                        valueAnimation: true
                    }
                }
            ],
            legend: {
                show: true
            },
            animationDuration: 0,
            animationDurationUpdate: 3000,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear'
        };

        if (isPlatformBrowser(this.platformId)) {
            this.run();
            this.timer = setInterval(() => this.run(), 3000);
        }
    }

    ngOnDestroy(): void {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    onInit(event: any): void {
        this.chart = event.chart;
    }

    private run(): void {
        for (let i = 0; i < this.data.length; ++i) {
            if (Math.random() > 0.9) {
                this.data[i] += Math.round(Math.random() * 2000);
            } else {
                this.data[i] += Math.round(Math.random() * 200);
            }
        }
        this.chart?.setOption({
            series: [
                {
                    type: 'bar',
                    data: this.data
                }
            ]
        });
    }
}
