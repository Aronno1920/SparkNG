import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';
import { format } from '@bdspark/sparkng-charts';

@Component({
    selector: 'large-scale-candlestick-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A candlestick chart with a volume bar panel rendering 200,000 programmatically generated OHLC records via a dataset.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LargeScaleCandlestickDoc {
    options: any;

    constructor() {
        const upColor = '#ec0000';
        const upBorderColor = '#8A0000';
        const downColor = '#00da3c';
        const downBorderColor = '#008F28';

        const dataCount = 2e5;
        const data = this.generateOHLC(dataCount);

        this.options = {
            dataset: {
                source: data
            },
            title: {
                text: 'Data Amount: ' + dataCount.toLocaleString('en-US')
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line'
                }
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: false
                    }
                }
            },
            grid: [
                {
                    left: '10%',
                    right: '10%',
                    bottom: 200
                },
                {
                    left: '10%',
                    right: '10%',
                    height: 80,
                    bottom: 80
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    // inverse: true,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    min: 'dataMin',
                    max: 'dataMax'
                },
                {
                    type: 'category',
                    gridIndex: 1,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false },
                    min: 'dataMin',
                    max: 'dataMax'
                }
            ],
            yAxis: [
                {
                    scale: true,
                    splitArea: {
                        show: true
                    }
                },
                {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    start: 10,
                    end: 100
                },
                {
                    show: true,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    bottom: 10,
                    start: 10,
                    end: 100
                }
            ],
            visualMap: {
                show: false,
                seriesIndex: 1,
                dimension: 6,
                pieces: [
                    {
                        value: 1,
                        color: upColor
                    },
                    {
                        value: -1,
                        color: downColor
                    }
                ]
            },
            series: [
                {
                    type: 'candlestick',
                    itemStyle: {
                        color: upColor,
                        color0: downColor,
                        borderColor: upBorderColor,
                        borderColor0: downBorderColor
                    },
                    encode: {
                        x: 0,
                        y: [1, 4, 3, 2]
                    }
                },
                {
                    name: 'Volumn',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    itemStyle: {
                        color: '#7fbe9e'
                    },
                    large: true,
                    encode: {
                        x: 0,
                        y: 5
                    }
                }
            ]
        };
    }

    private generateOHLC(count: number) {
        let data: [string, number, number, number, number, number, number][] = [];

        let xValue = +new Date(2011, 0, 1);
        let minute = 60 * 1000;
        let baseValue = Math.random() * 12000;
        let boxVals = new Array(4);
        let dayRange = 12;

        for (let i = 0; i < count; i++) {
            baseValue = baseValue + Math.random() * 20 - 10;

            for (let j = 0; j < 4; j++) {
                boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
            }
            boxVals.sort();

            let openIdx = Math.round(Math.random() * 3);
            let closeIdx = Math.round(Math.random() * 2);
            if (closeIdx === openIdx) {
                closeIdx++;
            }
            let volumn = boxVals[3] * (1000 + Math.random() * 500);

            // ['open', 'close', 'lowest', 'highest', 'volumn']
            // [1, 4, 3, 2]
            data[i] = [
                format.formatTime('yyyy-MM-dd\nhh:mm:ss', (xValue += minute)),
                +boxVals[openIdx].toFixed(2), // open
                +boxVals[3].toFixed(2), // highest
                +boxVals[0].toFixed(2), // lowest
                +boxVals[closeIdx].toFixed(2), // close
                +volumn.toFixed(0),
                this.getSign(data, i, +boxVals[openIdx], +boxVals[closeIdx], 4) // sign
            ];
        }

        return data;
    }

    private getSign(data: [string, number, number, number, number, number, number][], dataIndex: number, openVal: number, closeVal: number, closeDimIdx: number) {
        var sign;
        if (openVal > closeVal) {
            sign = -1;
        } else if (openVal < closeVal) {
            sign = 1;
        } else {
            sign =
                dataIndex > 0
                    ? // If close === open, compare with close of last record
                      Number(data[dataIndex - 1][closeDimIdx]) <= closeVal
                        ? 1
                        : -1
                    : // No record of previous, set to be positive
                      1;
        }

        return sign;
    }
}
