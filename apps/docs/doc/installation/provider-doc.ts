import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'provider-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                Add <i>provideSpark</i> to the list of providers in your <i>app.config.ts</i> and use the <i>theme</i> property to configure a theme such as Aura. Any built-in preset can be swapped the same way, for example the minimal
                <i>shadcn</i> theme is available as <i>&#64;bdspark/sparkng-themes/shadcn</i>.
            </p>
            <app-code [code]="code" [hideToggleCode]="true"></app-code>
        </app-docsectiontext>
    `
})
export class ProviderDoc {
    code: Code = {
        typescript: `import { ApplicationConfig } from '@angular/core';
import { provideSpark } from '@bdspark/sparkng/config';
import Aura from '@bdspark/sparkng-themes/aura';

export const appConfig: ApplicationConfig = {
    providers: [
        provideSpark({
            theme: {
                preset: Aura
            }
        })
    ]
};`
    };
}
