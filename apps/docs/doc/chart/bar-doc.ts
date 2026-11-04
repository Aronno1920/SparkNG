import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Bars represent categorical values. The <i>horizontal</i> property rotates the layout and multiple series are placed side by side, or on top of each other when they share a <i>stack</i>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [xAxis]="{ type: 'category', data: quarters }" />
        </div>
        <app-code></app-code>
    `
})
export class BarDoc {
    quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

    series = [
        { name: '2024', type: 'bar', data: [540, 325, 702, 620] },
        { name: '2025', type: 'bar', data: [618, 491, 764, 699] }
    ];
}
