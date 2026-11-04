import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'chart-pt-viewer',
    standalone: true,
    imports: [AppDocPtViewer, ChartModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-barchart [data]="sales" [xAxis]="{ type: 'category', data: quarters }" class="w-full md:w-[30rem]" />
        </app-docptviewer>
    `
})
export class PTViewer {
    quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

    sales = [540, 325, 702, 620];

    docs = [
        {
            data: getPTOptions('Chart'),
            key: 'Chart'
        }
    ];
}
