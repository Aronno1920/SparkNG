import { AppCode } from '@/components/doc/app.code';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'line-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class UsageDoc {
    importCode: Code = {
        typescript: `// Standalone Component
import { LineChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
    };

    usageCode: Code = {
        html: `<p-linechart [data]="data" [options]="options" />`
    };
}
