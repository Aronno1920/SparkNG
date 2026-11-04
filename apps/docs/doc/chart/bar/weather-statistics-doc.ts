import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'weather-statistics-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Multi-metric weather station records comparing humidity, wind, and precipitation.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [xAxis]="xAxis" />
        </div>
        <app-code></app-code>
    `
})
export class WeatherStatisticsDoc {
    xAxis = { type: 'category', data: ['North', 'South', 'East', 'West', 'Central'] };

    series = [
        { name: 'Humidity (%)', type: 'bar', data: [75, 62, 85, 45, 68] },
        { name: 'Wind (km/h)', type: 'bar', data: [18, 25, 12, 30, 15] }
    ];
}
