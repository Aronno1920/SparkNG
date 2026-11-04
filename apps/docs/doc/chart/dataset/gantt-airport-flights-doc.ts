import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'gantt-airport-flights-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Gantt schedule tracking flight departure gates and turnaround time windows.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class GanttAirportFlightsDoc {
    options = {
        title: { text: 'Airport Flight Operations' },
        xAxis: { type: 'time' },
        yAxis: { type: 'category', data: ['Gate A1', 'Gate A2', 'Gate B1', 'Gate B2'] },
        series: [
            {
                type: 'bar',
                data: [4, 6, 3, 5]
            }
        ]
    };
}
