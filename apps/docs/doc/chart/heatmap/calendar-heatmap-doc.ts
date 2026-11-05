import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'calendar-heatmap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Calendar Heatmap maps daily values across weeks and months using a calendar coordinate system.</p>
        </app-docsectiontext>
        <div class="card">
            <p-heatmapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class CalendarHeatmapDoc {
    options = {
        tooltip: { position: 'top' },
        visualMap: {
            min: 0,
            max: 100,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 20
        },
        calendar: {
            top: 80,
            left: 40,
            right: 40,
            cellSize: ['auto', 16],
            range: '2026',
            itemStyle: { borderWidth: 0.5 },
            yearLabel: { show: true }
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: [
                ['2026-01-05', 25],
                ['2026-01-12', 45],
                ['2026-01-19', 80],
                ['2026-01-26', 15],
                ['2026-02-02', 60],
                ['2026-02-09', 90],
                ['2026-02-16', 35],
                ['2026-02-23', 70],
                ['2026-03-02', 40],
                ['2026-03-09', 85],
                ['2026-03-16', 95],
                ['2026-03-23', 50],
                ['2026-04-06', 75],
                ['2026-04-13', 30],
                ['2026-04-20', 65],
                ['2026-04-27', 85],
                ['2026-05-04', 90],
                ['2026-05-11', 40],
                ['2026-05-18', 55],
                ['2026-05-25', 70],
                ['2026-06-01', 35],
                ['2026-06-08', 60],
                ['2026-06-15', 80],
                ['2026-06-22', 95],
                ['2026-07-06', 50],
                ['2026-07-13', 70],
                ['2026-07-20', 85],
                ['2026-07-27', 40],
                ['2026-08-03', 65],
                ['2026-08-10', 90],
                ['2026-08-17', 75],
                ['2026-08-24', 30],
                ['2026-09-07', 80],
                ['2026-09-14', 95],
                ['2026-09-21', 60],
                ['2026-09-28', 45],
                ['2026-10-05', 70],
                ['2026-10-12', 85],
                ['2026-10-19', 90],
                ['2026-10-26', 40],
                ['2026-11-02', 55],
                ['2026-11-09', 75],
                ['2026-11-16', 65],
                ['2026-11-23', 85],
                ['2026-12-07', 95],
                ['2026-12-14', 80],
                ['2026-12-21', 50],
                ['2026-12-28', 30]
            ]
        }
    };
}
