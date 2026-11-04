import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'customized-radar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Circular radar shape featuring custom line styling and area gradient color fills.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class CustomizedRadarDoc {
    options = {
        radar: {
            shape: 'circle',
            indicator: [
                { name: 'Attack', max: 100 },
                { name: 'Defense', max: 100 },
                { name: 'Speed', max: 100 },
                { name: 'Stamina', max: 100 },
                { name: 'Technique', max: 100 }
            ]
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [80, 70, 90, 85, 75],
                        name: 'Player Stats',
                        areaStyle: { color: 'rgba(99, 102, 241, 0.4)' }
                    }
                ]
            }
        ]
    };
}
