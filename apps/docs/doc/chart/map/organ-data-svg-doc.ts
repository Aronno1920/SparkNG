import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { ChartModule, registerMap } from '@bdspark/sparkng/chart';

@Component({
    selector: 'organ-data-svg-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>An SVG organ diagram linked to a bar chart: hovering a bar highlights the matching organ region and regions can be multi-selected.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class OrganDataSvgDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        fetch('demo/chart/geo/Veins_Medical_Diagram_clip_art.svg')
            .then((r) => r.text())
            .then((svg: string) => {
                registerMap('organ_diagram', { svg });

                this.chart.setOption({
                    tooltip: {},
                    geo: {
                        left: 10,
                        right: '50%',
                        map: 'organ_diagram',
                        selectedMode: 'multiple',
                        emphasis: {
                            focus: 'self',
                            itemStyle: {
                                color: null
                            },
                            label: {
                                position: 'bottom',
                                distance: 0,
                                textBorderColor: '#fff',
                                textBorderWidth: 2
                            }
                        },
                        blur: {},
                        select: {
                            itemStyle: {
                                color: '#b50205'
                            },
                            label: {
                                show: false,
                                textBorderColor: '#fff',
                                textBorderWidth: 2
                            }
                        }
                    },
                    grid: {
                        left: '60%',
                        top: '20%',
                        bottom: '20%'
                    },
                    xAxis: {},
                    yAxis: {
                        data: ['heart', 'large-intestine', 'small-intestine', 'spleen', 'kidney', 'lung', 'liver']
                    },
                    series: [
                        {
                            type: 'bar',
                            emphasis: {
                                focus: 'self'
                            },
                            data: [121, 321, 141, 52, 198, 289, 139]
                        }
                    ]
                });

                this.chart.on('mouseover', { seriesIndex: 0 }, (event: any) => {
                    this.chart.dispatchAction({
                        type: 'highlight',
                        geoIndex: 0,
                        name: event.name
                    });
                });
                this.chart.on('mouseout', { seriesIndex: 0 }, (event: any) => {
                    this.chart.dispatchAction({
                        type: 'downplay',
                        geoIndex: 0,
                        name: event.name
                    });
                });
            });
    }
}
