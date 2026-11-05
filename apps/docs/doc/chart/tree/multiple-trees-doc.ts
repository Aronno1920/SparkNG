import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'multiple-trees-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Multiple Trees displays independent hierarchical structures side-by-side within a single chart canvas.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MultipleTreesDoc {
    options = {
        tooltip: { trigger: 'item', triggerOn: 'mousemove' },
        series: [
            {
                type: 'tree',
                name: 'Tree Left',
                data: [
                    {
                        name: 'Frontend',
                        children: [{ name: 'Angular' }, { name: 'TypeScript' }]
                    }
                ],
                top: '10%',
                left: '10%',
                bottom: '10%',
                right: '55%',
                symbolSize: 9,
                initialTreeDepth: 2
            },
            {
                type: 'tree',
                name: 'Tree Right',
                data: [
                    {
                        name: 'Backend',
                        children: [{ name: 'Node.js' }, { name: 'PostgreSQL' }]
                    }
                ],
                top: '10%',
                left: '55%',
                bottom: '10%',
                right: '10%',
                symbolSize: 9,
                initialTreeDepth: 2
            }
        ]
    };
}
