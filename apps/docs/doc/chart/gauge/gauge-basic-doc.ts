import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'gauge-basic-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Standard speedometer gauge with pointer needle and value readout.</p>
        </app-docsectiontext>
        <div class="card">
            <p-gaugechart [value]="70" />
        </div>
        <app-code></app-code>
    `
})
export class GaugeBasicDoc {
    value = 70;
}
