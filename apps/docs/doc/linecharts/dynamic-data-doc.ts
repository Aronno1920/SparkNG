import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

interface DataItem {
    name: string;
    value: [string, number];
}

@Component({
    selector: 'dynamic-data-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Real-time streaming time series with live rolling data updates on an interval.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class DynamicDataDoc implements OnDestroy {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    private timer: ReturnType<typeof setInterval> | null = null;

    private now = new Date(1997, 9, 3);

    private readonly oneDay = 24 * 3600 * 1000;

    private value = Math.random() * 1000;

    data: DataItem[] = [];

    options: any;

    constructor() {
        for (let i = 0; i < 1000; i++) {
            this.data.push(this.randomData());
        }

        this.options = {
            title: {
                text: 'Dynamic Data & Time Axis'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params: any) {
                    const item = params[0];
                    const date = new Date(item.name);
                    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + item.value[1];
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    name: 'Fake Data',
                    type: 'line',
                    showSymbol: false,
                    data: this.data
                }
            ]
        };
    }

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.timer = setInterval(() => {
                for (let i = 0; i < 5; i++) {
                    this.data.shift();
                    this.data.push(this.randomData());
                }
                this.chart.setOption({
                    series: [
                        {
                            data: this.data
                        }
                    ]
                });
            }, 1000);
        }
    }

    ngOnDestroy(): void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    private randomData(): DataItem {
        this.now = new Date(+this.now + this.oneDay);
        this.value = this.value + Math.random() * 21 - 10;
        return {
            name: this.now.toString(),
            value: [[this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'), Math.round(this.value)]
        };
    }
}
