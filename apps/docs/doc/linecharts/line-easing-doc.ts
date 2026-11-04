import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'line-easing-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Animation easing visualized: the same data enters with <i>elasticOut</i> easing and per-point delays, drawing attention along the curve.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', boundaryGap: false, data: points }" [yAxis]="{ type: 'value', boundaryGap: [0, '100%'] }" />
        </div>
        <app-code></app-code>
    `
})
export class LineEasingDoc {
    points: string[] = [];

    data: number[] = [];

    series = [
        {
            type: 'line',
            showSymbol: false,
            clip: true,
            data: this.data,
            animationDuration: 5000,
            animationDurationUpdate: 1500,
            animationEasing: 'elasticOut',
            animationEasingUpdate: 'quinticInOut',
            animationDelay: (index: number) => index * 40,
            animationDelayUpdate: (index: number) => index * 12
        }
    ];

    constructor() {
        for (let i = 0; i < 60; i++) {
            this.points.push(String(i));
            this.data.push(Math.round((Math.sin(i / 6) + 1) * 120 + Math.random() * 20));
        }
    }
}
