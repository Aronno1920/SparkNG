import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'large-scale-bar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Half a million bars render instantly with the <i>large</i> mode; inside and slider dataZoom navigate the one-second-resolution time axis.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LargeScaleBarDoc {
    dataCount = 5e5;

    options: any;

    constructor() {
        const data = this.generateData(this.dataCount);

        this.options = {
            title: {
                text: this.dataCount.toLocaleString('en-US') + ' Data',
                left: 10
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: false
                    },
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                bottom: 90
            },
            dataZoom: [
                {
                    type: 'inside'
                },
                {
                    type: 'slider'
                }
            ],
            xAxis: {
                data: data.categoryData,
                silent: false,
                splitLine: {
                    show: false
                },
                splitArea: {
                    show: false
                }
            },
            yAxis: {
                splitArea: {
                    show: false
                }
            },
            series: [
                {
                    type: 'bar',
                    data: data.valueData,
                    // Set `large` for large data amount
                    large: true
                }
            ]
        };
    }

    private generateData(count: number) {
        let baseValue = Math.random() * 1000;
        let time = +new Date(2011, 0, 1);
        let smallBaseValue: number;

        function next(idx: number) {
            smallBaseValue = idx % 30 === 0 ? Math.random() * 700 : smallBaseValue + Math.random() * 500 - 250;
            baseValue += Math.random() * 20 - 10;
            return Math.max(0, Math.round(baseValue + smallBaseValue) + 3000);
        }

        const categoryData: string[] = [];
        const valueData: string[] = [];

        for (let i = 0; i < count; i++) {
            categoryData.push(this.formatTime('yyyy-MM-dd\nhh:mm:ss', time, false));
            valueData.push(next(i).toFixed(2));
            time += 1000;
        }

        return {
            categoryData: categoryData,
            valueData: valueData
        };
    }

    private formatTime(template: string, time: number | Date, isUTC: boolean): string {
        const date = new Date(time);
        const get = isUTC ? date.getUTCFullYear.bind(date) : date.getFullYear.bind(date);
        const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
        const parts: Record<string, string> = {
            yyyy: '' + get(),
            MM: pad(isUTC ? date.getUTCMonth() + 1 : date.getMonth() + 1),
            dd: pad(isUTC ? date.getUTCDate() : date.getDate()),
            hh: pad(isUTC ? date.getUTCHours() : date.getHours()),
            mm: pad(isUTC ? date.getUTCMinutes() : date.getMinutes()),
            ss: pad(isUTC ? date.getUTCSeconds() : date.getSeconds())
        };
        return template.replace(/yyyy|MM|dd|hh|mm|ss/g, (key) => parts[key]);
    }
}
