import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'graph-label-overlap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Automatically hides overlapping labels in dense network graphs to maintain readability as users roam, pan and zoom.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class GraphLabelOverlapDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            fetch('demo/chart/data/les-miserables.json')
                .then((res) => res.json())
                .then((graph) => {
                    this.options = {
                        tooltip: {},
                        legend: [
                            {
                                data: graph.categories.map((a: { name: string }) => a.name)
                            }
                        ],
                        series: [
                            {
                                name: 'Les Miserables',
                                type: 'graph',
                                layout: 'none',
                                data: graph.nodes,
                                links: graph.links,
                                categories: graph.categories,
                                roam: true,
                                label: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{b}'
                                },
                                labelLayout: {
                                    hideOverlap: true
                                },
                                scaleLimit: {
                                    min: 0.4,
                                    max: 2
                                },
                                lineStyle: {
                                    color: 'source',
                                    curveness: 0.3
                                }
                            }
                        ]
                    };

                    this.chart.setOption(this.options, true);
                });
        }
    }
}
