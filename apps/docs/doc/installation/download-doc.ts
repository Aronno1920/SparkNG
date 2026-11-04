import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'download-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                Prefer to wire things up yourself? Install the packages from the <a href="https://www.npmjs.com/package/@bdspark/sparkng" target="_blank" rel="noopener noreferrer">npm registry</a> directly. The next section covers the provider setup
                that <i>ng add</i> would have written for you.
            </p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
        <app-docsectiontext>
            <p>To use SparkNG chart components, install the charting engine package <i>@bdspark/sparkng-charts</i>:</p>
        </app-docsectiontext>
        <app-code [code]="chartsCode" [hideToggleCode]="true"></app-code>
    `
})
export class DownloadDoc {
    code: Code = {
        command: `# Using npm
npm install @bdspark/sparkng @bdspark/sparkng-themes

# Using yarn
yarn add @bdspark/sparkng @bdspark/sparkng-themes

# Using pnpm
pnpm add @bdspark/sparkng @bdspark/sparkng-themes`
    };

    chartsCode: Code = {
        command: `# Using npm
npm install @bdspark/sparkng-charts

# Using yarn
yarn add @bdspark/sparkng-charts

# Using pnpm
pnpm add @bdspark/sparkng-charts`
    };
}
