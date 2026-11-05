import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

interface DataItem {
    l: number;
    u: number;
    date: string;
    value: number;
}

@Component({
    selector: 'confidence-band-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A shaded uncertainty band wrapping estimated values using stacked, transparent boundary line series.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class ConfidenceBandDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.chart.showLoading();
            fetch('demo/chart/data/confidence-band.json')
                .then((res) => res.json())
                .then((data: DataItem[]) => {
                    this.chart.hideLoading();
                    this.chart.setOption(this.buildOption(data));
                });
        }
    }

    private buildOption(data: DataItem[]): any {
        const base = -data.reduce(function (min, val) {
            return Math.floor(Math.min(min, val.l));
        }, Infinity);

        return {
            title: {
                text: 'Confidence Band',
                subtext: 'Example in MetricsGraphics.js',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#ccc',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        color: '#222'
                    }
                },
                formatter: function (params: any) {
                    return params[2].name + '<br />' + ((params[2].value - base) * 100).toFixed(1) + '%';
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: data.map(function (item) {
                    return item.date;
                }),
                axisLabel: {
                    formatter: function (value: string, idx: number) {
                        const date = new Date(value);
                        return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
                    }
                },
                boundaryGap: false
            },
            yAxis: {
                axisLabel: {
                    formatter: function (val: number) {
                        return (val - base) * 100 + '%';
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params: any) {
                            return ((params.value - base) * 100).toFixed(1) + '%';
                        }
                    }
                },
                splitNumber: 3
            },
            series: [
                {
                    name: 'L',
                    type: 'line',
                    data: data.map(function (item) {
                        return item.l + base;
                    }),
                    lineStyle: {
                        opacity: 0
                    },
                    stack: 'confidence-band',
                    symbol: 'none'
                },
                {
                    name: 'U',
                    type: 'line',
                    data: data.map(function (item) {
                        return item.u - item.l;
                    }),
                    lineStyle: {
                        opacity: 0
                    },
                    areaStyle: {
                        color: '#ccc'
                    },
                    stack: 'confidence-band',
                    symbol: 'none'
                },
                {
                    type: 'line',
                    data: data.map(function (item) {
                        return item.value + base;
                    }),
                    itemStyle: {
                        color: '#333'
                    },
                    showSymbol: false
                }
            ]
        };
    }
}
