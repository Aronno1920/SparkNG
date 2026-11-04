import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'doughnut-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A doughnut is a pie variant with an empty center; enable it with the <i>donut</i> property or provide a custom <i>radius</i> pair.</p>
        </app-docsectiontext>
        <div class="card">
            <p-piechart [data]="data" donut />
        </div>
        <app-code></app-code>
    `
})
export class DoughnutDoc {
    data = [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
    ];
}
