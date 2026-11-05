import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'clickable-column-gradient-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Gradient columns with an inside axis label: clicking a column zooms into a window of six categories around it via a dispatched <i>dataZoom</i> action.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" (onChartClick)="onClick($event)" />
        </div>
        <app-code></app-code>
    `
})
export class ClickableColumnGradientDoc {
    // prettier-ignore
    dataAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
    // prettier-ignore
    data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
    yMax = 500;
    dataShadow: number[] = [];

    private chart: any;

    options: any;

    constructor() {
        for (let i = 0; i < this.data.length; i++) {
            this.dataShadow.push(this.yMax);
        }

        this.options = {
            title: {
                text: 'Gradient, Shadow, and Click Zoom',
                subtext: 'Click columns or slide to zoom'
            },
            xAxis: {
                data: this.dataAxis,
                axisLabel: {
                    inside: true,
                    color: '#fff'
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#999'
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [
                {
                    type: 'bar',
                    showBackground: true,
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: '#83bff6' },
                                { offset: 0.5, color: '#188df0' },
                                { offset: 1, color: '#188df0' }
                            ]
                        }
                    },
                    emphasis: {
                        itemStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: '#2378f7' },
                                    { offset: 0.7, color: '#2378f7' },
                                    { offset: 1, color: '#83bff6' }
                                ]
                            }
                        }
                    },
                    data: this.data
                }
            ]
        };
    }

    onInit(event: any): void {
        this.chart = event.chart;
    }

    // Enable data zoom when the user clicks a bar.
    zoomSize = 6;

    onClick(event: any): void {
        this.chart?.dispatchAction({
            type: 'dataZoom',
            startValue: this.dataAxis[Math.max(event.dataIndex - this.zoomSize / 2, 0)],
            endValue: this.dataAxis[Math.min(event.dataIndex + this.zoomSize / 2, this.data.length - 1)]
        });
    }
}
