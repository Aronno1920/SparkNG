import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-graph-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A basic node-link relationship graph with explicit layout coordinates, bidirectional directed edges, and custom arrow symbols.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BasicGraphDoc {
    options = {
        title: {
            text: 'Basic Graph'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                roam: true,
                label: {
                    show: true
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20
                },
                data: [
                    {
                        name: 'Node 1',
                        x: 300,
                        y: 300
                    },
                    {
                        name: 'Node 2',
                        x: 800,
                        y: 300
                    },
                    {
                        name: 'Node 3',
                        x: 550,
                        y: 100
                    },
                    {
                        name: 'Node 4',
                        x: 550,
                        y: 500
                    }
                ],
                links: [
                    {
                        source: 0,
                        target: 1,
                        symbolSize: [5, 20],
                        label: {
                            show: true
                        },
                        lineStyle: {
                            width: 5,
                            curveness: 0.2
                        }
                    },
                    {
                        source: 'Node 2',
                        target: 'Node 1',
                        label: {
                            show: true
                        },
                        lineStyle: {
                            curveness: 0.2
                        }
                    },
                    {
                        source: 'Node 1',
                        target: 'Node 3'
                    },
                    {
                        source: 'Node 2',
                        target: 'Node 3'
                    },
                    {
                        source: 'Node 2',
                        target: 'Node 4'
                    },
                    {
                        source: 'Node 1',
                        target: 'Node 4'
                    }
                ],
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                }
            }
        ]
    };
}
