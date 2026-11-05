import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'clustering-process-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Clustering Process visualizes cluster groups and centroids.</p>
        </app-docsectiontext>
        <div class="card">
            <p-scatterchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ClusteringProcessDoc {
    data = [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.03, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.08, 4.82],
        [5.0, 5.68]
    ];

    options = {
        xAxis: { scale: true },
        yAxis: { scale: true }
    };
}
