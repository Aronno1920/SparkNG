import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'pie-richtext-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Pie Rich Text formats segment callout labels with titles, subtitles, percentages, and background tags.</p>
        </app-docsectiontext>
        <div class="card">
            <p-piechart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PieRichTextDoc {
    data = [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
    ];

    options = {
        series: [
            {
                type: 'pie',
                radius: '60%',
                label: {
                    formatter: '{title|{b}}\n{hr|}\n{rate|{d}%}',
                    rich: {
                        title: { fontSize: 14, lineHeight: 20, align: 'center' },
                        hr: { borderColor: '#ccc', width: '100%', borderWidth: 0.5, height: 0 },
                        rate: { fontSize: 12, color: '#999', lineHeight: 18, align: 'center' }
                    }
                }
            }
        ]
    };
}
