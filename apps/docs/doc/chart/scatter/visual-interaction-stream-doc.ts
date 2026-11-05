import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'visual-interaction-stream-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Dispersion of house price based on area, streamed from JSON and colored by a calculable visualMap gradient from yellow to blue.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class VisualInteractionStreamDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            fetch('demo/chart/data/house-price-area2.json')
                .then((response) => response.json())
                .then((data) => {
                    this.chart.setOption({
                        title: {
                            text: 'Dispersion of house price based on the area',
                            left: 'center',
                            top: 0
                        },
                        visualMap: {
                            min: 15202,
                            max: 159980,
                            dimension: 1,
                            orient: 'vertical',
                            right: 10,
                            top: 'center',
                            text: ['HIGH', 'LOW'],
                            calculable: true,
                            inRange: {
                                color: ['#f2c31a', '#24b7f2']
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            axisPointer: {
                                type: 'cross'
                            }
                        },
                        xAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: 'price-area',
                                type: 'scatter',
                                symbolSize: 5,
                                data: data
                            }
                        ]
                    });
                });
        }
    }
}
