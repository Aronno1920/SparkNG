import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'richtext-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>
                SparkNG Chart labels support rich text: a formatter combines named style tokens (written as <i>styleName|text</i> wrapped in curly braces) and the <i>rich</i> map styles each fragment separately — fonts, colors, alignment and padding
                per token. The gauge detail below composes a big value, a unit and a description line from three tokens.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-gaugechart [value]="72" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class RichTextDoc {
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
