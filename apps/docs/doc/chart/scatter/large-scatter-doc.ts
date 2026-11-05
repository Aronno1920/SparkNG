import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'large-scatter-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Large Scale Scatter displays thousands of points with high-performance rendering.</p>
        </app-docsectiontext>
        <div class="card">
            <p-scatterchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LargeScatterDoc {
    data = Array.from({ length: 500 }, () => [Math.random() * 100, Math.random() * 100]);

    options = {
        series: [{ type: 'scatter', large: true, symbolSize: 4 }]
    };
}
