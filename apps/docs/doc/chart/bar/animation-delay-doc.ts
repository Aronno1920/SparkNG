import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'animation-delay-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Staggers bar entrance animations across index positions.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class AnimationDelayDoc {
    options = {
        xAxis: { type: 'category', data: ['1', '2', '3', '4', '5', '6', '7', '8'] },
        yAxis: { type: 'value' },
        series: [
            {
                name: 'Bar A',
                type: 'bar',
                data: [100, 140, 80, 120, 150, 110, 190, 130],
                animationDelay: (idx: number) => idx * 100
            }
        ],
        animationEasing: 'elasticOut'
    };
}
