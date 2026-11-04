import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'nested-pies-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Concentric inner and outer pie rings mapping categories and subcategory divisions.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class NestedPiesDoc {
    options = {
        tooltip: { trigger: 'item' },
        series: [
            {
                name: 'Category',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
                label: { position: 'inner', fontSize: 14 },
                data: [
                    { value: 1548, name: 'Search' },
                    { value: 775, name: 'Direct' }
                ]
            },
            {
                name: 'Source',
                type: 'pie',
                radius: ['45%', '60%'],
                data: [
                    { value: 1048, name: 'Google' },
                    { value: 500, name: 'Bing' },
                    { value: 400, name: 'Desktop' },
                    { value: 375, name: 'Mobile' }
                ]
            }
        ]
    };
}
