import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'line-y-category-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>With a category <i>y</i> axis the lines run horizontally — a natural fit for stages, rankings and timelines.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'value', min: 0, max: 100 }" [yAxis]="{ type: 'category', data: stages, inverse: true }" [tooltip]="{ trigger: 'axis' }" />
        </div>
        <app-code></app-code>
    `
})
export class LineYCategoryDoc {
    stages = ['Design', 'Prototype', 'Review', 'Testing', 'Release'];

    series = [
        {
            name: 'Planned progress',
            type: 'line',
            data: [
                [10, 0],
                [30, 1],
                [50, 2],
                [70, 3],
                [95, 4]
            ],
            symbolSize: 8
        },
        {
            name: 'Actual progress',
            type: 'line',
            smooth: true,
            data: [
                [5, 0],
                [28, 1],
                [46, 2],
                [78, 3],
                [88, 4]
            ],
            symbolSize: 8
        }
    ];
}
