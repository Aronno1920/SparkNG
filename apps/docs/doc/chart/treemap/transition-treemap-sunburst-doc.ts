import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'transition-treemap-sunburst-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Morphs hierarchical nodes seamlessly between Cartesian treemaps and radial sunburst rings.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treemapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class TransitionTreemapSunburstDoc {
    options = {
        series: [
            {
                type: 'treemap',
                data: [
                    {
                        name: 'Alpha',
                        value: 60,
                        children: [
                            { name: 'A1', value: 35 },
                            { name: 'A2', value: 25 }
                        ]
                    },
                    { name: 'Beta', value: 40 }
                ]
            }
        ]
    };
}
