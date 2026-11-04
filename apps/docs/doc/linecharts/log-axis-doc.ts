import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'log-axis-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Exponential growth reads correctly on a logarithmic axis — the same data would be unreadable on a linear scale.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', boundaryGap: false, data: xs }" [yAxis]="{ type: 'log', name: 'log(y)', minorSplitLine: { show: true } }" [tooltip]="{ trigger: 'axis' }" />
        </div>
        <app-code></app-code>
    `
})
export class LogAxisDoc {
    xs = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

    series = [
        {
            name: '2^n',
            type: 'line',
            data: [1, 2, 4, 8, 16, 32, 64, 128, 256]
        },
        {
            name: '10^n',
            type: 'line',
            data: [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000]
        }
    ];
}
