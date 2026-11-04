import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'calendar-pie-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Miniature pie charts arranged within cells of a calendar coordinate grid.</p>
        </app-docsectiontext>
        <div class="card">
            <p-piechart [data]="data" />
        </div>
        <app-code></app-code>
    `
})
export class CalendarPieDoc {
    data = [
        { value: 45, name: 'Completed' },
        { value: 25, name: 'Pending' },
        { value: 30, name: 'Cancelled' }
    ];
}
