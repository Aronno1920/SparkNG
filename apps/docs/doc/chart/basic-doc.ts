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
            <p>
                Each chart type has a dedicated component with typed inputs. A line chart only needs <i>data</i> and the category axis labels; colors, fonts and tooltips automatically follow the active SparkNG theme. Any chart option can still be
                passed through <i>options</i> for fine tuning.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-linechart [data]="sales" [xAxis]="{ type: 'category', data: months }" />
        </div>
        <app-code></app-code>
    `
})
export class BasicDoc {
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    sales = [540, 325, 702, 620, 831, 715, 902];
}
