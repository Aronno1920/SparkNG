import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'categories-graph-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Les Misérables character network categorized into groups with adjacency focus highlighting connected nodes and edges on hover.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class CategoriesGraphDoc {
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
                        node.label = {
                            show: node.symbolSize > 30
                        };
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
                        animationDuration: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series: [
                            {
                                name: 'Les Miserables',
                                type: 'graph',
                                legendHoverLink: false,
                                layout: 'none',
                                data: graph.nodes,
                                links: graph.links,
                                categories: graph.categories,
                                roam: true,
                                label: {
                                    position: 'right',
                                    formatter: '{b}'
                                },
                                lineStyle: {
                                    color: 'source',
                                    curveness: 0.3
                                },
                                emphasis: {
                                    focus: 'adjacency',
                                    lineStyle: {
                                        width: 10
                                    }
                                }
                            }
                        ]
                    };

                    this.chart.setOption(this.options, true);
                });
        }
    }
}
