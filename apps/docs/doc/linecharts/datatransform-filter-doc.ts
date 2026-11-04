import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'datatransform-filter-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A shared <i>dataset</i> feeds multiple series; each applies a <i>transform</i> to filter or reshape the source before plotting, without duplicating data in the component.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class DatatransformFilterDoc {
    options = {
        dataset: {
            dimensions: ['name', 'age', 'profession', 'score', 'date'],
            source: [
                ['Hannah Krause', 41, 'Engineer', 314, '2011-02-12'],
                ['Zhao Qian', 20, 'Teacher', 351, '2011-03-01'],
                ['Jasmin Krause ', 52, 'Musician', 287, '2011-02-14'],
                ['Li Lei', 37, 'Teacher', 219, '2011-12-01'],
                ['Karle Neumann', 25, 'Engineer', 253, '2011-12-01'],
                ['Adrian Groß', 19, 'Teacher', null, '2011-12-01'],
                ['Mia Neumann', 41, 'Engineer', 264, '2011-12-01']
            ]
        },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', name: 'Name', axisLabel: { rotate: 30 } },
        yAxis: { type: 'value', name: 'Score' },
        series: [
            {
                type: 'line',
                encode: { x: 'name', y: 'score' },
                datasetIndex: 0,
                dataset: { transform: { type: 'filter', config: { dimension: 'score', gte: 250 } } },
                symbolSize: 8
            }
        ]
    };
}
