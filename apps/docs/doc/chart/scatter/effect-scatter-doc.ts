import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'effect-scatter-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Points rendered with animated expanding ripple rings for landmark or hotspot emphasis.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class EffectScatterDoc {
    options = {
        xAxis: { scale: true },
        yAxis: { scale: true },
        series: [
            {
                type: 'effectScatter',
                symbolSize: 20,
                rippleEffect: { brushType: 'stroke' },
                data: [
                    [10.0, 8.04],
                    [8.0, 6.95],
                    [13.0, 7.58],
                    [9.0, 8.81],
                    [11.0, 8.33]
                ]
            }
        ]
    };
}
