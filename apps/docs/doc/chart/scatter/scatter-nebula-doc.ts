import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'scatter-nebula-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Scatter Nebula plots multi-cluster radial galaxy distributions with color gradients.</p>
        </app-docsectiontext>
        <div class="card">
            <p-scatterchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterNebulaDoc {
    data = Array.from({ length: 150 }, () => {
        const r = Math.random() * 50;
        const theta = Math.random() * 2 * Math.PI;
        return [r * Math.cos(theta), r * Math.sin(theta)];
    });

    options = {
        xAxis: { splitLine: { show: false } },
        yAxis: { splitLine: { show: false } }
    };
}
