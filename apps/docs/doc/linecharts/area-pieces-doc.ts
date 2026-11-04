import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'area-pieces-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p><i>areaStyle</i> accepts an array of pieces with their own ranges and colors, highlighting segments of the series individually.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', boundaryGap: false, data: hours }" [yAxis]="{ type: 'value' }" />
        </div>
        <app-code></app-code>
    `
})
export class AreaPiecesDoc {
    hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

    data = [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 650, 600, 500, 450, 400, 350];

    series = [
        {
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: [
                { opacity: 0.6, color: '#7b9ce1', offset: 0 },
                { opacity: 0.8, color: '#91cc75', offset: 6 }, // night valley
                { opacity: 0.6, color: '#7b9ce1', offset: 12 },
                { opacity: 0.8, color: '#fac858', offset: 20 }, // evening peak
                { opacity: 0.6, color: '#7b9ce1', offset: 23 }
            ],
            lineStyle: { color: '#5470c6' },
            data: this.data
        }
    ];
}
