import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'dynamic-data-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Bar chart connected to live stream or dynamic timer updates.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [xAxis]="xAxis" />
        </div>
        <app-code></app-code>
    `
})
export class DynamicDataDoc {
    xAxis = { type: 'category', data: ['Channel 1', 'Channel 2', 'Channel 3', 'Channel 4'] };

    series = [{ name: 'Bandwidth', type: 'bar', data: [58, 72, 91, 64] }];
}
