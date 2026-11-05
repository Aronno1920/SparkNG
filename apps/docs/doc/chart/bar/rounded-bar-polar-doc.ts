import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'rounded-bar-polar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Two identical polar bars compare <i>roundCap</i>: the red-bordered series has flat ends while the green-bordered one rounds its outer corners.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class RoundedBarPolarDoc {
    options = {
        angleAxis: {
            max: 2,
            startAngle: 30,
            splitLine: {
                show: false
            }
        },
        radiusAxis: {
            type: 'category',
            data: ['v', 'w', 'x', 'y', 'z'],
            z: 10
        },
        polar: {},
        series: [
            {
                type: 'bar',
                data: [4, 3, 2, 1, 0],
                coordinateSystem: 'polar',
                name: 'Without Round Cap',
                itemStyle: {
                    borderColor: 'red',
                    opacity: 0.8,
                    borderWidth: 1
                }
            },
            {
                type: 'bar',
                data: [4, 3, 2, 1, 0],
                coordinateSystem: 'polar',
                name: 'With Round Cap',
                roundCap: true,
                itemStyle: {
                    borderColor: 'green',
                    opacity: 0.8,
                    borderWidth: 1
                }
            }
        ],
        legend: {
            show: true,
            data: ['Without Round Cap', 'With Round Cap']
        }
    };
}
