import { AppCode } from '@/components/doc/app.code';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'bar-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class BarUsageDoc {
    importCode: Code = {
        typescript: `import { BarChart } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-barchart [series]="series" [xAxis]="{ type: 'category', data: categories }" />`
    };
}

@Component({
    selector: 'pie-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class PieUsageDoc {
    importCode: Code = {
        typescript: `import { PieChart } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-piechart [data]="data" />`
    };
}

@Component({
    selector: 'scatter-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class ScatterUsageDoc {
    importCode: Code = {
        typescript: `import { ScatterChart } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-scatterchart [series]="series" />`
    };
}

@Component({
    selector: 'map-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class MapUsageDoc {
    importCode: Code = {
        typescript: `import { MapChart, registerMap } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-mapchart [data]="data" map="USA" />`
    };
}

@Component({
    selector: 'candlestick-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class CandlestickUsageDoc {
    importCode: Code = {
        typescript: `import { CandlestickChart } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-candlestickchart [data]="data" [xAxis]="{ type: 'category', data: dates }" />`
    };
}

@Component({
    selector: 'radar-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class RadarUsageDoc {
    importCode: Code = {
        typescript: `import { RadarChart } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-radarchart [indicator]="indicators" [data]="data" />`
    };
}

@Component({
    selector: 'boxplot-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class BoxplotUsageDoc {
    importCode: Code = {
        typescript: `import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-chart [options]="options" />`
    };
}

@Component({
    selector: 'heatmap-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class HeatmapUsageDoc {
    importCode: Code = {
        typescript: `import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-chart [options]="options" />`
    };
}

@Component({
    selector: 'graph-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class GraphUsageDoc {
    importCode: Code = {
        typescript: `import { GraphChart } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-graphchart [nodes]="nodes" [links]="links" />`
    };
}

@Component({
    selector: 'tree-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class TreeUsageDoc {
    importCode: Code = {
        typescript: `import { TreeChart } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-treechart [data]="data" />`
    };
}

@Component({
    selector: 'treemap-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class TreemapUsageDoc {
    importCode: Code = {
        typescript: `import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-chart [options]="options" />`
    };
}

@Component({
    selector: 'sunburst-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class SunburstUsageDoc {
    importCode: Code = {
        typescript: `import { SunburstChart } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-sunburstchart [data]="data" />`
    };
}

@Component({
    selector: 'sankey-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class SankeyUsageDoc {
    importCode: Code = {
        typescript: `import { SankeyChart } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-sankeychart [data]="data" [links]="links" />`
    };
}

@Component({
    selector: 'funnel-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class FunnelUsageDoc {
    importCode: Code = {
        typescript: `import { FunnelChart } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-funnelchart [data]="data" />`
    };
}

@Component({
    selector: 'gauge-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class GaugeUsageDoc {
    importCode: Code = {
        typescript: `import { GaugeChart } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-gaugechart [value]="value" />`
    };
}

@Component({
    selector: 'dataset-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class DatasetUsageDoc {
    importCode: Code = {
        typescript: `import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-chart [options]="options" />`
    };
}

@Component({
    selector: 'richtext-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class RichTextUsageDoc {
    importCode: Code = {
        typescript: `import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-chart [options]="options" />`
    };
}
