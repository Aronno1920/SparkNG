import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'horizontalbar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A bar chart is rendered horizontally when <i>horizontal</i> is enabled, which also swaps the default axis types.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [yAxis]="{ type: 'category', data: countries }" horizontal />
        </div>
        <app-code></app-code>
    `
})
export class HorizontalBarDoc {
    countries = ['Brazil', 'Germany', 'Hungary', 'Mexico', 'Japan'];

    series = [
        {
            name: '2024',
            type: 'bar',
            data: [183, 146, 122, 99, 87]
        }
    ];
}
