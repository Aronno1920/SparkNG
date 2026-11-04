import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-radar-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Multi-variable radar polygon comparing allocated budget against actual spending.</p>
        </app-docsectiontext>
        <div class="card">
            <p-radarchart [indicator]="indicators" [data]="data" />
        </div>
        <app-code></app-code>
    `
})
export class BasicRadarDoc {
    indicators = [
        { name: 'Sales', max: 6500 },
        { name: 'Administration', max: 16000 },
        { name: 'Information Tech', max: 30000 },
        { name: 'Customer Support', max: 38000 },
        { name: 'Development', max: 52000 },
        { name: 'Marketing', max: 25000 }
    ];

    data = [
        { value: [4200, 3000, 20000, 35000, 50000, 18000], name: 'Allocated Budget' },
        { value: [5000, 14000, 28000, 26000, 42000, 21000], name: 'Actual Spending' }
    ];
}
