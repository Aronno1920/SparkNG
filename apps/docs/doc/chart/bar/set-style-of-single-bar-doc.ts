import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'set-style-of-single-bar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A single data item is passed as an object with its own <i>itemStyle</i> to override the color of one bar.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [series]="series" [xAxis]="xAxis" [yAxis]="yAxis" />
        </div>
        <app-code></app-code>
    `
})
export class SetStyleOfSingleBarDoc {
    xAxis = { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] };

    yAxis = { type: 'value' };

    series = [
        {
            data: [
                120,
                {
                    value: 200,
                    itemStyle: {
                        color: '#505372'
                    }
                },
                150,
                80,
                70,
                110,
                130
            ],
            type: 'bar'
        }
    ];
}
