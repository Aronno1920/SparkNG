import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'pie-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A pie chart is a circular statistical graphic which is divided into slices to illustrate numerical proportion. Provide <i>name</i> / <i>value</i> items and optionally enable the <i>roseType</i> mode.</p>
        </app-docsectiontext>
        <div class="card">
            <p-piechart [data]="data" />
        </div>
        <app-code></app-code>
    `
})
export class PieDoc {
    data = [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
    ];
}
