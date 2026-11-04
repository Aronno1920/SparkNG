import type { PassThrough, PassThroughOption } from '@bdspark/sparkng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link UIChart.pt}
 * @group Interface
 */
export interface ChartPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the host's DOM element.
     */
    host?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the chart container element that the chart engine mounts on.
     */
    container?: PassThroughOption<HTMLDivElement, I>;
}

/**
 * Defines valid pass-through options in Chart.
 * @see {@link ChartPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ChartPassThrough<I = unknown> = PassThrough<I, ChartPassThroughOptions<I>>;
