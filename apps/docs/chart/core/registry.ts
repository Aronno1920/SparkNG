/**
 * @file
 * Thin passthroughs for the engine global registries so that applications
 * never need to import the engine directly. Covers map registration for
 * {@link MapChart}, custom themes and connecting multiple charts.
 *
 * @module chartregistry
 */
import * as charts from '@bdspark/sparkng-charts';
import type { SparkChartTheme } from '../types/chart.types';

/**
 * GeoJSON payload accepted by {@link registerMap}.
 * @group Interface
 */
export type SparkMapGeoJson = Parameters<typeof charts.registerMap>[1];

/**
 * Special areas (zoomed regions) accepted by {@link registerMap}.
 * @group Interface
 */
export type SparkMapSpecialAreas = Parameters<typeof charts.registerMap>[2];

/**
 * Registers a GeoJSON map that can be referenced by the `map` input of the
 * {@link MapChart} component.
 * @param mapName - Name of the map, e.g. `'world'`.
 * @param geoJson - GeoJSON object describing the map.
 * @param specialAreas - Optional zoomed regions, e.g. Alaska/Hawaii for a USA map.
 */
export function registerMap(mapName: string, geoJson: SparkMapGeoJson, specialAreas?: SparkMapSpecialAreas): void {
    charts.registerMap(mapName, geoJson, specialAreas);
}

/**
 * Returns the GeoJSON registered under the given map name.
 * @param mapName - Name of the registered map.
 */
export function getMap(mapName: string): unknown {
    return charts.getMap(mapName);
}

/**
 * Registers a named theme that can be applied through the `theme` input of the
 * chart components.
 * @param themeName - Name to register the theme under.
 * @param theme - The theme object.
 */
export function registerTheme(themeName: string, theme: SparkChartTheme): void {
    charts.registerTheme(themeName, theme);
}

/**
 * Connects a group of charts so that tooltips, legends, dataZoom and other
 * interactions stay in sync. Use the {@link BaseChart.chart} instances or the
 * {@link ChartInitEvent} payloads as members.
 * @param group - The chart instances to connect.
 */
export function connectCharts(group: (SparkChartsLikeInstance | EChartsLikeInstance)[]): void {
    charts.connect(group as any);
}

/**
 * Disconnects previously connected charts.
 * @param group - The chart instances to disconnect.
 */
export function disconnectCharts(group?: (SparkChartsLikeInstance | EChartsLikeInstance)[]): void {
    if (group) {
        charts.disconnect(group as any);
    }
}

/**
 * Minimal structural type accepted by {@link connectCharts}; the `chart`
 * instance of every component satisfies it.
 * @group Interface
 */
export interface SparkChartsLikeInstance {
    /** Internal the engine id marker; present on every real instance. */
    readonly id: string;
}

export type EChartsLikeInstance = SparkChartsLikeInstance;

/**
 * The the engine version the module was built against.
 */
export const chartsVersion: string = charts.version;
