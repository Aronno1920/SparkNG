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
            <p>A calendar coordinate system with scattered events: each point is plotted on its date, and the <i>visualMap</i> encodes the event size by color.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" height="22rem" />
        </div>
        <app-code></app-code>
    `
})
export class CalendarChartsDoc {
    private events: [string, number][] = [];

    options: any;

    constructor() {
        const start = +new Date(2025, 0, 1);
        const day = 24 * 3600 * 1000;
        for (let i = 0; i < 130; i++) {
            const date = new Date(start + Math.floor(Math.random() * 180) * day);
            const key = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
            this.events.push([key, Math.round(20 + Math.random() * 240)]);
        }
        this.options = {
            tooltip: { trigger: 'item' },
            visualMap: {
                min: 0,
                max: 260,
                orient: 'horizontal',
                left: 'center',
                top: 12,
                inRange: { color: ['#37A2FF', '#91cc75', '#fac858', '#ee6666'] }
            },
            calendar: {
                top: 72,
                left: 48,
                right: 24,
                cellSize: ['auto', 16],
                range: '2025',
                itemStyle: { borderWidth: 2, borderColor: 'rgba(0,0,0,0.06)' },
                yearLabel: { show: false },
                dayLabel: { fontSize: 10 },
                monthLabel: { fontSize: 11 }
            },
            series: [
                {
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    symbolSize: (value: number[]) => Math.max(4, value[1] / 14),
                    data: this.events
                }
            ]
        };
    }
}
