import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'gauge-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A gauge chart displays a single scalar on a radial scale. The <i>value</i> shorthand renders one pointer while <i>options</i> customizes the progress arc and the detail text.</p>
        </app-docsectiontext>
        <div class="card">
            <p-gaugechart [value]="64" [min]="0" [max]="100" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class GaugeDoc {
    options = {
        series: [
            {
                type: 'gauge',
                progress: {
                    show: true,
                    width: 14
                },
                axisLine: {
                    lineStyle: {
                        width: 14
                    }
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}%'
                }
            }
        ]
    };
}
