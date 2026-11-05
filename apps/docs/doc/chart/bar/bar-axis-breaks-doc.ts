import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-axis-breaks-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>The value axis collapses two huge value ranges into small zigzag gaps with <i>breaks</i>; click a break area to expand it and the collapse button to restore.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class BarAxisBreaksDoc {
    currentAxisBreaks: any[] = [
        {
            start: 5000,
            end: 100000,
            gap: '1.5%'
        },
        {
            // `start` and `end` are also used as the identifier for a certain axis break.
            start: 105000,
            end: 3100000,
            gap: '1.5%'
        }
    ];

    options: any = {
        title: {
            text: 'Bar Chart with Axis Breaks',
            subtext: 'Click the break area to expand it',
            left: 'center',
            textStyle: {
                fontSize: 20
            },
            subtextStyle: {
                color: '#175ce5',
                fontSize: 15,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            top: 120
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value',
                breaks: this.currentAxisBreaks,
                breakArea: {
                    itemStyle: {
                        opacity: 1
                    },
                    zigzagZ: 200
                }
            }
        ],
        series: [
            {
                name: 'Data A',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: [1500, 2032, 2001, 3154, 2190, 4330, 2410]
            },
            {
                name: 'Data B',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: [1200, 1320, 1010, 1340, 900, 2300, 2100]
            },
            {
                name: 'Data C',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: [103200, 100320, 103010, 102340, 103900, 103300, 103200]
            },
            {
                name: 'Data D',
                type: 'bar',
                data: [3106212, 3102118, 3102643, 3104631, 3106679, 3100130, 3107022],
                emphasis: {
                    focus: 'series'
                }
            }
        ]
    };

    onInit(event: any): void {
        const myChart = event.chart;

        // Interaction with the axis break: click the break area to expand it,
        // click the "Collapse Axis Breaks" button to restore all breaks.
        myChart.on('axisbreakchanged', (params: any) => {
            // If there is any axis break expanded, show the collapse button.
            let needReset = false;
            for (let i = 0; i < params.breaks.length; i++) {
                const changedBreakItem = params.breaks[i];
                if (changedBreakItem.isExpanded) {
                    needReset = true;
                    break;
                }
            }
            myChart.setOption({
                graphic: [
                    {
                        elements: [
                            {
                                type: 'rect',
                                ignore: !needReset,
                                name: 'collapseAxisBreakBtn',
                                top: 5,
                                left: 5,
                                shape: { r: 3, width: 140, height: 24 },
                                style: { fill: '#eee', stroke: '#999', lineWidth: 1 },
                                textContent: {
                                    type: 'text',
                                    style: {
                                        text: 'Collapse Axis Breaks',
                                        fontSize: 13,
                                        fontWeight: 'bold'
                                    }
                                },
                                textConfig: { position: 'inside' }
                            }
                        ]
                    }
                ]
            });
        });

        myChart.on('click', (params: any) => {
            if (params.name === 'collapseAxisBreakBtn') {
                myChart.dispatchAction({
                    type: 'collapseAxisBreak',
                    yAxisIndex: 0,
                    breaks: this.currentAxisBreaks
                });
            }
        });
    }
}
