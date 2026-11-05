import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'waterfall-bar2-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Accumulated waterfall chart tracking daily income and expenses with transparent placeholder bars preserving running totals.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class WaterfallBar2Doc {
    days = Array.from({ length: 11 }, (_, i) => `Nov ${i + 1}`);

    options = {
        title: {
            text: 'Accumulated Waterfall Chart'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: (params: any) => {
                let tar;
                if (params[1] && params[1].value !== '-') {
                    tar = params[1];
                } else {
                    tar = params[2];
                }
                return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
            }
        },
        legend: {
            data: ['Expenses', 'Income']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: this.days
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Placeholder',
                type: 'bar',
                stack: 'Total',
                silent: true,
                itemStyle: {
                    borderColor: 'transparent',
                    color: 'transparent'
                },
                emphasis: {
                    itemStyle: {
                        borderColor: 'transparent',
                        color: 'transparent'
                    }
                },
                data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
            },
            {
                name: 'Income',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'top'
                },
                data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
            },
            {
                name: 'Expenses',
                type: 'bar',
                stack: 'Total',
                label: {
                    show: true,
                    position: 'bottom'
                },
                data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
            }
        ]
    };
}
