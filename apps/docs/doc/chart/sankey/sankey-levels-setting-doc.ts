import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'sankey-levels-setting-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Sankey Diagram of the product dataset with per-depth level settings: each depth gets its own node color and source-colored links at 0.6 opacity.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class SankeyLevelsSettingDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.chart.showLoading();
            fetch('demo/chart/data/product.json')
                .then((response) => response.json())
                .then((data) => {
                    this.chart.hideLoading();
                    this.chart.setOption(this.buildOption(data));
                });
        }
    }

    private buildOption(data: any): any {
        return {
            title: {
                text: 'Sankey Diagram'
            },
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'sankey',
                    data: data.nodes,
                    links: data.links,
                    emphasis: {
                        focus: 'adjacency'
                    },
                    levels: [
                        {
                            depth: 0,
                            itemStyle: {
                                color: '#fbb4ae'
                            },
                            lineStyle: {
                                color: 'source',
                                opacity: 0.6
                            }
                        },
                        {
                            depth: 1,
                            itemStyle: {
                                color: '#b3cde3'
                            },
                            lineStyle: {
                                color: 'source',
                                opacity: 0.6
                            }
                        },
                        {
                            depth: 2,
                            itemStyle: {
                                color: '#ccebc5'
                            },
                            lineStyle: {
                                color: 'source',
                                opacity: 0.6
                            }
                        },
                        {
                            depth: 3,
                            itemStyle: {
                                color: '#decbe4'
                            },
                            lineStyle: {
                                color: 'source',
                                opacity: 0.6
                            }
                        }
                    ],
                    lineStyle: {
                        curveness: 0.5
                    }
                }
            ]
        };
    }
}
