import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'flight-seatmap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Flight Seatmap with SVG displays interactive aircraft seating layouts with availability states.</p>
        </app-docsectiontext>
        <div class="card">
            <p-mapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class FlightSeatmapDoc {
    options = {
        title: { text: 'Aircraft Seating Layout', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [
            {
                name: 'Seats',
                type: 'map',
                map: 'flight_seats',
                roam: true,
                data: [
                    { name: '1A', value: 1 },
                    { name: '1B', value: 0 },
                    { name: '2A', value: 1 },
                    { name: '2B', value: 1 }
                ]
            }
        ]
    };
}
