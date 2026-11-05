import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'rainfall-vs-evaporation-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Dual aligned grid coordinates linking rainfall and evaporation trends through coordinated axis pointers and <i>dataZoom</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" height="32rem" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class RainfallVsEvaporationDoc {
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
                    const timeData = dataset.rawTimeData.map((str) => str.replace(/[0-9]{4}\//, ''));
                    this.chart.setOption(this.buildOption(timeData, dataset.evaporation, dataset.rainfall));
                });
        }
    }

    private buildOption(timeData: string[], evaporation: number[], rainfall: number[]): any {
        return {
            title: {
                text: 'Rainfall vs Evaporation',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['Evaporation', 'Rainfall'],
                left: 10
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
            axisPointer: {
                link: [
                    {
                        xAxisIndex: 'all'
                    }
                ]
            },
            dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 30,
                    end: 70,
                    xAxisIndex: [0, 1]
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 30,
                    end: 70,
                    xAxisIndex: [0, 1]
                }
            ],
            grid: [
                {
                    left: 60,
                    right: 50,
                    height: '35%'
                },
                {
                    left: 60,
                    right: 50,
                    top: '55%',
                    height: '35%'
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: { onZero: true },
                    data: timeData
                },
                {
                    gridIndex: 1,
                    type: 'category',
                    boundaryGap: false,
                    axisLine: { onZero: true },
                    data: timeData,
                    position: 'top'
                }
            ],
            yAxis: [
                {
                    name: 'Evaporation(m³/s)',
                    type: 'value',
                    max: 500
                },
                {
                    gridIndex: 1,
                    name: 'Rainfall(mm)',
                    type: 'value',
                    inverse: true
                }
            ],
            series: [
                {
                    name: 'Evaporation',
                    type: 'line',
                    symbolSize: 8,
                    data: evaporation
                },
                {
                    name: 'Rainfall',
                    type: 'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    symbolSize: 8,
                    data: rainfall
                }
            ]
        };
    }
}
