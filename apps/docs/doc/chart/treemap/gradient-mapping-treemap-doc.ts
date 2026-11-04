import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'gradient-mapping-treemap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Maps color gradients across depth levels to visually indicate value magnitude.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treemapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class GradientMappingTreemapDoc {
    options = {
        series: [
            {
                type: 'treemap',
                levels: [{ itemStyle: { borderColor: '#555', borderWidth: 4, gapWidth: 4 } }, { colorSaturation: [0.35, 0.5], itemStyle: { gapWidth: 1, borderColorSaturation: 0.6 } }],
                data: [
                    { name: 'North', value: 45 },
                    { name: 'South', value: 75 },
                    { name: 'East', value: 60 }
                ]
            }
        ]
    };
}
