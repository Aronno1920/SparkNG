import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'node-align-left-sankey-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Node Align Left: Sankey of the energy dataset with nodeAlign left, so the nodes of every depth line up flush to the left edge.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class NodeAlignLeftSankeyDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.chart.showLoading();
            fetch('demo/chart/data/energy.json')
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
                text: 'Node Align Left'
            },
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'sankey',
                    emphasis: {
                        focus: 'adjacency'
                    },
                    nodeAlign: 'left',
                    data: data.nodes,
                    links: data.links,
                    lineStyle: {
                        color: 'source',
                        curveness: 0.5
                    }
                }
            ]
        };
    }
}
