import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'shadcn-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                <i>Shadcn</i> is the fifth built-in preset, translating the minimal design language of <a href="https://ui.shadcn.com/" target="_blank" rel="noopener noreferrer">shadcn/ui</a> into a native SparkNG theme. It ships as a neutral
                palette: a near-black primary with white contrast color in light mode and the inverse pair in dark mode, subtle borders, soft shadows, muted hover surfaces and a radius scale derived from a single <i>--radius</i> base like the
                original. The preset is distributed in the <i>&#64;bdspark/sparkng-themes</i> package and imported from the <i>shadcn</i> namespace.
            </p>
        </app-docsectiontext>
        <app-docsectiontext>
            <h3>Setup</h3>
            <p>Pass the preset to the <i>theme.presets</i> configuration. When using the CLI, <i>ng add &#64;bdspark/sparkng --theme=Shadcn</i> wires this automatically, the option is also available in the interactive prompt.</p>
        </app-docsectiontext>
        <app-code [code]="setup" [hideToggleCode]="true" class="block mb-4"></app-code>
        <app-docsectiontext>
            <h3>Dark Mode</h3>
            <p>
                Both color schemes are first-class citizens of the preset; light mode renders white surfaces with a <i>#171717</i> primary whereas dark mode renders <i>#171717</i> cards on a <i>#0a0a0a</i> page with a light primary. If your
                application follows the shadcn convention of a <i>.dark</i> class, align the <i>darkModeSelector</i> with it.
            </p>
        </app-docsectiontext>
        <app-code [code]="darkmode" [hideToggleCode]="true" class="block mb-4"></app-code>
        <app-docsectiontext>
            <h3>Brand Color</h3>
            <p>
                The default primary is neutral, however a colored brand palette is a common requirement. Shadcn base colors map their hue to <i>primary-700</i> in light and <i>primary-500</i> in dark mode, the example below applies this convention to
                <i>violet</i> using <i>definePreset</i>.
            </p>
        </app-docsectiontext>
        <app-code [code]="brand" [hideToggleCode]="true" class="block mb-4"></app-code>
        <app-docsectiontext>
            <h3>Radius Scale</h3>
            <p>The theme derives its whole radius scale from a 10px base, the equivalent of the <i>--radius</i> token of shadcn/ui. Use <i>updatePreset</i> to retune the scale globally, for example a rounder 12px base.</p>
        </app-docsectiontext>
        <app-code [code]="radius" [hideToggleCode]="true" class="block mb-4"></app-code>
        <app-docsectiontext>
            <h3>Token Reference</h3>
            <p>
                The semantic mapping below describes the resolved values of the core tokens in both schemes. Hover states of primary actions use 90% opacity blends, the equivalent of <i>bg-primary/90</i>, implemented with <i>color-mix</i> so they
                follow any palette swap.
            </p>
            <ul class="leading-normal m-0 p-0 list-none">
                <li>• <b>Background</b>: #ffffff light, #0a0a0a dark (inputs) • <b>Card / Popover</b>: #ffffff light, #171717 dark</li>
                <li>• <b>Foreground</b>: #0a0a0a light, #fafafa dark • <b>Muted Foreground</b>: #737373 light, #a3a3a3 dark</li>
                <li>• <b>Primary</b>: #171717 light, #e5e5e5 dark • <b>Secondary / Muted / Accent</b>: #f5f5f5 light, #262626 dark</li>
                <li>• <b>Border</b>: #e5e5e5 light, white 10% dark • <b>Input</b>: #e5e5e5 light, white 15% dark</li>
                <li>• <b>Destructive</b>: red-600 light, red-400 dark • <b>Ring</b>: 3px halo at 50% neutral-400</li>
                <li>• <b>Radius</b>: xs 4px • sm 6px • md 8px (controls) • lg 10px (dialogs) • xl 14px (cards)</li>
            </ul>
        </app-docsectiontext>
    `
})
export class ShadcnDoc {
    setup: Code = {
        typescript: `import { provideSpark } from '@bdspark/sparkng/config';
import Shadcn from '@bdspark/sparkng-themes/shadcn';

bootstrapApplication(AppComponent, {
    providers: [
        provideSpark({
            theme: {
                preset: Shadcn
            }
        })
    ]
});`
    };

    darkmode: Code = {
        typescript: `provideSpark({
    theme: {
        preset: Shadcn,
        options: {
            darkModeSelector: '.dark'
        }
    }
})`
    };

    brand: Code = {
        typescript: `import { definePreset } from '@bdspark/sparkng-themes';
import Shadcn from '@bdspark/sparkng-themes/shadcn';

const Violet = definePreset(Shadcn, {
    semantic: {
        primary: {
            50: '{violet.50}',
            100: '{violet.100}',
            200: '{violet.200}',
            300: '{violet.300}',
            400: '{violet.400}',
            500: '{violet.500}',
            600: '{violet.600}',
            700: '{violet.700}',
            800: '{violet.800}',
            900: '{violet.900}',
            950: '{violet.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{primary.700}',
                    contrastColor: '#ffffff',
                    hoverColor: '{primary.800}',
                    activeColor: '{primary.900}'
                }
            },
            dark: {
                primary: {
                    color: '{primary.500}',
                    contrastColor: '{surface.950}',
                    hoverColor: '{primary.400}',
                    activeColor: '{primary.300}'
                }
            }
        }
    }
});

// use it like any other preset
provideSpark({ theme: { preset: Violet } });`
    };

    radius: Code = {
        typescript: `import { updatePreset } from '@bdspark/sparkng-themes';

// default base is 10px (the --radius equivalent), scales at 0.6/0.8/1/1.4
updatePreset({
    primitive: {
        borderRadius: {
            none: '0',
            xs: '5px',
            sm: '7px',
            md: '10px',
            lg: '12px',
            xl: '17px'
        }
    }
});`
    };
}
