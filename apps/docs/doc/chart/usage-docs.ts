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
        typescript: `// Standalone Component
import { BarChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
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
        typescript: `// Standalone Component
import { PieChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
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
        typescript: `// Standalone Component
import { ScatterChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
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
        typescript: `// Standalone Component & Map Registry
import { MapChart, registerMap } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-mapchart [data]="data" map="world" />`
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
        typescript: `// Standalone Component
import { CandlestickChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
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
        typescript: `// Standalone Component
import { RadarChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
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
        typescript: `// Standalone Component
import { BoxplotChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-boxplotchart [options]="options" />`
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
        typescript: `// Standalone Component
import { HeatmapChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-heatmapchart [options]="options" />`
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
        typescript: `// Standalone Component
import { GraphChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
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
        typescript: `// Standalone Component
import { TreeChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
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
        typescript: `// Standalone Component
import { TreemapChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-treemapchart [options]="options" />`
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
        typescript: `// Standalone Component
import { SunburstChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
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
        typescript: `// Standalone Component
import { SankeyChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-sankeychart [data]="data" [links]="links" />`
    };
}

@Component({
    selector: 'parallel-usage-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>
        <br />
        <app-code [code]="usageCode" [hideToggleCode]="true"></app-code>
    `
})
export class ParallelUsageDoc {
    importCode: Code = {
        typescript: `// Standalone Component
import { UIChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-chart [options]="options" />`
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
        typescript: `// Standalone Component
import { FunnelChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
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
        typescript: `// Standalone Component
import { GaugeChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
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
        typescript: `// Standalone Component
import { BarChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-barchart [dataset]="dataset" [series]="series" [xAxis]="{ type: 'category' }" [yAxis]="{ type: 'value' }" />`
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
        typescript: `// Standalone Component
import { GaugeChart } from '@bdspark/sparkng/chart';

// Or via full module
import { ChartModule } from '@bdspark/sparkng/chart';`
    };
    usageCode: Code = {
        html: `<p-gaugechart [value]="72" [options]="options" />`
    };
}
