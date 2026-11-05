import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'npm-dependencies-graph-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Visualizing package dependency networks from the NPM registry with hundreds of interconnected package nodes and curved dependency edges.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class NpmDependenciesGraphDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            fetch('demo/chart/data/npmdepgraph.min10.json')
                .then((res) => res.json())
                .then((json) => {
                    this.options = {
                        title: {
                            text: 'NPM Dependencies'
                        },
                        animationDurationUpdate: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series: [
                            {
                                type: 'graph',
                                layout: 'none',
                                data: json.nodes.map((node: any) => ({
                                    x: node.x,
                                    y: node.y,
                                    id: node.id,
                                    name: node.label,
                                    symbolSize: node.size,
                                    itemStyle: {
                                        color: node.color
                                    }
                                })),
                                edges: json.edges.map((edge: any) => ({
                                    source: edge.sourceID,
                                    target: edge.targetID
                                })),
                                emphasis: {
                                    focus: 'adjacency',
                                    label: {
                                        position: 'right',
                                        show: true
                                    }
                                },
                                roam: true,
                                lineStyle: {
                                    width: 0.5,
                                    curveness: 0.3,
                                    opacity: 0.7
                                }
                            }
                        ]
                    };

                    this.chart.setOption(this.options, true);
                });
        }
    }
}
