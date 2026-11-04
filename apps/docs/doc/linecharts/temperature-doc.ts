import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'temperature-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Daily highs and lows with symbols offset to the hour and a rich legend covering the value range.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="xAxis" [yAxis]="yAxis" [legend]="{ data: ['High', 'Low'] }" />
        </div>
        <app-code></app-code>
    `
})
export class TemperatureDoc {
    xAxis = {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel: { formatter: '{value}' }
    };

    yAxis = {
        type: 'value',
        axisLabel: { formatter: '{value} °C' },
        max: (value: { max: number }) => Math.ceil(value.max / 10) * 10 + 5,
        min: (value: { min: number }) => Math.floor(value.min / 10) * 10 - 5
    };

    series = [
        {
            name: 'High',
            type: 'line',
            data: [19, 21, 22, 24, 23, 25, 26].map((v) => [v, 12]),
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: { width: 3 },
            itemStyle: { borderWidth: 2, borderColor: '#fff' },
            label: { show: true, position: 'top', formatter: (p: any) => p.value[0] + '°' }
        },
        {
            name: 'Low',
            type: 'line',
            data: [11, 12, 13, 13, 12, 14, 15].map((v) => [v, 20]),
            symbol: 'diamond',
            symbolSize: 10,
            lineStyle: { width: 3 },
            itemStyle: { borderWidth: 2, borderColor: '#fff' },
            label: { show: true, position: 'bottom', formatter: (p: any) => p.value[0] + '°' }
        }
    ];
}
