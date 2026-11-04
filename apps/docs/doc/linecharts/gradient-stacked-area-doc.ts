import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'gradient-stacked-area-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Area fills accept gradient colors; each band fades vertically for a layered, semi-transparent look.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', boundaryGap: false, data: days }" [tooltip]="{ trigger: 'axis', axisPointer: { type: 'cross' } }" />
        </div>
        <app-code></app-code>
    `
})
export class GradientStackedAreaDoc {
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    series = [
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: { width: 0 },
            showSymbol: false,
            areaStyle: { opacity: 0.8, color: this.gradient('#80FFA5') },
            emphasis: { focus: 'series' },
            data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
            name: 'Search',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: { width: 0 },
            showSymbol: false,
            areaStyle: { opacity: 0.8, color: this.gradient('#00DDFF') },
            emphasis: { focus: 'series' },
            data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: { width: 0 },
            showSymbol: false,
            areaStyle: { opacity: 0.8, color: this.gradient('#37A2FF') },
            emphasis: { focus: 'series' },
            data: [320, 132, 201, 334, 190, 130, 220]
        }
    ];

    private gradient(color: string) {
        return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color },
                { offset: 1, color: 'rgba(0,0,0,0)' }
            ]
        };
    }
}
