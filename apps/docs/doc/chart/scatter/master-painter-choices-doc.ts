import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'master-painter-choices-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Master Painter Color Choices Throughout History plots historical art palettes across time and hue.</p>
        </app-docsectiontext>
        <div class="card">
            <p-scatterchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MasterPainterChoicesDoc {
    data = [
        [1500, 45, 12],
        [1600, 60, 18],
        [1700, 52, 15],
        [1800, 75, 24],
        [1900, 88, 30]
    ];

    options = {
        xAxis: { name: 'Year' },
        yAxis: { name: 'Hue' },
        series: [{ type: 'scatter', symbolSize: (val: any) => val[2] }]
    };
}
