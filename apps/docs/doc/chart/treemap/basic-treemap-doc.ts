import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-treemap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Basic treemap with two trees, nodeA and nodeB, each nested with children leaves.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BasicTreemapDoc {
    options = {
        series: [
            {
                type: 'treemap',
                data: [
                    {
                        name: 'nodeA', // First tree
                        value: 10,
                        children: [
                            {
                                name: 'nodeAa', // First leaf of first tree
                                value: 4
                            },
                            {
                                name: 'nodeAb', // Second leaf of first tree
                                value: 6
                            }
                        ]
                    },
                    {
                        name: 'nodeB', // Second tree
                        value: 20,
                        children: [
                            {
                                name: 'nodeBa', // Son of first tree
                                value: 20,
                                children: [
                                    {
                                        name: 'nodeBa1', // Granson of first tree
                                        value: 20
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
}
