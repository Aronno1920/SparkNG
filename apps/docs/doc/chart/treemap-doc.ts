import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'treemap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Treemap displays hierarchical data as a set of nested rectangles. Each branch of the tree is given a rectangle, which is then tiled with smaller rectangles representing sub-branches.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treemapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class TreemapDoc {
    options = {
        title: {
            text: 'Disk Usage',
            left: 'center'
        },
        tooltip: {
            formatter: '{b}: {c}'
        },
        series: [
            {
                type: 'treemap',
                data: [
                    {
                        name: 'nodeA',
                        value: 10,
                        children: [
                            {
                                name: 'nodeAa',
                                value: 4
                            },
                            {
                                name: 'nodeAb',
                                value: 6
                            }
                        ]
                    },
                    {
                        name: 'nodeB',
                        value: 20,
                        children: [
                            {
                                name: 'nodeBa',
                                value: 20,
                                children: [
                                    {
                                        name: 'nodeBa1',
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
