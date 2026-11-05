import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'master-painter-choices-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Master painters' hue choices through history, loaded from JSON, with per-point sizes from plot.ly marker data and per-point colors.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class MasterPainterChoicesDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.chart.showLoading();

            fetch('demo/chart/data/masterPainterColorChoice.json')
                .then((response) => response.json())
                .then((json: any) => {
                    this.chart.hideLoading();

                    const data = json[0].x.map(function (x: number, idx: number) {
                        return [+x, +json[0].y[idx]];
                    });

                    this.chart.setOption({
                        title: {
                            text: 'Master Painter Color Choices Throughout History',
                            subtext: 'Data From Plot.ly',
                            left: 'right'
                        },
                        xAxis: {
                            type: 'value',
                            splitLine: {
                                show: false
                            },
                            scale: true,
                            splitNumber: 5,
                            max: 'dataMax',
                            axisLabel: {
                                formatter: function (val: number) {
                                    return val + 's';
                                }
                            }
                        },
                        yAxis: {
                            type: 'value',
                            min: 0,
                            max: 360,
                            interval: 60,
                            name: 'Hue',
                            splitLine: {
                                show: false
                            }
                        },
                        series: [
                            {
                                name: 'scatter',
                                type: 'scatter',
                                symbolSize: function (val: number[], param: any) {
                                    return json[0].marker.size[param.dataIndex] / json[0].marker.sizeref;
                                },
                                itemStyle: {
                                    color: function (param: any) {
                                        return json[0].marker.color[param.dataIndex] as string;
                                    }
                                },
                                data: data
                            }
                        ]
                    });
                });
        }
    }
}
