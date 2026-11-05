import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'rainfall-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Detailed rainfall and river flow relationship plotted across two area series with synchronized <i>dataZoom</i> and shaded mark areas.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" height="32rem" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class RainfallDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.chart.showLoading();
            fetch('demo/chart/data/rainfall-flow.json')
                .then((res) => res.json())
                .then((dataset: { rawTimeData: string[]; evaporation: number[]; rainfall: number[] }) => {
                    this.chart.hideLoading();
                    this.chart.setOption(this.buildOption(dataset.rawTimeData, dataset.evaporation, dataset.rainfall));
                });
        }
    }

    private buildOption(timeData: string[], flow: number[], rainfall: number[]): any {
        return {
            title: {
                text: 'Rainfall and Flow Relationship',
                left: 'center'
            },
            grid: {
                bottom: 80
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#505765'
                    }
                }
            },
            legend: {
                data: ['Flow', 'Rainfall'],
                left: 10
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 65,
                    end: 85
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 65,
                    end: 85
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    data: timeData
                }
            ],
            yAxis: [
                {
                    name: 'Flow(m³/s)',
                    max: 500,
                    type: 'value'
                },
                {
                    name: 'Rainfall(mm)',
                    nameLocation: 'start',
                    alignTicks: true,
                    type: 'value',
                    inverse: true
                }
            ],
            series: [
                {
                    name: 'Flow',
                    type: 'line',
                    areaStyle: {},
                    lineStyle: {
                        width: 1
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    markArea: {
                        silent: true,
                        itemStyle: {
                            opacity: 0.3
                        },
                        data: [
                            [
                                {
                                    xAxis: '2009/9/12\n7:00'
                                },
                                {
                                    xAxis: '2009/9/22\n7:00'
                                }
                            ]
                        ]
                    },
                    data: flow
                },
                {
                    name: 'Rainfall',
                    type: 'line',
                    yAxisIndex: 1,
                    areaStyle: {},
                    lineStyle: {
                        width: 1
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    markArea: {
                        silent: true,
                        itemStyle: {
                            opacity: 0.3
                        },
                        data: [
                            [
                                {
                                    xAxis: '2009/9/10\n7:00'
                                },
                                {
                                    xAxis: '2009/9/20\n7:00'
                                }
                            ]
                        ]
                    },
                    data: rainfall
                }
            ]
        };
    }
}
