import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'graph-cartesian-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Graph nodes mapped directly onto a 2D Cartesian coordinate system with category and value axes connected by directed arrows.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class GraphCartesianDoc {
    axisData = ['Mon', 'Tue', 'Wed', 'Very Loooong Thu', 'Fri', 'Sat', 'Sun'];

    data = [120, 200, 150, 80, 70, 110, 130];

    options = {
        title: {
            text: 'Graph on Cartesian'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.axisData
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                type: 'graph',
                layout: 'none',
                coordinateSystem: 'cartesian2d',
                symbolSize: 40,
                label: {
                    show: true
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                data: this.data,
                links: [
                    { source: 0, target: 1 },
                    { source: 1, target: 2 },
                    { source: 2, target: 3 },
                    { source: 3, target: 4 },
                    { source: 4, target: 5 },
                    { source: 5, target: 6 }
                ],
                lineStyle: {
                    color: '#2f4554'
                }
            }
        ]
    };
}
