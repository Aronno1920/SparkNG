import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'scatter-nebula-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A fake nebula of one million float32 points loaded from a binary asset, drawn in large mode with four-way dataZoom.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterNebulaDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.chart.showLoading();

            fetch('demo/chart/data/fake-nebula.bin')
                .then((response) => response.arrayBuffer())
                .then((buffer) => {
                    this.chart.hideLoading();
                    const rawData = new Float32Array(buffer);

                    this.chart.setOption({
                        title: {
                            left: 'center',
                            text: Math.round(rawData.length / 2).toLocaleString('en-US') + ' Points',
                            subtext: 'Fake data'
                        },
                        tooltip: {},
                        toolbox: {
                            right: 20,
                            feature: {
                                dataZoom: {}
                            }
                        },
                        grid: {
                            right: 70,
                            bottom: 70
                        },
                        xAxis: [{}],
                        yAxis: [{}],
                        dataZoom: [
                            {
                                type: 'inside'
                            },
                            {
                                type: 'slider',
                                showDataShadow: false,
                                handleIcon: 'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                                handleSize: '80%'
                            },
                            {
                                type: 'inside',
                                orient: 'vertical'
                            },
                            {
                                type: 'slider',
                                orient: 'vertical',
                                showDataShadow: false,
                                handleIcon: 'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                                handleSize: '80%'
                            }
                        ],
                        animation: false,
                        series: [
                            {
                                type: 'scatter',
                                data: rawData,
                                dimensions: ['x', 'y'],
                                symbolSize: 3,
                                itemStyle: {
                                    opacity: 0.4
                                },
                                blendMode: 'source-over',
                                large: true,
                                largeThreshold: 500
                            }
                        ]
                    });
                });
        }
    }
}
