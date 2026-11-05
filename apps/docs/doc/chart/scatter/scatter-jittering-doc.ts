import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'scatter-jittering-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Scatter with Jittering disperses overlapping discrete observations for clear density visibility.</p>
        </app-docsectiontext>
        <div class="card">
            <p-scatterchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterJitteringDoc {
    data = [
        [1 + (Math.random() - 0.5) * 0.2, 5],
        [1 + (Math.random() - 0.5) * 0.2, 5.2],
        [1 + (Math.random() - 0.5) * 0.2, 4.8],
        [2 + (Math.random() - 0.5) * 0.2, 8],
        [2 + (Math.random() - 0.5) * 0.2, 8.4],
        [2 + (Math.random() - 0.5) * 0.2, 7.9],
        [3 + (Math.random() - 0.5) * 0.2, 6],
        [3 + (Math.random() - 0.5) * 0.2, 6.3],
        [3 + (Math.random() - 0.5) * 0.2, 5.8]
    ];

    options = {
        xAxis: { min: 0.5, max: 3.5 },
        yAxis: { scale: true }
    };
}
