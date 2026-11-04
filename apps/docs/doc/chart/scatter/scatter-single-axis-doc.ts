import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'scatter-single-axis-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Scatter plot mapped onto a single categorical timeline axis.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterSingleAxisDoc {
    options = {
        singleAxis: { type: 'time', bottom: 50 },
        series: [
            {
                coordinateSystem: 'singleAxis',
                type: 'scatter',
                data: [
                    ['2024-01-01', 12],
                    ['2024-02-01', 24],
                    ['2024-03-01', 18],
                    ['2024-04-01', 32]
                ],
                symbolSize: (dataItem: any[]) => dataItem[1]
            }
        ]
    };
}
