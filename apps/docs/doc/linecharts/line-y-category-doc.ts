import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'line-y-category-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Vertical line chart with altitude category intervals along the y-axis and temperature values on the x-axis.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LineYCategoryDoc {
    options = {
        legend: {
            data: ['Altitude (km) vs. temperature (°C)']
        },
        tooltip: {
            trigger: 'axis',
            formatter: 'Temperature : <br/>{b}km : {c}°C'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} °C'
            }
        },
        yAxis: {
            type: 'category',
            axisLine: { onZero: false },
            axisLabel: {
                formatter: '{value} km'
            },
            boundaryGap: false,
            data: ['0', '10', '20', '30', '40', '50', '60', '70', '80']
        },
        series: [
            {
                name: 'Altitude (km) vs. temperature (°C)',
                type: 'line',
                symbolSize: 10,
                symbol: 'circle',
                smooth: true,
                lineStyle: {
                    width: 3,
                    shadowColor: 'rgba(0,0,0,0.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 8
                },
                data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
            }
        ]
    };
}
