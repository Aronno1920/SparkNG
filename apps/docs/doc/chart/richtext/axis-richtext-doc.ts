import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'axis-richtext-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Axis Rich Text formats category axis labels with styled badges, custom borders, and icons.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class AxisRichTextDoc {
    data = [
        { category: 'Alpha', value: 120 },
        { category: 'Beta', value: 200 },
        { category: 'Gamma', value: 150 },
        { category: 'Delta', value: 80 }
    ];

    options = {
        xAxis: {
            axisLabel: {
                formatter: (value: string) => '{badge|' + value + '}',
                rich: {
                    badge: {
                        backgroundColor: '#e0f2fe',
                        color: '#0369a1',
                        borderRadius: 4,
                        padding: [3, 8],
                        fontWeight: '600'
                    }
                }
            }
        }
    };
}
