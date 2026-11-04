import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'show-parent-labels-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Displays parent category banner headers over nested child rectangle groups.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treemapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ShowParentLabelsDoc {
    options = {
        series: [
            {
                type: 'treemap',
                upperLabel: { show: true, height: 30 },
                itemStyle: { borderColor: '#fff' },
                data: [
                    {
                        name: 'Hardware',
                        value: 100,
                        children: [
                            { name: 'CPU', value: 40 },
                            { name: 'GPU', value: 60 }
                        ]
                    }
                ]
            }
        ]
    };
}
