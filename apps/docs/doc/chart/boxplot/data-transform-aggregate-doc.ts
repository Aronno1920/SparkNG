import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'data-transform-aggregate-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Boxplot generated automatically from raw numerical records via dataset aggregation.</p>
        </app-docsectiontext>
        <div class="card">
            <p-boxplotchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class DataTransformAggregateDoc {
    options = {
        dataset: [
            {
                source: [
                    [850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960],
                    [960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800]
                ]
            },
            { transform: { type: 'boxplot' } },
            { fromDatasetIndex: 1, fromTransformResult: 1 }
        ],
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
        series: [{ type: 'boxplot', datasetIndex: 1 }]
    };
}
