import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'drink-flavors-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Aroma and taste profile wheel categorized by primary and secondary flavor notes.</p>
        </app-docsectiontext>
        <div class="card">
            <p-sunburstchart [data]="data" />
        </div>
        <app-code></app-code>
    `
})
export class DrinkFlavorsDoc {
    data = [
        {
            name: 'Floral',
            children: [
                { name: 'Jasmine', value: 10 },
                { name: 'Rose', value: 12 }
            ]
        },
        {
            name: 'Fruity',
            children: [
                { name: 'Citrus', value: 18 },
                { name: 'Berry', value: 14 }
            ]
        }
    ];
}
