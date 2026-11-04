import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'time-axis-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>With a <i>time</i> axis the x values are timestamps, so irregular intervals are spaced correctly and the labels format themselves.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'time' }" [yAxis]="{ type: 'value' }" [tooltip]="{ trigger: 'axis' }" />
        </div>
        <app-code></app-code>
    `
})
export class TimeAxisDoc {
    base = +new Date(2025, 5, 5);

    series = [
        {
            name: 'Downloads',
            type: 'line',
            showSymbol: false,
            data: [
                [+new Date(2025, 5, 5), 300],
                [+new Date(2025, 5, 6), 420],
                [+new Date(2025, 5, 8), 380],
                [+new Date(2025, 5, 9), 510],
                [+new Date(2025, 5, 12), 470],
                [+new Date(2025, 5, 13), 620],
                [+new Date(2025, 5, 17), 590]
            ]
        }
    ];
}
