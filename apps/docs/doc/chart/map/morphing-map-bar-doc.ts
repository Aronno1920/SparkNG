import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'morphing-map-bar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Morphing between Map and Bar animates visual transitions between geographic locations and statistical bars.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MorphingMapBarDoc {
    options = {
        xAxis: { type: 'category', data: ['US', 'CN', 'JP', 'DE', 'UK'] },
        yAxis: { type: 'value' },
        series: [
            {
                type: 'bar',
                data: [21.4, 14.3, 5.0, 3.8, 2.8],
                universalTransition: true
            }
        ]
    };
}
