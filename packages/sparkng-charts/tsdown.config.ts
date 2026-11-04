import { defineConfig } from 'tsdown';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
    entry: { index: 'src/sparkng-charts.ts' },
    format: ['esm'],
    outDir: 'dist',
    // Types ship as the prebuilt ./types/index.d.ts (API-identical to echarts).
    dts: false,
    target: 'es2015',
    platform: 'browser',
    // The engine source uses the __DEV__ magic global; mirror the upstream
    // definition so production bundles drop the development warnings.
    define: {
        __DEV__: 'typeof process !== "undefined" && process.env["NODE_ENV"] !== "production"'
    },
    // Bundle the rendering core and runtime helpers into the dist so that
    // consumers never need to install echarts/zrender/tslib themselves.
    deps: {
        noExternal: [/^zrender(\/|$)/, /^tslib(\/|$)/]
    },
    minify: isProduction,
    sourcemap: isProduction,
    clean: isProduction
});
