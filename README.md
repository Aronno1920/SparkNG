<div align="center">


# SparkNG

**A community-maintained, MIT licensed suite of 80+ accessible Angular UI components.**

[![npm](https://img.shields.io/npm/v/@bdspark/sparkng.svg?color=%23000)](https://www.npmjs.com/package/@bdspark/sparkng)
[![license](https://img.shields.io/badge/license-MIT-black.svg)](LICENSE.md)
[![angular](https://img.shields.io/badge/angular-%3E%3D21-black.svg)](https://angular.dev)

[Documentation](https://sparkng.bdspark.com) · [Getting started](https://sparkng.bdspark.com/installation) · [Migrating from PrimeNG](https://sparkng.bdspark.com/migration/primeng) · [Philosophy](https://sparkng.bdspark.com/philosophy) · [FAQ](https://sparkng.bdspark.com/faq)

</div>

---

## Why this exists

In June 2026 PrimeTek archived the PrimeNG repository and moved future major versions, starting with v22, to a commercial license — [their announcement explains why](https://primeui.dev/nextchapter). That left a lot of applications on a library with no further open source releases.

SparkNG is a community fork of PrimeNG v21, the last MIT licensed version, maintained by bdSpark and the community. It stays MIT. There is no paid tier and none is planned.

It is not affiliated with, endorsed by, or sponsored by PrimeTek. The [philosophy page](https://sparkng.bdspark.com/philosophy) sets out what the project commits to and — just as importantly — what it does not do.

## Quick start

```bash
ng add @bdspark/sparkng
```

The schematic asks which theme preset you want, adds the packages, wires `provideSpark` into your root providers and installs everything.

```ts
import { Button } from '@bdspark/sparkng/button';
```

```html
<p-button label="Check" />
```

Full setup, including the manual path, charts, and icons, is in the [getting started guide](https://sparkng.bdspark.com/installation).

To use chart components, install the charting engine:

```bash
npm install @bdspark/sparkng-charts
```

## Migrating from PrimeNG

`ng add` does not migrate an existing workspace. It sets up new projects only, and when it detects a `primeng` dependency it leaves your code untouched and fails with an error pointing you here rather than reporting success. Use the `migrate-from-primeng` schematic instead: install the package so the Angular CLI can resolve it, then run the schematic. Packages are swapped, imports are rewritten, and you get a report of anything it could not handle automatically, with file and line numbers.

```bash
npm install @bdspark/sparkng@1
ng generate @bdspark/sparkng@1:migrate-from-primeng
```

See the [migration guide](https://sparkng.bdspark.com/migration/primeng) for prerequisites and the manual cases. If you are on PrimeNG v20 or older, upgrade to v21 first.

## Packages

| Package | What it is |
| --- | --- |
| [`@bdspark/sparkng`](packages/sparkng) | The components, directives and services. The only package most applications install directly. |
| [`@bdspark/sparkng-themes`](packages/sparkng-themes) | Built-in theme presets — Aura, Material, Lara, Nora, and Shadcn. |
| [`@bdspark/sparkng-styled`](packages/sparkng-styled) | The styled-mode theming engine that turns presets into CSS variables. |
| [`@bdspark/sparkng-styles`](packages/sparkng-styles) | Base styles shared by the components. |
| [`@bdspark/sparkng-tailwindcss`](packages/sparkng-tailwindcss) | Tailwind CSS plugin, for both v3 and v4. |
| [`@bdspark/sparkng-locale`](packages/sparkng-locale) | i18n locale definitions. |
| [`@bdspark/sparkng-motion`](packages/sparkng-motion) | Animation and transition utilities. |
| [`@bdspark/sparkng-utils`](packages/sparkng-utils) | Shared helpers used across the packages. |

Icons live in [`@bdspark/sparkng-icons`](https://www.npmjs.com/package/@bdspark/sparkng-icons) and are optional — components accept any icon through templating, but the documentation examples use the `pi pi-*` classes.

## Requirements

- Angular v21 or newer
- RxJS v7.8.1 or newer

## Contributing

Issue triage, reproductions, pull requests and documentation fixes are all welcome — and if you had a pull request open on `primefaces/primeng` that never landed, [CONTRIBUTING.md](CONTRIBUTING.md) shows how to bring it across with its history intact.

```bash
pnpm install     # dependencies + git hooks
pnpm run dev     # run the documentation site locally
```

The [contribution guide](https://sparkng.bdspark.com/contribution) covers the workflow, and the [roadmap](https://sparkng.bdspark.com/roadmap) covers what is planned.

## Support

Community only — there is no SLA and no commercial support. [Issues](https://github.com/Aronno1920/SparkNG/issues) for bugs, [Discussions](https://github.com/Aronno1920/SparkNG/discussions) for questions.

## License

[MIT](LICENSE.md). Forked from PrimeNG v21, which was published under the same license, with the original copyright notices intact. PrimeNG, PrimeFaces, PrimeReact, PrimeVue and PrimeFlex are trademarks of PrimeTek.

## Attribution

Based on OpenNG (MIT). This project is a rebrand of the OpenNG UI component library (`@openng/sparkng*`, also known as SparkNG), the community continuation of PrimeNG v21. See [NOTICE.md](NOTICE.md) for the full attribution and the preserved copyright notices.
