import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'large-scale-bar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Large Scale Bar Chart visualizes hundreds of series points efficiently with smooth interactive dataZoom.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LargeScaleBarDoc {
    data = Array.from({ length: 50 }, (_, i) => ({
        category: 'Day ' + (i + 1),
        value: Math.round(Math.sin(i / 5) * 50 + 60 + Math.random() * 20)
    }));

    options = {
        dataZoom: [{ type: 'inside' }, { type: 'slider', bottom: 10 }]
    };
}
