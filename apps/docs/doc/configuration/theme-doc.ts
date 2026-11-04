import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'theme-doc',
    standalone: true,
    imports: [RouterModule, AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>SparkNG provides 5 predefined themes out of the box; Aura, Material, Lara, Nora and Shadcn. See the <a routerLink="/theming">theming</a> documentation for details.</p>
        </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class ThemeDoc {
    code: Code = {
        typescript: `import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideSpark } from '@bdspark/sparkng/config';

import Aura from '@bdspark/sparkng-themes/aura';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        provideSpark({
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: 'system',
                    cssLayer: false
                }
            }
        })
    ]
};`
    };
}
