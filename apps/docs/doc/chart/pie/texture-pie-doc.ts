import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'texture-pie-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Pie chart with customized borders, colors, and emphasized slice states.</p>
        </app-docsectiontext>
        <div class="card">
            <p-piechart [data]="data" />
        </div>
        <app-code></app-code>
    `
})
export class TexturePieDoc {
    data = [
        { value: 1048, name: 'Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Marketing' }
    ];
}
