/*
 * SparkNG Charts - full charting engine entry.
 *
 * Every chart type, renderer and component is registered, making this
 * package a self-contained engine with zero runtime dependencies.
 *
 * Licensed under the Apache License, Version 2.0. See LICENSE and NOTICE.
 */

// Core engine API: init, use, registerMap, registerTheme, connect, graphic...
export * from './export/core';

// Registrable modules and their option types.
export * from './export/charts';
export * from './export/components';
export * from './export/renderers';
export * from './export/features';
export type * from './export/option';

// Registers every chart, component, renderer and feature once at import time.
import './charts-all';
