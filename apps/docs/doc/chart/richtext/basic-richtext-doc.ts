import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-richtext-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Basic Rich Text styles different fragments of labels using token formatters and custom rich styles.</p>
        </app-docsectiontext>
        <div class="card">
            <p-gaugechart [value]="72" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BasicRichTextDoc {
    options = {
        series: [
            {
                type: 'gauge',
                progress: { show: true, width: 12 },
                axisLine: { lineStyle: { width: 12 } },
                detail: {
                    formatter: '{value|72}\n{unit|km/h}\n{desc|current speed}',
                    offsetCenter: [0, '62%'],
                    rich: {
                        value: { fontSize: 42, fontWeight: 'bolder' },
                        unit: { fontSize: 16, padding: [4, 0, 0, 0] },
                        desc: { fontSize: 13, padding: [10, 0, 0, 0], color: '#999' }
                    }
                }
            }
        ]
    };
}
