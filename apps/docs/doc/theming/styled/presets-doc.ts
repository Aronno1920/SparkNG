import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'presets-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                Aura, Material, Lara, Nora and Shadcn are the available built-in options, created to demonstrate the power of the design-agnostic theming. Aura is PrimeTek's own vision, Material follows Google Material Design v2, Lara is based on
                Bootstrap and Nora is inspired by enterprise applications. Shadcn translates the minimal design language of <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer">shadcn/ui</a> into a native preset: a neutral
                palette with a near-black primary in light mode (near-white in dark mode), subtle borders, soft shadows, a configurable radius scale and semantic accent surfaces for hover and selected states. Visit the
                <a href="https://github.com/Aronno1920/SparkNG/tree/main/packages/sparkng-themes/src/presets" target="_blank" rel="noopener noreferrer">source code</a> to learn more about the structure of presets. You may use them out of the box with
                modifications or utilize them as reference in case you need to build your own presets from scratch.
            </p>
        </app-docsectiontext>
    `
})
export class PresetsDoc {}
