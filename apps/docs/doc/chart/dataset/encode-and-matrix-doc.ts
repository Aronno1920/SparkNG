import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'encode-and-matrix-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A 2x2 scatter matrix: Income, Life Expectancy, Population and Country from the life-expectancy table, each grid encoding a different pair via one shared dataset.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" height="40rem" />
        </div>
        <app-code></app-code>
    `
})
export class EncodeAndMatrixDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            fetch('demo/chart/data/life-expectancy-table.json')
                .then((response) => response.json())
                .then((data) => {
                    this.chart.setOption(this.getOption(data));
                });
        }
    }

    private getOption(data: any[]): any {
        var sizeValue = '57%';
        var symbolSize = 2.5;
        return {
            legend: {},
            tooltip: {},
            toolbox: {
                left: 'center',
                feature: {
                    dataZoom: {}
                }
            },
            grid: [
                { right: sizeValue, bottom: sizeValue },
                { left: sizeValue, bottom: sizeValue },
                { right: sizeValue, top: sizeValue },
                { left: sizeValue, top: sizeValue }
            ],
            xAxis: [
                {
                    type: 'value',
                    gridIndex: 0,
                    name: 'Income',
                    axisLabel: { rotate: 50, interval: 0 }
                },
                {
                    type: 'category',
                    gridIndex: 1,
                    name: 'Country',
                    boundaryGap: false,
                    axisLabel: { rotate: 50, interval: 0 }
                },
                {
                    type: 'value',
                    gridIndex: 2,
                    name: 'Income',
                    axisLabel: { rotate: 50, interval: 0 }
                },
                {
                    type: 'value',
                    gridIndex: 3,
                    name: 'Life Expectancy',
                    axisLabel: { rotate: 50, interval: 0 }
                }
            ],
            yAxis: [
                { type: 'value', gridIndex: 0, name: 'Life Expectancy' },
                { type: 'value', gridIndex: 1, name: 'Income' },
                { type: 'value', gridIndex: 2, name: 'Population' },
                { type: 'value', gridIndex: 3, name: 'Population' }
            ],
            dataset: {
                dimensions: ['Income', 'Life Expectancy', 'Population', 'Country', { name: 'Year', type: 'ordinal' }],
                source: data
            },
            series: [
                {
                    type: 'scatter',
                    symbolSize: symbolSize,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    encode: {
                        x: 'Income',
                        y: 'Life Expectancy',
                        tooltip: [0, 1, 2, 3, 4]
                    }
                },
                {
                    type: 'scatter',
                    symbolSize: symbolSize,
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    encode: {
                        x: 'Country',
                        y: 'Income',
                        tooltip: [0, 1, 2, 3, 4]
                    }
                },
                {
                    type: 'scatter',
                    symbolSize: symbolSize,
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    encode: {
                        x: 'Income',
                        y: 'Population',
                        tooltip: [0, 1, 2, 3, 4]
                    }
                },
                {
                    type: 'scatter',
                    symbolSize: symbolSize,
                    xAxisIndex: 3,
                    yAxisIndex: 3,
                    encode: {
                        x: 'Life Expectancy',
                        y: 'Population',
                        tooltip: [0, 1, 2, 3, 4]
                    }
                }
            ]
        };
    }
}
