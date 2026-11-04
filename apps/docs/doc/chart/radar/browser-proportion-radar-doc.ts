import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'browser-proportion-radar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Radar polygon visualizing client browser market share across distinct platforms.</p>
        </app-docsectiontext>
        <div class="card">
            <p-radarchart [indicator]="indicators" [data]="data" />
        </div>
        <app-code></app-code>
    `
})
export class BrowserProportionRadarDoc {
    indicators = [
        { name: 'Chrome', max: 100 },
        { name: 'Safari', max: 100 },
        { name: 'Firefox', max: 100 },
        { name: 'Edge', max: 100 },
        { name: 'Other', max: 100 }
    ];

    data = [
        { value: [65, 20, 8, 5, 2], name: 'Desktop' },
        { value: [60, 30, 4, 3, 3], name: 'Mobile' }
    ];
}
