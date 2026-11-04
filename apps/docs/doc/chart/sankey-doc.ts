import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'sankey-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A sankey chart visualizes flow volumes between <i>nodes</i> through weighted <i>links</i> — ideal for funnels across stages that do not strictly narrow.</p>
        </app-docsectiontext>
        <div class="card">
            <p-sankeychart [nodes]="nodes" [links]="links" />
        </div>
        <app-code></app-code>
    `
})
export class SankeyDoc {
    nodes = [{ name: 'Visit' }, { name: 'Signup' }, { name: 'Trial' }, { name: 'Onboarding' }, { name: 'Subscribe' }, { name: 'Churn' }];

    links = [
        { source: 'Visit', target: 'Signup', value: 320 },
        { source: 'Signup', target: 'Trial', value: 240 },
        { source: 'Trial', target: 'Onboarding', value: 160 },
        { source: 'Trial', target: 'Churn', value: 80 },
        { source: 'Onboarding', target: 'Subscribe', value: 110 },
        { source: 'Onboarding', target: 'Churn', value: 50 }
    ];
}
