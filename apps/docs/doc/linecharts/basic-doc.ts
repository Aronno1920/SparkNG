import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A basic line chart binds a data array to the typed <i>LineChart</i> component; axes and theming are provided by default.</p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [data]="data" [xAxis]="{ type: 'category', data: days }" />
        </div>
        <app-code></app-code>
    `
})
export class BasicDoc {
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    data = [150, 230, 224, 218, 135, 147, 260];
}
