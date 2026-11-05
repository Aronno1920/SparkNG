import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'click-to-add-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Interactive canvas allowing users to click anywhere within the grid coordinate space to append line vertices.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class ClickToAddDoc implements OnDestroy {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    private symbolSize = 20;

    data: [number, number][] = [
        [15, 0],
        [-50, 10],
        [-56.5, 20],
        [-46.5, 30],
        [-22.1, 40]
    ];

    options = {
        title: {
            text: 'Click to Add Points'
        },
        tooltip: {
            formatter: function (params: any) {
                const data = params.data || [0, 0];
                return data[0].toFixed(2) + ', ' + data[1].toFixed(2);
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            min: -60,
            max: 20,
            type: 'value',
            axisLine: { onZero: false }
        },
        yAxis: {
            min: 0,
            max: 40,
            type: 'value',
            axisLine: { onZero: false }
        },
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

    private clickHandler?: (params: any) => void;

    private mousemoveHandler?: (params: any) => void;

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            const zr = this.chart.getZr();

            this.clickHandler = (params: any) => {
                const pointInPixel = [params.offsetX, params.offsetY];
                const pointInGrid = this.chart.convertFromPixel('grid', pointInPixel);

                if (this.chart.containPixel('grid', pointInPixel)) {
                    this.data.push(pointInGrid);
                    this.chart.setOption({
                        series: [
                            {
                                id: 'a',
                                data: this.data
                            }
                        ]
                    });
                }
            };

            this.mousemoveHandler = (params: any) => {
                const pointInPixel = [params.offsetX, params.offsetY];
                zr.setCursorStyle(this.chart.containPixel('grid', pointInPixel) ? 'copy' : 'default');
            };

            zr.on('click', this.clickHandler);
            zr.on('mousemove', this.mousemoveHandler);
        }
    }

    ngOnDestroy(): void {
        if (this.chart && isPlatformBrowser(this.platformId)) {
            const zr = this.chart.getZr();
            if (this.clickHandler) zr.off('click', this.clickHandler);
            if (this.mousemoveHandler) zr.off('mousemove', this.mousemoveHandler);
        }
    }
}
