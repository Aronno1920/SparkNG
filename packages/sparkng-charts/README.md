# SCharts (@bdspark/sparkng-charts)

The SCharts charting engine of the [SparkNG](https://bdspark.com) ecosystem, maintained by **bdSpark**. Every chart type, renderer and component is registered and the rendering core is bundled — zero runtime dependencies.

## Installation

```bash
# Using npm
npm install @bdspark/sparkng-charts

# Using yarn
yarn add @bdspark/sparkng-charts

# Using pnpm
pnpm add @bdspark/sparkng-charts
```

Every chart type (line, bar, pie, scatter, geo/map, candlestick, radar, graph, tree, sunburst, sankey, funnel, gauge and more) and every component is registered, exposing the complete option model and TypeScript types:

```ts
import { init, registerMap, connect } from '@bdspark/sparkng-charts';

const chart = init(document.getElementById('chart'));
chart.setOption({ series: [{ type: 'line', data: [5, 20, 36, 10, 10, 20] }] });
```

```html
<p-linechart [data]="sales" />
```

The SparkNG Angular chart components (`@bdspark/sparkng/chart`) are built on this engine.

## Highlights

- **Zero runtime dependencies** — the `zrender` rendering core is bundled into the published output; consumers install nothing else.
- **Full engine** — all chart types, renderers (canvas and SVG) and components registered out of the box.
- **Same API** — `init`, `use`, `registerMap`, `registerTheme`, `connect`, the option model and the TypeScript types are complete, so any chart configuration applies as-is.

## Attribution

This package is powered by the open-source Apache ECharts (v6.1.0) core, Copyright The Apache Software Foundation, licensed under the [Apache License 2.0](LICENSE). It is rebranded and redistributed as SCharts (`@bdspark/sparkng-charts`); the original license and notices are preserved in [LICENSE](LICENSE) and [NOTICE](NOTICE). ECharts is a trademark of The Apache Software Foundation and is not affiliated with, endorsed by, or sponsored by bdSpark.
