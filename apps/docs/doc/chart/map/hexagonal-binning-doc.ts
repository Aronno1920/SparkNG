import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'hexagonal-binning-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Hexagonal Binning aggregates spatial density into uniform hexagonal choropleth cells.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class HexagonalBinningDoc {
    options = {
        xAxis: { scale: true },
        yAxis: { scale: true },
        series: [
            {
                type: 'scatter',
                symbol: 'polygon',
                symbolSize: 18,
                data: [
                    [1, 1],
                    [1.5, 1.8],
                    [2, 1],
                    [2.5, 1.8],
                    [3, 1]
                ]
            }
        ]
    };
}
