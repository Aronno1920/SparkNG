<div align="center">
</div>

# @bdspark/sparkng-themes

Official themes and presets for [SparkNG](https://github.com/Aronno1920/SparkNG).

This package contains a collection of professionally designed themes and presets for SparkNG, powered by the core engine in `@bdspark/sparkng-styled`. It includes design tokens, component styles, and various aesthetic flavors to jumpstart your project.

## Features

- **Standard Presets**: Built-in presets including Aura, Lara, Nora, Material, and Shadcn.
- **Design Tokens**: Comprehensive set of tokens for colors, spacing, typography, and more.
- **Component Themes**: Fine-grained styling for over 80+ SparkNG components.
- **Extensible**: Easily extend or customize existing presets to match your brand.
- **Typed Definitions**: Full TypeScript support for all theme configurations and tokens.

## Installation

```bash
npm install @bdspark/sparkng-themes
```

## Core Presets

SparkNG Themes comes with several curated presets:

- **Aura**: A modern, sleek design with a focus on whitespace and clarity.
- **Lara**: A versatile and clean aesthetic, suitable for a wide range of applications.
- **Nora**: A distinct look with unique design choices for modern interfaces.
- **Material**: Follows Material Design principles for a familiar and functional UI.
- **Shadcn**: The minimal design language of [shadcn/ui](https://ui.shadcn.com/) — neutral palette, near-black primary in light mode (near-white in dark mode), subtle borders, soft shadows, and a radius scale derived from a single base. Complete light and dark mode support.

## Usage

### Shadcn Quick Start

```typescript
import { provideSpark } from '@bdspark/sparkng/config';
import Shadcn from '@bdspark/sparkng-themes/shadcn';

bootstrapApplication(AppComponent, {
    providers: [
        provideSpark({
            theme: {
                preset: Shadcn,
                options: {
                    // shadcn convention is a `.dark` class; any selector works
                    darkModeSelector: '.dark'
                }
            }
        })
    ]
});
```

### Using a Preset

You can apply a preset globally using the `definePreset` utility:

```typescript
import { definePreset } from '@bdspark/sparkng-themes';
import Aura from '@bdspark/sparkng-themes/aura';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            // ...
            950: '{blue.950}'
        }
    }
});
```

### Direct Token Access

Access design tokens directly for use in your own styled components:

```typescript
import { tokens } from '@bdspark/sparkng-themes/tokens';

const primaryColor = tokens['primary.color'];
```

## Usage in SparkNG

This package is the primary source of themes for `@bdspark/sparkng`. It provides the visual layer that brings components to life. Use this package when you want to switch between official themes or create a custom theme based on one of the existing presets.

## License

MIT
