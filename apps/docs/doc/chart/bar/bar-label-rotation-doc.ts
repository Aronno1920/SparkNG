import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-label-rotation-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Rotates categorical column labels to prevent overlapping in dense charts.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [xAxis]="xAxis" />
        </div>
        <app-code></app-code>
    `
})
export class BarLabelRotationDoc {
    xAxis = {
        type: 'category',
        data: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums', 'Peaches', 'Cherries'],
        axisLabel: { rotate: 45 }
    };

    series = [
        {
            name: 'Yield',
            type: 'bar',
            data: [320, 240, 190, 390, 210, 310, 280]
        }
    ];
}
