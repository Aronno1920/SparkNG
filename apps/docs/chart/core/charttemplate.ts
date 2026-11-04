/**
 * @file
 * Shared template of all chart components. The `#container` element is the
 * mount point handed to the chart engine; its passthrough section is `container`.
 *
 * @module charttemplate
 */
export const CHART_TEMPLATE = `
    <div
        #container
        role="img"
        [class]="cx('container')"
        [style]="sx('container')"
        [attr.aria-label]="ariaLabel"
        [attr.aria-labelledby]="ariaLabelledBy"
        [pBind]="ptm('container')"
    ></div>
`;
