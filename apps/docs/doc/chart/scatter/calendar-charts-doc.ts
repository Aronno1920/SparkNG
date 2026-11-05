import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'calendar-charts-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Calendar Charts maps scatter bubbles across an annual calendar coordinate system.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class CalendarChartsDoc {
    options = {
        calendar: { range: '2026', top: 50 },
        series: [
            {
                type: 'scatter',
                coordinateSystem: 'calendar',
                data: [
                    ['2026-02-14', 15],
                    ['2026-04-01', 25],
                    ['2026-07-04', 35],
                    ['2026-10-31', 40],
                    ['2026-12-25', 50]
                ],
                symbolSize: (val: any) => val[1] / 2
            }
        ]
    };
}
