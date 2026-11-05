import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'left-to-right-tree-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Left to Right Tree expands hierarchy horizontally from left to right with collapsible branches.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treechart [data]="tree" orient="LR" [symbol]="'circle'" />
        </div>
        <app-code></app-code>
    `
})
export class LeftToRightTreeDoc {
    tree = {
        name: 'Root',
        children: [
            {
                name: 'Section A',
                children: [{ name: 'Item A-1' }, { name: 'Item A-2' }, { name: 'Item A-3' }]
            },
            {
                name: 'Section B',
                children: [{ name: 'Item B-1' }, { name: 'Item B-2' }]
            },
            {
                name: 'Section C',
                children: [{ name: 'Item C-1' }]
            }
        ]
    };
}
