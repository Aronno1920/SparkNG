import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'weather-richtext-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Weather Rich Text formats graphic cards with bold temperature metrics, weather tags, and badges.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class WeatherRichTextDoc {
    data = [
        { category: 'Mon', value: 22 },
        { category: 'Tue', value: 25 },
        { category: 'Wed', value: 19 },
        { category: 'Thu', value: 28 },
        { category: 'Fri', value: 24 }
    ];

    options = {
        series: [
            {
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{temp|{c}°C}\n{status|Fair}',
                    rich: {
                        temp: { fontSize: 14, fontWeight: 'bold', color: '#3b82f6' },
                        status: { fontSize: 11, color: '#6b7280', padding: [2, 4] }
                    }
                }
            }
        ]
    };
}
