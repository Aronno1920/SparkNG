import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'marklines-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p><i>markLine</i> annotates thresholds and averages while <i>markPoint</i> pins the extremes — here for the highest and lowest monthly revenue.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [series]="series" [xAxis]="{ type: 'category', data: months }" [yAxis]="{ type: 'value' }" [tooltip]="{ trigger: 'axis' }" />
        </div>
        <app-code></app-code>
    `
})
export class MarklinesDoc {
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    data = [320, 332, 301, 334, 390, 330, 320, 356, 402, 387, 361, 399];

    series = [
        {
            name: 'Revenue',
            type: 'line',
            data: this.data,
            markPoint: {
                data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                ]
            },
            markLine: {
                data: [
                    { type: 'average', name: 'Avg' },
                    { yAxis: 400, name: 'Target', lineStyle: { color: '#9b2f2f' } }
                ]
            }
        }
    ];
}
