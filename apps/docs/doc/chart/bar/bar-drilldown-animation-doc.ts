import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-drilldown-animation-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Bar Chart Drilldown Animation demonstrates multi-tier drilldown navigation with animated transitions.</p>
        </app-docsectiontext>
        <div class="card">
            <p-barchart [data]="data" [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BarDrilldownAnimationDoc {
    data = [
        { category: 'Electronics', value: 450 },
        { category: 'Apparel', value: 280 },
        { category: 'Home Goods', value: 310 },
        { category: 'Groceries', value: 520 }
    ];

    options = {
        animationDurationUpdate: 500,
        universalTransition: true
    };
}
