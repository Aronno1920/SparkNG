import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-polar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Apartment rents across nineteen Chinese cities on a polar axis: a transparent base stack draws the lowest-to-highest range and a floating bar marks the average.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" height="30rem" />
        </div>
        <app-code></app-code>
    `
})
export class BarPolarDoc {
    // prettier-ignore
    data = [
        [5000, 10000, 6785.71], [4000, 10000, 6825], [3000, 6500, 4463.33], [2500, 5600, 3793.83], [2000, 4000, 3060],
        [2000, 4000, 3222.33], [2500, 4000, 3133.33], [1800, 4000, 3100], [2000, 3500, 2750], [2000, 3000, 2500],
        [1800, 3000, 2433.33], [2000, 2700, 2375], [1500, 2800, 2150], [1500, 2300, 2100], [1600, 3500, 2057.14],
        [1500, 2600, 2037.5], [1500, 2417.54, 1905.85], [1500, 2000, 1775], [1500, 1800, 1650]
    ];
    // prettier-ignore
    cities = ['北京', '上海', '深圳', '广州', '苏州', '杭州', '南京', '福州', '青岛', '济南', '长春', '大连', '温州', '郑州', '武汉', '成都', '东莞', '沈阳', '烟台'];
    barHeight = 50;

    options = {
        title: {
            text: 'How expensive is it to rent an apartment in China?',
            subtext: 'Data from https://www.numbeo.com'
        },
        legend: {
            show: true,
            top: 'bottom',
            data: ['Range', 'Average']
        },
        grid: {
            top: 100
        },
        angleAxis: {
            type: 'category',
            data: this.cities
        },
        tooltip: {
            show: true,
            formatter: (params: any) => {
                const id = params.dataIndex;
                return this.cities[id] + '<br>Lowest：' + this.data[id][0] + '<br>Highest：' + this.data[id][1] + '<br>Average：' + this.data[id][2];
            }
        },
        radiusAxis: {},
        polar: {},
        series: [
            {
                type: 'bar',
                itemStyle: {
                    color: 'transparent'
                },
                data: this.data.map(function (d) {
                    return d[0];
                }),
                coordinateSystem: 'polar',
                stack: 'Min Max',
                silent: true
            },
            {
                type: 'bar',
                data: this.data.map(function (d) {
                    return d[1] - d[0];
                }),
                coordinateSystem: 'polar',
                name: 'Range',
                stack: 'Min Max'
            },
            {
                type: 'bar',
                itemStyle: {
                    color: 'transparent'
                },
                data: this.data.map((d) => d[2] - this.barHeight),
                coordinateSystem: 'polar',
                stack: 'Average',
                silent: true,
                z: 10
            },
            {
                type: 'bar',
                data: this.data.map(() => this.barHeight * 2),
                coordinateSystem: 'polar',
                name: 'Average',
                stack: 'Average',
                barGap: '-100%',
                z: 10
            }
        ]
    };
}
