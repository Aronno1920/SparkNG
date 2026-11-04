import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'sunburst-visualmap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Continuous color scale applied across sunburst nodes based on numeric metric values.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SunburstVisualmapDoc {
    options = {
        visualMap: {
            type: 'continuous',
            min: 0,
            max: 100,
            inRange: { color: ['#80e5ff', '#0077b6'] }
        },
        series: {
            type: 'sunburst',
            data: [
                { name: 'Group 1', value: 80 },
                { name: 'Group 2', value: 40 },
                { name: 'Group 3', value: 95 }
            ]
        }
    };
}
