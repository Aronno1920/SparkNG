import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'scatter-jittering-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>7000 sleeping-hour points jittered horizontally within each weekday band, colored per data item at 0.4 opacity.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterJitteringDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            const grid = {
                left: 80,
                right: 50
            };
            const width = this.chart.getWidth() - grid.left - grid.right;
            const data = [];
            for (let day = 0; day < 7; ++day) {
                for (let i = 0; i < 1000; ++i) {
                    const y = Math.tan(i) / 2 + 7;
                    data.push([day, y, Math.random()]);
                }
            }
            this.chart.setOption({
                title: {
                    text: 'Scatter with Jittering'
                },
                grid,
                xAxis: {
                    type: 'category',
                    jitter: (width / 7) * 0.8,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value',
                    max: 10,
                    min: 0
                },
                series: [
                    {
                        name: 'Sleeping Hours',
                        type: 'scatter',
                        data,
                        colorBy: 'data',
                        itemStyle: {
                            opacity: 0.4
                        }
                    }
                ]
            });
        }
    }
}
