import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'stacked-bar-border-radius-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Stacked bars with rounded top corners for a modern, tactile aesthetic.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [xAxis]="xAxis" />
        </div>
        <app-code></app-code>
    `
})
export class StackedBarBorderRadiusDoc {
    xAxis = { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'] };

    series = [
        { name: 'Internal', type: 'bar', stack: 'total', data: [320, 302, 301, 334] },
        {
            name: 'External',
            type: 'bar',
            stack: 'total',
            itemStyle: { borderRadius: [8, 8, 0, 0] },
            data: [120, 132, 101, 134]
        }
    ];
}
