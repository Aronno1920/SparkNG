import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'top-to-bottom-tree-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Top to Bottom Tree expands hierarchy vertically from top to bottom with rectangular node badges.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treechart [data]="tree" orient="TB" [symbol]="'roundRect'" />
        </div>
        <app-code></app-code>
    `
})
export class TopToBottomTreeDoc {
    tree = {
        name: 'CEO',
        children: [
            {
                name: 'CTO',
                children: [{ name: 'Engineering Lead' }, { name: 'QA Lead' }, { name: 'DevOps Lead' }]
            },
            {
                name: 'CPO',
                children: [{ name: 'Product Lead' }, { name: 'Design Lead' }]
            },
            {
                name: 'CFO',
                children: [{ name: 'Accounting' }]
            }
        ]
    };
}
