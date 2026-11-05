import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'dynamic-data-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A live price/order feed: every 2.1 seconds the oldest sample drops, a new one is appended and the dual axes, cross axisPointer and hidden dataZoom keep the window rolling.</p>
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

    private timer: any;

    count = 11;

    categories: string[] = [];

    categories2: number[] = [];

    data: number[] = [];

    data2: number[] = [];

    options: any;

    constructor() {
        let now = new Date();
        let len = 10;
        while (len--) {
            this.categories.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
            now = new Date(+now - 2000);
        }
        len = 10;
        while (len--) {
            this.categories2.push(10 - len - 1);
        }
        len = 10;
        while (len--) {
            this.data.push(Math.round(Math.random() * 1000));
        }
        len = 0;
        while (len < 10) {
            this.data2.push(+(Math.random() * 10 + 5).toFixed(1));
            len++;
        }

        this.options = {
            title: {
                text: 'Dynamic Data'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
            legend: {},
            toolbox: {
                show: true,
                feature: {
                    dataView: { readOnly: false },
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: {
                show: false,
                start: 0,
                end: 100
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: this.categories
                },
                {
                    type: 'category',
                    boundaryGap: true,
                    data: this.categories2
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    name: 'Price',
                    max: 30,
                    min: 0,
                    boundaryGap: [0.2, 0.2]
                },
                {
                    type: 'value',
                    scale: true,
                    name: 'Order',
                    max: 1200,
                    min: 0,
                    boundaryGap: [0.2, 0.2]
                }
            ],
            series: [
                {
                    name: 'Dynamic Bar',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    data: this.data
                },
                {
                    name: 'Dynamic Line',
                    type: 'line',
                    data: this.data2
                }
            ]
        };

        if (isPlatformBrowser(this.platformId)) {
            this.timer = setInterval(() => this.tick(), 2100);
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
        const axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');

        this.data.shift();
        this.data.push(Math.round(Math.random() * 1000));
        this.data2.shift();
        this.data2.push(+(Math.random() * 10 + 5).toFixed(1));

        this.categories.shift();
        this.categories.push(axisData);
        this.categories2.shift();
        this.categories2.push(this.count++);

        this.chart?.setOption({
            xAxis: [
                {
                    data: this.categories
                },
                {
                    data: this.categories2
                }
            ],
            series: [
                {
                    data: this.data
                },
                {
                    data: this.data2
                }
            ]
        });
    }
}
