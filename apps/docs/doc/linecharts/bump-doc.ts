import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bump-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A bump chart tracks rank over time: the y axis lists the ranks inverted so rank 1 sits on top, and lines cross as entities overtake each other.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', boundaryGap: false, data: weeks }" [yAxis]="{ type: 'value', inverse: true, min: 1, max: 6, interval: 1 }" [tooltip]="{ trigger: 'item' }" />
        </div>
        <app-code></app-code>
    `
})
export class BumpDoc {
    weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9'];

    series = [
        { name: 'Angular', type: 'line', symbolSize: 8, data: [4, 3, 3, 2, 2, 1, 1, 1, 1] },
        { name: 'React', type: 'line', symbolSize: 8, data: [1, 1, 2, 1, 3, 2, 2, 3, 2] },
        { name: 'Vue', type: 'line', symbolSize: 8, data: [2, 2, 1, 3, 1, 3, 3, 2, 3] },
        { name: 'Svelte', type: 'line', symbolSize: 8, data: [5, 5, 6, 5, 5, 5, 4, 4, 4] },
        { name: 'Solid', type: 'line', symbolSize: 8, data: [6, 6, 5, 6, 6, 6, 6, 5, 5] }
    ];
}
