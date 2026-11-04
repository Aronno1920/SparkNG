import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'multiple-categories-boxplot-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Grouped boxplots comparing distribution metrics across diverse product lines.</p>
        </app-docsectiontext>
        <div class="card">
            <p-boxplotchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MultipleCategoriesBoxplotDoc {
    options = {
        xAxis: { type: 'category', data: ['Electronics', 'Home Goods', 'Apparel'] },
        yAxis: { type: 'value' },
        series: [
            {
                name: 'Store 1',
                type: 'boxplot',
                data: [
                    [120, 180, 220, 290, 350],
                    [80, 120, 150, 190, 240],
                    [40, 65, 85, 110, 140]
                ]
            }
        ]
    };
}
