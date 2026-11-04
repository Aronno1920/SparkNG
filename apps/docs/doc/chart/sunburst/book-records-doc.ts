import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'book-records-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Library inventory hierarchy classified by genre, author, and book title.</p>
        </app-docsectiontext>
        <div class="card">
            <p-sunburstchart [data]="data" />
        </div>
        <app-code></app-code>
    `
})
export class BookRecordsDoc {
    data = [
        {
            name: 'Fiction',
            children: [
                { name: 'Sci-Fi', value: 30 },
                { name: 'Fantasy', value: 25 }
            ]
        },
        {
            name: 'Non-Fiction',
            children: [
                { name: 'Biography', value: 15 },
                { name: 'Science', value: 20 }
            ]
        }
    ];
}
