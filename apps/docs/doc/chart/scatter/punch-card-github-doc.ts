import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'punch-card-github-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Punch Card of GitHub shows commit frequencies as variable-sized scatter symbols by day and hour.</p>
        </app-docsectiontext>
        <div class="card">
            <p-scatterchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PunchCardGithubDoc {
    data = [
        [0, 1, 5],
        [1, 2, 8],
        [2, 3, 12],
        [3, 4, 15],
        [4, 5, 20],
        [5, 6, 4],
        [6, 0, 2]
    ];

    options = {
        xAxis: { type: 'category', data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
        yAxis: { type: 'category', data: ['Morning', 'Afternoon', 'Evening', 'Night'] },
        series: [
            {
                type: 'scatter',
                symbolSize: (val: any) => val[2] * 2
            }
        ]
    };
}
