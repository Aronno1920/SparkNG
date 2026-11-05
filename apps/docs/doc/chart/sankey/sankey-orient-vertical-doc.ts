import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'sankey-orient-vertical-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Vertical Sankey with labels on top of the nodes, source-colored curved links and animation disabled.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SankeyOrientVerticalDoc {
    options: any = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        animation: false,
        series: [
            {
                type: 'sankey',
                bottom: '10%',
                emphasis: {
                    focus: 'adjacency'
                },
                data: [{ name: 'a' }, { name: 'b' }, { name: 'a1' }, { name: 'b1' }, { name: 'c' }, { name: 'e' }],
                links: [
                    { source: 'a', target: 'a1', value: 5 },
                    { source: 'e', target: 'b', value: 3 },
                    { source: 'a', target: 'b1', value: 3 },
                    { source: 'b1', target: 'a1', value: 1 },
                    { source: 'b1', target: 'c', value: 2 },
                    { source: 'b', target: 'c', value: 1 }
                ],
                orient: 'vertical',
                label: {
                    position: 'top'
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.5
                }
            }
        ]
    };
}
