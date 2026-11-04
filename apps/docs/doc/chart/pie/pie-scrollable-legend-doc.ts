import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'pie-scrollable-legend-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Pie chart paired with a vertical scrolling pagination legend for many items.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PieScrollableLegendDoc {
    options = {
        tooltip: { trigger: 'item' },
        legend: { type: 'scroll', orient: 'vertical', right: 10, top: 20, bottom: 20 },
        series: [
            {
                name: 'Country',
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: [
                    { name: 'USA', value: 320 },
                    { name: 'Canada', value: 140 },
                    { name: 'Mexico', value: 110 },
                    { name: 'UK', value: 95 },
                    { name: 'Germany', value: 85 },
                    { name: 'France', value: 80 },
                    { name: 'Japan', value: 75 }
                ]
            }
        ]
    };
}
