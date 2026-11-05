import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';
import { graphic } from '@bdspark/sparkng-charts';

@Component({
    selector: 'bar-axis-breaks-brush-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Brush vertically on the chart to create a new axis break: the brushed range collapses into a zigzag gap and merges with intersecting breaks.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class BarAxisBreaksBrushDoc implements OnDestroy {
    GRID_TOP = 120;

    GRID_BOTTOM = 80;

    Y_DATA_ROUND_PRECISION = 0;

    currentAxisBreaks: any[] = [
        {
            start: 5000,
            end: 100000,
            gap: '2%'
        }
    ];

    options: any = {
        title: {
            text: 'Bar Chart with Axis Break (Brush-enabled)',
            subtext: 'Brush to create a new axis break.\nClick on the break area to reset.',
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
            top: this.GRID_TOP,
            bottom: this.GRID_BOTTOM
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
                    zigzagMaxSpan: 15,
                    zigzagAmplitude: 2,
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
                data: [106212, 102118, 102643, 104631, 106679, 100130, 107022],
                emphasis: {
                    focus: 'series'
                }
            }
        ]
    };

    private chart: any;

    private brushingEl: any = null;

    private onMouseUp = (params: any) => {
        if (!this.brushingEl) {
            return;
        }

        const initX = this.brushingEl.shape.x;
        const initY = this.brushingEl.shape.y;
        const currPoint = [params.offsetX, params.offsetY];
        const pixelSpan = Math.abs(currPoint[1] - initY);
        if (pixelSpan > 2) {
            this.updateAxisBreak(this.chart, [initX, initY], currPoint);
        }

        this.chart.getZr().remove(this.brushingEl);
        this.brushingEl = null;
    };

    onInit(event: any): void {
        this.chart = event.chart;
        const zr = this.chart.getZr();

        zr.on('mousedown', (params: any) => {
            this.brushingEl = new graphic.Rect({
                shape: { x: 0, y: params.offsetY },
                style: { stroke: 'none', fill: '#ccc' },
                ignore: true
            });
            zr.add(this.brushingEl);
        });

        zr.on('mousemove', (params: any) => {
            if (!this.brushingEl) {
                return;
            }

            const initY = this.brushingEl.shape.y;
            const currPoint = [params.offsetX, params.offsetY];
            this.brushingEl.setShape('width', this.chart.getWidth());
            this.brushingEl.setShape('height', currPoint[1] - initY);
            this.brushingEl.ignore = false;
        });

        document.addEventListener('mouseup', this.onMouseUp);

        this.chart.on('axisbreakchanged', (params: any) => {
            // Remove expanded axis breaks from currentAxisBreaks.
            const changedBreaks = params.breaks || [];
            for (let i = 0; i < changedBreaks.length; i++) {
                const changedBreakItem = changedBreaks[i];
                if (changedBreakItem.isExpanded) {
                    for (let j = this.currentAxisBreaks.length - 1; j >= 0; j--) {
                        if (this.currentAxisBreaks[j].start === changedBreakItem.start && this.currentAxisBreaks[j].end === changedBreakItem.end) {
                            this.currentAxisBreaks.splice(j, 1);
                        }
                    }
                }
            }
        });
    }

    ngOnDestroy(): void {
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    private updateAxisBreak(myChart: any, initXY: number[], currPoint: number[]): void {
        const dataXY0 = myChart.convertFromPixel({ gridIndex: 0 }, initXY);
        const dataXY1 = myChart.convertFromPixel({ gridIndex: 0 }, currPoint);
        const dataRange = [this.roundYValue(dataXY0[1]), this.roundYValue(dataXY1[1])];
        if (dataRange[0] > dataRange[1]) {
            dataRange.reverse();
        }

        const newBreak: any = {
            start: dataRange[0],
            end: dataRange[1]
        };

        this.insertAndMergeNewBreakWithExistingBreaks(newBreak);

        const gapPercentStr = (Math.abs(myChart.convertToPixel({ yAxisIndex: 0 }, newBreak.start) - myChart.convertToPixel({ yAxisIndex: 0 }, newBreak.end)) / this.getYAxisPixelSpan(myChart)) * 100 + '%';

        const makeOption = (gapPercentStr: string) => {
            newBreak.gap = gapPercentStr;
            return {
                yAxis: {
                    breaks: this.currentAxisBreaks
                }
            };
        };

        // This is to make a transition animation effect - firstly create axis break
        // on the brushed area, then collapse it to a small gap.
        myChart.setOption(makeOption(gapPercentStr));
        setTimeout(() => {
            myChart.setOption(makeOption('2%'));
        }, 0);
    }

    // Insert and merge new break with existing breaks if intersecting.
    private insertAndMergeNewBreakWithExistingBreaks(newBreak: any): void {
        for (let i = this.currentAxisBreaks.length - 1; i >= 0; i--) {
            const existingBreak = this.currentAxisBreaks[i];

            if (existingBreak.start <= newBreak.end && existingBreak.end >= newBreak.start) {
                newBreak.start = Math.min(existingBreak.start as number, newBreak.start as number);
                newBreak.end = Math.max(existingBreak.end as number, newBreak.end as number);
                this.currentAxisBreaks.splice(i, 1); // Remove the existing break.
            }
        }
        this.currentAxisBreaks.push(newBreak);
    }

    private getYAxisPixelSpan(myChart: any): number {
        return myChart.getHeight() - this.GRID_BOTTOM - this.GRID_TOP;
    }

    private roundYValue(val: number): number {
        return +(+val).toFixed(this.Y_DATA_ROUND_PRECISION);
    }
}
