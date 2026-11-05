import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';
import type { CustomSeriesRenderItemAPI, CustomSeriesRenderItemParams, CustomSeriesRenderItemReturn } from '@bdspark/sparkng-charts';

@Component({
    selector: 'ohlc-chart-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>An OHLC chart drawn with a custom series where each record renders as a vertical high-low line with open and close ticks.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class OhlcChartDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            fetch('demo/chart/data/stock-DJI.json')
                .then((response) => response.json())
                .then((rawData) => {
                    var data = this.splitData(rawData);
                    this.chart.setOption(this.buildOption(data), true);
                });
        }
    }

    private buildOption(data: { categoryData: string[]; values: number[][] }): any {
        return {
            animation: false,
            legend: {
                bottom: 10,
                left: 'center',
                data: ['Dow-Jones index']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                position: function (pos, params, el, elRect, size) {
                    var obj: Record<string, number> = { top: 10 };
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                    return obj;
                }
            },
            axisPointer: {
                link: [{ xAxisIndex: 'all' }]
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: false
                    },
                    brush: {
                        type: ['lineX', 'clear']
                    }
                }
            },
            grid: [
                {
                    left: '10%',
                    right: '8%',
                    bottom: 150
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    data: data.categoryData,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    min: 'dataMin',
                    max: 'dataMax',
                    axisPointer: {
                        z: 100
                    }
                }
            ],
            yAxis: [
                {
                    scale: true,
                    splitArea: {
                        show: true
                    }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    start: 98,
                    end: 100,
                    minValueSpan: 10
                },
                {
                    show: true,
                    type: 'slider',
                    bottom: 60,
                    start: 98,
                    end: 100,
                    minValueSpan: 10
                }
            ],
            series: [
                {
                    name: 'Dow-Jones index',
                    type: 'custom',
                    renderItem: this.renderItem,
                    dimensions: ['-', 'open', 'close', 'lowest', 'highest'],
                    encode: {
                        x: 0,
                        y: [1, 2, 3, 4],
                        tooltip: [1, 2, 3, 4]
                    },
                    data: data.values
                }
            ]
        };
    }

    private splitData(rawData: number[][]) {
        const categoryData = [];
        const values = [];
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i][0]);
            rawData[i][0] = i;
            values.push(rawData[i]);
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }

    private renderItem(params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI): CustomSeriesRenderItemReturn {
        var xValue = api.value(0);
        var openPoint = api.coord([xValue, api.value(1)]);
        var closePoint = api.coord([xValue, api.value(2)]);
        var lowPoint = api.coord([xValue, api.value(3)]);
        var highPoint = api.coord([xValue, api.value(4)]);
        var halfWidth = (api.size!([1, 0]) as number[])[0] * 0.35;
        var style = api.style({
            stroke: api.visual('color')
        });

        return {
            type: 'group',
            children: [
                {
                    type: 'line',
                    shape: {
                        x1: lowPoint[0],
                        y1: lowPoint[1],
                        x2: highPoint[0],
                        y2: highPoint[1]
                    },
                    style: style
                },
                {
                    type: 'line',
                    shape: {
                        x1: openPoint[0],
                        y1: openPoint[1],
                        x2: openPoint[0] - halfWidth,
                        y2: openPoint[1]
                    },
                    style: style
                },
                {
                    type: 'line',
                    shape: {
                        x1: closePoint[0],
                        y1: closePoint[1],
                        x2: closePoint[0] + halfWidth,
                        y2: closePoint[1]
                    },
                    style: style
                }
            ]
        };
    }
}
