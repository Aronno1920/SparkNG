import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'gradient-edge-sankey-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Flow bands rendered with smooth source-to-target color gradients.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class GradientEdgeSankeyDoc {
    options = {
        series: {
            type: 'sankey',
            lineStyle: { color: 'gradient', curveness: 0.5 },
            data: [{ name: 'Step 1' }, { name: 'Step 2' }],
            links: [{ source: 'Step 1', target: 'Step 2', value: 15 }]
        }
    };
}
