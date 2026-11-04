import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'chart-installation-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>SparkNG chart components are powered by the <i>@bdspark/sparkng-charts</i> engine package, bundled with zero runtime dependencies. Install it in your project using your preferred package manager:</p>
        </app-docsectiontext>
        <app-code [code]="installCode" [hideToggleCode]="true"></app-code>
    `
})
export class InstallationDoc {
    installCode: Code = {
        command: `# Using npm
npm install @bdspark/sparkng-charts

# Using yarn
yarn add @bdspark/sparkng-charts

# Using pnpm
pnpm add @bdspark/sparkng-charts`
    };
}
