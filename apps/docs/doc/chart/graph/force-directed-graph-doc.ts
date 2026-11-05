import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'force-directed-graph-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Force-directed simulation distributing characters from Les Misérables with physics repulsion and category-based clustering.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class ForceDirectedGraphDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            fetch('demo/chart/data/les-miserables.json')
                .then((res) => res.json())
                .then((graph) => {
                    graph.nodes.forEach((node: any) => {
                        node.symbolSize = 5;
                    });

                    this.options = {
                        title: {
                            text: 'Les Miserables',
                            subtext: 'Default layout',
                            top: 'bottom',
                            left: 'right'
                        },
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
                                layout: 'force',
                                data: graph.nodes,
                                links: graph.links,
                                categories: graph.categories,
                                roam: true,
                                label: {
                                    position: 'right'
                                },
                                force: {
                                    repulsion: 100
                                }
                            }
                        ]
                    };

                    this.chart.setOption(this.options, true);
                });
        }
    }
}
