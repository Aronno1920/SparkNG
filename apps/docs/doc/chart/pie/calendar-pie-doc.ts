import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import * as echarts from '@bdspark/sparkng-charts';
import { ChartModule } from '@bdspark/sparkng/chart';

// This example requires ECharts v5.4.0 or later
@Component({
    selector: 'calendar-pie-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Miniature Work/Entertainment/Sleep pies placed in every cell of a vertical February 2017 calendar, with the day numbers overlaid by a scatter series.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class CalendarPieDoc {
    cellSize = [80, 80];
    pieRadius = 30;

    scatterData = getVirtualData();

    pieSeries = this.scatterData.map((item: any, index: number) => {
        return {
            type: 'pie',
            id: 'pie-' + index,
            center: item[0],
            radius: this.pieRadius,
            coordinateSystem: 'calendar',
            label: {
                formatter: '{c}',
                position: 'inside'
            },
            data: [
                { name: 'Work', value: Math.round(Math.random() * 24) },
                { name: 'Entertainment', value: Math.round(Math.random() * 24) },
                { name: 'Sleep', value: Math.round(Math.random() * 24) }
            ]
        } as echarts.PieSeriesOption;
    });

    options = {
        tooltip: {},
        legend: {
            data: ['Work', 'Entertainment', 'Sleep'],
            bottom: 20
        },
        calendar: {
            top: 'middle',
            left: 'center',
            orient: 'vertical',
            cellSize: this.cellSize,
            yearLabel: {
                show: false,
                fontSize: 30
            },
            dayLabel: {
                margin: 20,
                firstDay: 1,
                nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            monthLabel: {
                show: false
            },
            range: ['2017-02']
        },
        series: [
            {
                id: 'label',
                type: 'scatter',
                coordinateSystem: 'calendar',
                symbolSize: 0,
                label: {
                    show: true,
                    formatter: function (params: any) {
                        return echarts.time.format(params.value[0], '{dd}', false);
                    },
                    offset: [-this.cellSize[0] / 2 + 10, -this.cellSize[1] / 2 + 10],
                    fontSize: 14
                },
                data: this.scatterData
            },
            ...this.pieSeries
        ]
    };
}

function getVirtualData() {
    const date = +echarts.time.parse('2017-02-01');
    const end = +echarts.time.parse('2017-03-01');
    const dayTime = 3600 * 24 * 1000;
    const data: [string, number][] = [];
    for (let time = date; time < end; time += dayTime) {
        data.push([echarts.time.format(time, '{yyyy}-{MM}-{dd}', false), Math.floor(Math.random() * 10000)]);
    }
    return data;
}
