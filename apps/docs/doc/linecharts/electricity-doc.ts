import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'electricity-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Electricity distribution by use over the years: lines for the trends plus a bar for the total demand, sharing one category axis and two value axes.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ElectricityDoc {
    options = {
        tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
        legend: {},
        grid: { left: 48, right: 64 },
        xAxis: { type: 'category', data: ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'] },
        yAxis: [
            { type: 'value', name: 'Demand (TWh)' },
            { type: 'value', name: 'Growth (%)', axisLabel: { formatter: '{value} %' } }
        ],
        series: [
            { name: 'Lighting', type: 'line', smooth: true, data: [73, 76, 79, 84, 88, 94, 100, 107, 113, 119, 125] },
            { name: 'Heating', type: 'line', smooth: true, data: [54, 58, 61, 62, 66, 71, 74, 79, 83, 87, 92] },
            { name: 'Cooling', type: 'line', smooth: true, data: [28, 31, 34, 39, 44, 50, 56, 64, 71, 78, 86] },
            { name: 'Total', type: 'bar', barWidth: 16, itemStyle: { opacity: 0.4 }, data: [155, 165, 174, 185, 198, 215, 230, 250, 267, 284, 303] },
            { name: 'Growth', type: 'line', yAxisIndex: 1, symbol: 'none', lineStyle: { type: 'dashed' }, data: [null, 6.5, 5.5, 6.3, 7.0, 8.6, 7.0, 8.7, 6.8, 6.4, 6.7] }
        ]
    };
}
