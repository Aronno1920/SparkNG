import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'aqi-radar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Environmental Air Quality Index radar monitoring pollutant concentration levels.</p>
        </app-docsectiontext>
        <div class="card">
            <p-radarchart [indicator]="indicators" [data]="data" />
        </div>
        <app-code></app-code>
    `
})
export class AqiRadarDoc {
    indicators = [
        { name: 'AQI', max: 300 },
        { name: 'PM2.5', max: 250 },
        { name: 'PM10', max: 300 },
        { name: 'CO', max: 5 },
        { name: 'NO2', max: 200 },
        { name: 'SO2', max: 100 }
    ];

    data = [
        { value: [55, 35, 60, 0.8, 40, 12], name: 'Clean Day' },
        { value: [180, 145, 190, 2.8, 120, 45], name: 'Smog Day' }
    ];
}
