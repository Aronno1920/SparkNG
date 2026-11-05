import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-parallel-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Basic parallel coordinates: three products flow across price, net weight, amount and a categorical score axis with 4px lines.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BasicParallelDoc {
    options = {
        parallelAxis: [
            { dim: 0, name: 'Price' },
            { dim: 1, name: 'Net Weight' },
            { dim: 2, name: 'Amount' },
            {
                dim: 3,
                name: 'Score',
                type: 'category',
                data: ['Excellent', 'Good', 'OK', 'Bad']
            }
        ],
        series: {
            type: 'parallel',
            lineStyle: {
                width: 4
            },
            data: [
                [12.99, 100, 82, 'Good'],
                [9.99, 80, 77, 'OK'],
                [20, 120, 60, 'Excellent']
            ]
        }
    };
}
