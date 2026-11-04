import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'boxplot-light-velocity-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Michelson-Morley speed of light experimental runs across five trial batches.</p>
        </app-docsectiontext>
        <div class="card">
            <p-boxplotchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BoxplotLightVelocityDoc {
    options = {
        title: { text: 'Michelson-Morley Experiment' },
        xAxis: { type: 'category', data: ['Exp 1', 'Exp 2', 'Exp 3', 'Exp 4', 'Exp 5'] },
        yAxis: { type: 'value', min: 600 },
        series: [
            {
                name: 'boxplot',
                type: 'boxplot',
                data: [
                    [650, 850, 940, 980, 1070],
                    [760, 800, 845, 885, 960],
                    [620, 840, 855, 880, 970],
                    [720, 760, 815, 870, 920],
                    [740, 800, 810, 870, 950]
                ]
            }
        ]
    };
}
