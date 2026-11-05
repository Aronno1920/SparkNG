import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'brush-select-column-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Drag a rectangle, polygon or line brush across the columns to select data indices; the toolbox toggles stacking and a data view.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class BrushSelectColumnDoc {
    xAxisData: string[] = [];
    data1: number[] = [];
    data2: number[] = [];
    data3: number[] = [];
    data4: number[] = [];

    private chart: any;

    options: any;

    constructor() {
        for (let i = 0; i < 10; i++) {
            this.xAxisData.push('Class' + i);
            this.data1.push(+(Math.random() * 2).toFixed(2));
            this.data2.push(+(Math.random() * 5).toFixed(2));
            this.data3.push(+(Math.random() + 0.3).toFixed(2));
            this.data4.push(+Math.random().toFixed(2));
        }

        const emphasisStyle = {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0,0,0,0.3)'
            }
        };

        this.options = {
            legend: {
                data: ['bar', 'bar2', 'bar3', 'bar4'],
                left: '10%'
            },
            brush: {
                toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
                xAxisIndex: 0
            },
            toolbox: {
                feature: {
                    magicType: {
                        type: ['stack']
                    },
                    dataView: {}
                }
            },
            tooltip: {},
            xAxis: {
                data: this.xAxisData,
                name: 'X Axis',
                axisLine: { onZero: true },
                splitLine: { show: false },
                splitArea: { show: false }
            },
            yAxis: {},
            grid: {
                bottom: 100
            },
            series: [
                {
                    name: 'bar',
                    type: 'bar',
                    stack: 'one',
                    emphasis: emphasisStyle,
                    data: this.data1
                },
                {
                    name: 'bar2',
                    type: 'bar',
                    stack: 'one',
                    emphasis: emphasisStyle,
                    data: this.data2
                },
                {
                    name: 'bar3',
                    type: 'bar',
                    stack: 'two',
                    emphasis: emphasisStyle,
                    data: this.data3
                },
                {
                    name: 'bar4',
                    type: 'bar',
                    stack: 'two',
                    emphasis: emphasisStyle,
                    data: this.data4
                }
            ]
        };
    }

    onInit(event: any): void {
        this.chart = event.chart;

        this.chart.on('brushSelected', (params: any) => {
            const brushed: string[] = [];
            const brushComponent = params.batch[0];

            for (let sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
                const rawIndices = brushComponent.selected[sIdx].dataIndex;
                brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '));
            }

            this.chart.setOption({
                title: {
                    backgroundColor: '#333',
                    text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
                    bottom: 0,
                    right: '10%',
                    width: 100,
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    }
                }
            });
        });
    }
}
