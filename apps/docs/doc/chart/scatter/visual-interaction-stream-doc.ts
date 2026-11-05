import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'visual-interaction-stream-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Visual Interaction Stream provides brush selection and real-time filtering across scatter series.</p>
        </app-docsectiontext>
        <div class="card">
            <p-scatterchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class VisualInteractionStreamDoc {
    data = [
        [10, 20],
        [15, 35],
        [25, 45],
        [30, 25],
        [40, 60],
        [50, 55],
        [60, 80]
    ];

    options = {
        brush: { toolbox: ['rect', 'polygon', 'clear'] }
    };
}
