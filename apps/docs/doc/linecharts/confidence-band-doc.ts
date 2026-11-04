import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'confidence-band-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A confidence band is drawn with two stacked boundary lines: the band series carries the confidence width and the line series subtracts it back, leaving a shaded uncertainty range around the estimate.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', boundaryGap: false, data: xs }" [yAxis]="yAxis" [tooltip]="{ trigger: 'axis' }" />
        </div>
        <app-code></app-code>
    `
})
export class ConfidenceBandDoc {
    xs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    estimate = [26, 29, 31, 33, 34, 35, 35.5, 36, 36.5, 36.8, 37, 37.2];

    confidence = [2, 2.4, 2.6, 2.9, 3.1, 3.2, 3.2, 3.1, 3.0, 2.9, 2.8, 2.7];

    yAxis = { type: 'value', min: (value: { min: number }) => Math.floor(value.min - 5) };

    lower = this.estimate.map((v, i) => +(v - this.confidence[i]).toFixed(1));

    band = this.estimate.map((v, i) => +(this.confidence[i] * 2).toFixed(1));

    series = [
        {
            name: 'L',
            type: 'line',
            stack: 'band',
            data: this.lower,
            lineStyle: { opacity: 0 },
            symbol: 'none'
        },
        {
            name: 'Confidence',
            type: 'line',
            stack: 'band',
            data: this.band,
            lineStyle: { opacity: 0 },
            areaStyle: { color: '#ccc' },
            symbol: 'none'
        },
        {
            name: 'Estimate',
            type: 'line',
            data: this.estimate,
            symbolSize: 6,
            lineStyle: { width: 3 }
        }
    ];
}
