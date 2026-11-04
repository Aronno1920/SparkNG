import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'life-expectancy-gdp-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Global life expectancy plotted against per-capita GDP.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LifeExpectancyGdpDoc {
    options = {
        xAxis: { type: 'value', name: 'GDP ($)' },
        yAxis: { type: 'value', name: 'Years' },
        series: [
            {
                type: 'scatter',
                data: [
                    [12000, 72],
                    [24000, 78],
                    [48000, 82],
                    [6000, 64]
                ]
            }
        ]
    };
}
