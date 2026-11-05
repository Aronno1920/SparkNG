import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

function getVirtualData(year: string) {
    const date = +new Date(year + '-01-01');
    const end = +new Date(+year + 1 + '-01-01');
    const dayTime = 3600 * 24 * 1000;
    const data: [string, number][] = [];
    for (let time = date; time < end; time += dayTime) {
        const d = new Date(time);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        data.push([`${y}-${m}-${day}`, Math.floor(Math.random() * 10000)]);
    }
    return data;
}

@Component({
    selector: 'calendar-charts-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Daily step count mapped onto a 2016 calendar coordinate system: a piecewise visualMap colors and symbolSize scales each day's scatter marker.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" height="22rem" />
        </div>
        <app-code></app-code>
    `
})
export class CalendarChartsDoc {
    options = {
        title: {
            top: 30,
            left: 'center',
            text: 'Daily Step Count'
        },
        tooltip: {},
        visualMap: {
            min: 0,
            max: 10000,
            type: 'piecewise',
            orient: 'horizontal',
            left: 'center',
            top: 65
        },
        calendar: {
            top: 120,
            left: 30,
            right: 30,
            cellSize: ['auto', 13],
            range: '2016',
            itemStyle: {
                borderWidth: 0.5
            },
            yearLabel: { show: false }
        },
        series: {
            type: 'scatter',
            coordinateSystem: 'calendar',
            data: getVirtualData('2016'),
            symbolSize: function (val: any[]) {
                return val[1] / 500;
            }
        }
    };
}
