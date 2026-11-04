import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'beijing-aqi-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Hourly air quality readings with a <i>visualMap</i> that colors segments by severity, a markLine at the healthy limit and sliders for zooming the week.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BeijingAqiDoc {
    hours: string[] = [];

    aqi: number[] = [];

    options: any;

    constructor() {
        let base = +new Date(2025, 2, 10);
        const oneHour = 3600 * 1000;
        for (let i = 0; i < 168; i++) {
            const now = new Date((base += oneHour));
            this.hours.push([now.getMonth() + 1, now.getDate(), now.getHours()].join('/'));
            const day = Math.sin((i / 24) * Math.PI) * 80 + 90;
            this.aqi.push(Math.round(day + Math.random() * 40 - 20));
        }
        this.options = {
            tooltip: { trigger: 'axis' },
            grid: { left: 48, right: 72 },
            xAxis: { type: 'category', boundaryGap: false, data: this.hours },
            yAxis: { type: 'value', name: 'AQI' },
            dataZoom: [{ type: 'slider', start: 0, end: 60 }, { type: 'inside' }],
            visualMap: {
                top: 8,
                right: 8,
                pieces: [
                    { gt: 200, lte: 300, color: '#7f1100' },
                    { gt: 150, lte: 200, color: '#ff4d00' },
                    { gt: 100, lte: 150, color: '#ff9842' },
                    { gt: 50, lte: 100, color: '#ffd76e' },
                    { gt: 0, lte: 50, color: '#a6d96a' }
                ],
                outOfRange: { color: '#999' }
            },
            series: [
                {
                    name: 'Beijing AQI',
                    type: 'line',
                    data: this.aqi,
                    markLine: {
                        silent: true,
                        lineStyle: { color: '#9b2f2f' },
                        data: [{ yAxis: 100 }]
                    }
                }
            ]
        };
    }
}
