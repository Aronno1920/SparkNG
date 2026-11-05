import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'draggable-points-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Interactive draggable control points overlaying the series with transparent zrender graphics, real-time dragging, and tooltip dispatch.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class DraggablePointsDoc implements OnDestroy {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    private symbolSize = 20;

    private resizeListener?: () => void;

    data: [number, number][] = [
        [40, -10],
        [-30, -5],
        [-76.5, 20],
        [-63.5, 40],
        [-22.1, 50]
    ];

    options = {
        title: {
            text: 'Try Dragging these Points',
            left: 'center'
        },
        tooltip: {
            triggerOn: 'none',
            formatter: function (params: any) {
                return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
            }
        },
        grid: {
            top: '8%',
            bottom: '12%'
        },
        xAxis: {
            min: -100,
            max: 70,
            type: 'value',
            axisLine: { onZero: false }
        },
        yAxis: {
            min: -30,
            max: 60,
            type: 'value',
            axisLine: { onZero: false }
        },
        dataZoom: [
            {
                type: 'slider',
                xAxisIndex: 0,
                filterMode: 'none'
            },
            {
                type: 'slider',
                yAxisIndex: 0,
                filterMode: 'none'
            },
            {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'none'
            },
            {
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'none'
            }
        ],
        series: [
            {
                id: 'a',
                type: 'line',
                smooth: true,
                symbolSize: this.symbolSize,
                data: this.data
            }
        ]
    };

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                this.chart.setOption({
                    graphic: this.data.map((item, dataIndex) => ({
                        type: 'circle',
                        position: this.chart.convertToPixel('grid', item),
                        shape: {
                            cx: 0,
                            cy: 0,
                            r: this.symbolSize / 2
                        },
                        invisible: true,
                        draggable: true,
                        ondrag: (e: any) => {
                            this.onPointDragging(dataIndex, [e.target.x, e.target.y]);
                        },
                        ondragend: () => {
                            this.updatePosition();
                        },
                        onmousemove: () => {
                            this.showTooltip(dataIndex);
                        },
                        onmouseout: () => {
                            this.hideTooltip();
                        },
                        z: 100
                    }))
                });
            }, 0);

            this.resizeListener = () => this.updatePosition();
            window.addEventListener('resize', this.resizeListener);
            this.chart.on('dataZoom', this.resizeListener);
        }
    }

    private updatePosition(): void {
        if (!this.chart) return;
        this.chart.setOption({
            graphic: this.data.map((item) => ({
                position: this.chart.convertToPixel('grid', item)
            }))
        });
    }

    private showTooltip(dataIndex: number): void {
        this.chart?.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: dataIndex
        });
    }

    private hideTooltip(): void {
        this.chart?.dispatchAction({
            type: 'hideTip'
        });
    }

    private onPointDragging(dataIndex: number, pos: number[]): void {
        if (!this.chart) return;
        this.data[dataIndex] = this.chart.convertFromPixel('grid', pos);
        this.chart.setOption({
            series: [
                {
                    id: 'a',
                    data: this.data
                }
            ]
        });
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformId)) {
            if (this.resizeListener) {
                window.removeEventListener('resize', this.resizeListener);
                this.chart?.off('dataZoom', this.resizeListener);
            }
        }
    }
}
