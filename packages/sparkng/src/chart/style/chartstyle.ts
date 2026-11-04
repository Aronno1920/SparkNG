import { Injectable } from '@angular/core';
import { BaseStyle } from '@bdspark/sparkng/base';

const inlineStyles = {
    root: ({ instance }) => ({ display: 'block', position: 'relative', width: instance.width || '100%', height: instance.height || '24rem' }),
    container: () => ({ width: '100%', height: '100%' })
};

const classes = {
    root: ({ instance }) => ['p-chart', `p-chart-${instance.chartType}`],
    container: 'p-chart-container'
};

@Injectable()
export class ChartStyle extends BaseStyle {
    name = 'chart';

    classes = classes;

    inlineStyles = inlineStyles;
}

/**
 *
 * Chart groups a collection of contents in tabs.
 *
 * [Live Demo](https://sparkng.bdspark.com/chart/)
 *
 * @module chartstyle
 *
 */
export enum ChartClasses {
    /**
     * Class name of the root element
     */
    root = 'p-chart',
    /**
     * Class name of the chart container element
     */
    container = 'p-chart-container'
}

export interface ChartStyle extends BaseStyle {}
