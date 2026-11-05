import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-tree-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Basic Tree renders a hierarchical parent-child structure.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treechart [data]="tree" />
        </div>
        <app-code></app-code>
    `
})
export class BasicTreeDoc {
    tree = {
        name: 'SparkNG',
        children: [
            {
                name: 'Components',
                children: [{ name: 'Button' }, { name: 'Table' }, { name: 'Dialog' }]
            },
            {
                name: 'Directives',
                children: [{ name: 'Ripple' }, { name: 'Tooltip' }]
            },
            {
                name: 'Utilities',
                children: [{ name: 'FilterService' }]
            }
        ]
    };
}
