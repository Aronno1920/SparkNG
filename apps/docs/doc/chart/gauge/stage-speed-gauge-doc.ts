import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'stage-speed-gauge-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A speed gauge with teal/blue/red axis bands, auto-colored pointer and ticks, refreshed with a random speed every 2 seconds.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class StageSpeedGaugeDoc implements OnDestroy {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    private timer: any;

    options = {
        series: [
            {
                type: 'gauge',
                axisLine: {
                    lineStyle: {
                        width: 30,
                        color: [
                            [0.3, '#67e0e3'],
                            [0.7, '#37a2da'],
                            [1, '#fd666d']
                        ]
                    }
                },
                pointer: {
                    itemStyle: {
                        color: 'auto'
                    }
                },
                axisTick: {
                    distance: -30,
                    length: 8,
                    lineStyle: {
                        color: '#fff',
                        width: 2
                    }
                },
                splitLine: {
                    distance: -30,
                    length: 30,
                    lineStyle: {
                        color: '#fff',
                        width: 4
                    }
                },
                axisLabel: {
                    color: 'inherit',
                    distance: 40,
                    fontSize: 20
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value} km/h',
                    color: 'inherit'
                },
                data: [
                    {
                        value: 70
                    }
                ]
            }
        ]
    };

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.timer = setInterval(() => this.tick(), 2000);
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

    private tick(): void {
        this.chart?.setOption({
            series: [
                {
                    data: [
                        {
                            value: +(Math.random() * 100).toFixed(2)
                        }
                    ]
                }
            ]
        });
    }
}
