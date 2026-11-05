import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-negative-value2-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Stacked positive and negative bars visualize daily Profit, Income and Expenses across categories.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BarNegativeValue2Doc {
    options = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Profit', 'Expenses', 'Income']
        },
        xAxis: [
            {
                type: 'value'
            }
        ],
        yAxis: [
            {
                type: 'category',
                axisTick: {
                    show: false
                },
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        series: [
            {
                name: 'Profit',
                type: 'bar',
                label: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    focus: 'series'
                },
                data: [200, 170, 240, 244, 200, 220, 210]
            },
            {
                name: 'Income',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 302, 341, 374, 390, 450, 420]
            },
            {
                name: 'Expenses',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'left'
                },
                emphasis: {
                    focus: 'series'
                },
                data: [-120, -132, -101, -134, -190, -230, -210]
            }
        ]
    };
}
