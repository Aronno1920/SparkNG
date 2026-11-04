import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'tree-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A tree chart renders nested <i>name</i> / <i>children</i> structures; <i>orient</i> rotates the layout and branches collapse on click.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treechart [data]="tree" orient="LR" [symbol]="'circle'" />
        </div>
        <app-code></app-code>
    `
})
export class TreeDoc {
    tree = {
        name: 'SparkNG',
        children: [
            {
                name: 'Inputs',
                children: [{ name: 'Select' }, { name: 'DatePicker' }, { name: 'InputNumber' }]
            },
            {
                name: 'Data',
                children: [{ name: 'Table' }, { name: 'Chart' }, { name: 'Scheduler' }]
            },
            {
                name: 'Overlay',
                children: [{ name: 'Dialog' }, { name: 'Toast' }]
            }
        ]
    };
}
