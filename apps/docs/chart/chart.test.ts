import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, ViewChild, provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { getInstanceByDom } from '@bdspark/sparkng-charts';
import { ChartModule, GaugeChart, LineChart, BarChart, PieChart, ScatterChart, CandlestickChart, RadarChart, GraphChart, TreeChart, SunburstChart, SankeyChart, FunnelChart, MapChart, UIChart, registerMap } from './public_api';
import { buildChartPalette, mixColors, parseColor, readChartTokens } from './public_api';

const TEST_GEO_JSON = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: { name: 'Testland' },
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [0, 0],
                        [4, 0],
                        [4, 4],
                        [0, 0]
                    ]
                ]
            }
        }
    ]
};

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-linechart #line width="600px" height="400px" [data]="data" [smooth]="smooth" [area]="area" [stack]="stack" [options]="options" (onChartInit)="onInit($event)" (onChartClick)="onClick($event)"></p-linechart>`
})
class TestLineChartComponent {
    @ViewChild('line') chartComponent!: LineChart;
    data: any = [10, 52, 200, 334, 390, 330, 220];
    smooth: boolean = false;
    area: boolean = false;
    stack: string | undefined;
    options: any;
    initEmitted = false;
    clicked: any = null;
    onInit() {
        this.initEmitted = true;
    }
    onClick(event: any) {
        this.clicked = event;
    }
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-barchart #bar width="600px" height="400px" [data]="data" [horizontal]="horizontal" [stack]="stack"></p-barchart>`
})
class TestBarChartComponent {
    @ViewChild('bar') chartComponent!: BarChart;
    data: any = [100, 59, 80];
    horizontal: boolean = false;
    stack: string | undefined;
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-piechart #pie width="400px" height="400px" [data]="data" [donut]="donut" [roseType]="roseType"></p-piechart>`
})
class TestPieChartComponent {
    @ViewChild('pie') chartComponent!: PieChart;
    data: any = [
        { value: 1048, name: 'Search' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' }
    ];
    donut: boolean = false;
    roseType: 'radius' | 'area' | undefined;
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-scatterchart #scatter width="600px" height="400px" [data]="data"></p-scatterchart>`
})
class TestScatterChartComponent {
    @ViewChild('scatter') chartComponent!: ScatterChart;
    data: any = [
        [10.0, 8.04],
        [8.0, 6.95],
        [13.0, 7.58]
    ];
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-candlestickchart #candle width="600px" height="400px" [data]="data" [xAxis]="xAxis"></p-candlestickchart>`
})
class TestCandlestickChartComponent {
    @ViewChild('candle') chartComponent!: CandlestickChart;
    data: any = [
        [20, 34, 10, 38],
        [40, 35, 30, 50]
    ];
    xAxis: any = { type: 'category', data: ['2025-01', '2025-02'] };
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-radarchart #radar width="400px" height="400px" [data]="data" [radar]="radarOptions"></p-radarchart>`
})
class TestRadarChartComponent {
    @ViewChild('radar') chartComponent!: RadarChart;
    data: any = [{ value: [4200, 3000, 20000, 35000, 50000], name: 'Allocations' }];
    radarOptions: any = {
        indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Marketing', max: 16000 }
        ]
    };
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-graphchart #graph width="600px" height="400px" [nodes]="nodes" [links]="links"></p-graphchart>`
})
class TestGraphChartComponent {
    @ViewChild('graph') chartComponent!: GraphChart;
    nodes: any = [{ name: 'Node 1' }, { name: 'Node 2' }, { name: 'Node 3' }];
    links: any = [
        { source: 'Node 1', target: 'Node 2' },
        { source: 'Node 2', target: 'Node 3' }
    ];
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-treechart #tree width="600px" height="400px" [data]="data" [orient]="orient"></p-treechart>`
})
class TestTreeChartComponent {
    @ViewChild('tree') chartComponent!: TreeChart;
    data: any = { name: 'root', children: [{ name: 'Child A' }, { name: 'Child B' }] };
    orient: any = 'LR';
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-sunburstchart #sunburst width="400px" height="400px" [data]="data"></p-sunburstchart>`
})
class TestSunburstChartComponent {
    @ViewChild('sunburst') chartComponent!: SunburstChart;
    data: any = {
        name: 'Root',
        children: [
            { name: 'A', value: 12 },
            { name: 'B', children: [{ name: 'B1', value: 5 }] }
        ]
    };
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-sankeychart #sankey width="600px" height="400px" [nodes]="nodes" [links]="links"></p-sankeychart>`
})
class TestSankeyChartComponent {
    @ViewChild('sankey') chartComponent!: SankeyChart;
    nodes: any = [{ name: 'Ad' }, { name: 'Visit' }, { name: 'Buy' }];
    links: any = [
        { source: 'Ad', target: 'Visit', value: 30 },
        { source: 'Visit', target: 'Buy', value: 20 }
    ];
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-funnelchart #funnel width="400px" height="400px" [data]="data" [sort]="sort"></p-funnelchart>`
})
class TestFunnelChartComponent {
    @ViewChild('funnel') chartComponent!: FunnelChart;
    data: any = [
        { value: 100, name: 'Show' },
        { value: 80, name: 'Click' },
        { value: 60, name: 'Purchase' }
    ];
    sort: any = 'descending';
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-gaugechart #gauge width="400px" height="400px" [value]="value" [min]="min" [max]="max"></p-gaugechart>`
})
class TestGaugeChartComponent {
    @ViewChild('gauge') chartComponent!: GaugeChart;
    value: number | undefined = 64;
    min: number | undefined = 0;
    max: number | undefined = 100;
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-mapchart #map width="600px" height="400px" map="testmap" [data]="data" [visualMap]="visualMap"></p-mapchart>`
})
class TestMapChartComponent {
    @ViewChild('map') chartComponent!: MapChart;
    data: any = [{ name: 'Testland', value: 42 }];
    visualMap: any = { min: 0, max: 100 };
}

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false,
    template: `<p-chart #generic width="600px" height="400px" [options]="options" [dataset]="dataset"></p-chart>`
})
class TestGenericChartComponent {
    @ViewChild('generic') chartComponent!: UIChart;
    options: any = {
        xAxis: { type: 'category' },
        yAxis: { type: 'value' },
        series: [
            { type: 'line', data: [5, 6, 7] },
            { type: 'bar', data: [3, 2, 1] }
        ]
    };
    dataset: any;
}

async function setup<T>(hostType: new (...args: any[]) => T): Promise<ComponentFixture<T>> {
    await TestBed.configureTestingModule({
        imports: [ChartModule],
        declarations: [hostType],
        providers: [provideZonelessChangeDetection()]
    }).compileComponents();
    const fixture = TestBed.createComponent(hostType);
    await fixture.whenStable();
    return fixture;
}

const flushUpdates = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('Chart Components', () => {
    describe('LineChart', () => {
        let fixture: ComponentFixture<TestLineChartComponent>;

        beforeEach(async () => {
            fixture = await setup(TestLineChartComponent);
        });

        it('should initialize the chart instance and emit onChartInit', () => {
            const component = fixture.componentInstance;
            expect(component.chartComponent.chart).toBeTruthy();
            expect(component.chartComponent.initialized).toBe(true);
            expect(component.initEmitted).toBe(true);
        });

        it('should apply the p-chart and p-chart-line classes to the host', () => {
            const element = fixture.debugElement.query(By.directive(LineChart)).nativeElement as HTMLElement;
            expect(element.className).toContain('p-chart');
            expect(element.className).toContain('p-chart-line');
        });

        it('should compose a line series with cartesian axes', () => {
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            expect((applied.series as any[])[0].type).toBe('line');
            expect((applied.series as any[])[0].data).toEqual([10, 52, 200, 334, 390, 330, 220]);
            expect((applied.xAxis as any[])[0].type).toBe('category');
            expect((applied.yAxis as any[])[0].type).toBe('value');
        });

        it('should map the convenience properties to series options', async () => {
            const component = fixture.componentInstance;
            component.smooth = true;
            component.area = true;
            component.stack = 'total';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await flushUpdates();
            const applied = component.chartComponent.chart!.getOption();
            const series = (applied.series as any[])[0];
            expect(series.smooth).toBe(true);
            expect(series.areaStyle).toBeTruthy();
            expect(series.stack).toBe('total');
        });

        it('should update the chart when data changes', async () => {
            const component = fixture.componentInstance;
            component.data = [1, 2, 3];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await flushUpdates();
            const applied = component.chartComponent.chart!.getOption();
            expect((applied.series as any[])[0].data).toEqual([1, 2, 3]);
        });

        it('should deep merge the options input over the composed options', async () => {
            const component = fixture.componentInstance;
            component.options = { tooltip: { trigger: 'axis' } };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await flushUpdates();
            const applied = component.chartComponent.chart!.getOption();
            expect((applied.tooltip as any[])[0].trigger).toBe('axis');
            expect((applied.series as any[])[0].type).toBe('line');
        });

        it('should prefer the series input over the data input', async () => {
            const component = fixture.componentInstance;
            component.chartComponent.series = [{ type: 'line', name: 'Override', data: [9, 9, 9] }];
            await flushUpdates();
            const applied = component.chartComponent.chart!.getOption();
            expect((applied.series as any[])[0].name).toBe('Override');
            expect((applied.series as any[])[0].data).toEqual([9, 9, 9]);
        });

        it('should dispose the instance on destroy', async () => {
            const chartComponent = fixture.componentInstance.chartComponent;
            const container = chartComponent.containerViewChild.nativeElement;
            expect(getInstanceByDom(container)).toBe(chartComponent.chart);
            fixture.destroy();
            expect(chartComponent.chart).toBeNull();
            expect(getInstanceByDom(container)).toBeUndefined();
        });
    });

    describe('BarChart', () => {
        let fixture: ComponentFixture<TestBarChartComponent>;

        beforeEach(async () => {
            fixture = await setup(TestBarChartComponent);
        });

        it('should compose a bar series with category and value axes', () => {
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            expect((applied.series as any[])[0].type).toBe('bar');
            expect((applied.xAxis as any[])[0].type).toBe('category');
            expect((applied.yAxis as any[])[0].type).toBe('value');
        });

        it('should swap the axes when horizontal', async () => {
            const component = fixture.componentInstance;
            component.horizontal = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await flushUpdates();
            const applied = component.chartComponent.chart!.getOption();
            expect((applied.xAxis as any[])[0].type).toBe('value');
            expect((applied.yAxis as any[])[0].type).toBe('category');
        });
    });

    describe('PieChart', () => {
        let fixture: ComponentFixture<TestPieChartComponent>;

        beforeEach(async () => {
            fixture = await setup(TestPieChartComponent);
        });

        it('should compose a pie series with name/value data', () => {
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            const series = (applied.series as any[])[0];
            expect(series.type).toBe('pie');
            expect(series.data.length).toBe(3);
            expect(series.data[0].name).toBe('Search');
        });

        it('should apply the donut radius when donut is enabled', async () => {
            const component = fixture.componentInstance;
            component.donut = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await flushUpdates();
            const applied = component.chartComponent.chart!.getOption();
            expect((applied.series as any[])[0].radius).toEqual(['45%', '70%']);
        });
    });

    describe('ScatterChart', () => {
        it('should compose a scatter series with value axes', async () => {
            const fixture = await setup(TestScatterChartComponent);
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            expect((applied.series as any[])[0].type).toBe('scatter');
            expect((applied.series as any[])[0].data.length).toBe(3);
            expect((applied.xAxis as any[])[0].type).toBe('value');
        });
    });

    describe('CandlestickChart', () => {
        it('should compose a candlestick series with a scaled value axis and custom x axis', async () => {
            const fixture = await setup(TestCandlestickChartComponent);
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            expect((applied.series as any[])[0].type).toBe('candlestick');
            expect((applied.xAxis as any[])[0].data).toEqual(['2025-01', '2025-02']);
            expect((applied.yAxis as any[])[0].scale).toBe(true);
        });
    });

    describe('RadarChart', () => {
        it('should pass the radar component with indicators', async () => {
            const fixture = await setup(TestRadarChartComponent);
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            expect((applied.series as any[])[0].type).toBe('radar');
            expect((applied.radar as any[])[0].indicator.length).toBe(2);
        });
    });

    describe('GraphChart', () => {
        it('should compose a graph series from nodes and links', async () => {
            const fixture = await setup(TestGraphChartComponent);
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            const series = (applied.series as any[])[0];
            expect(series.type).toBe('graph');
            expect(series.data.length).toBe(3);
            expect(series.links.length).toBe(2);
        });
    });

    describe('TreeChart', () => {
        it('should compose a tree series with the orientation', async () => {
            const fixture = await setup(TestTreeChartComponent);
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            const series = (applied.series as any[])[0];
            expect(series.type).toBe('tree');
            expect(series.orient).toBe('LR');
        });
    });

    describe('SunburstChart', () => {
        it('should compose a sunburst series with nested data', async () => {
            const fixture = await setup(TestSunburstChartComponent);
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            expect((applied.series as any[])[0].type).toBe('sunburst');
        });
    });

    describe('SankeyChart', () => {
        it('should compose a sankey series from nodes and links', async () => {
            const fixture = await setup(TestSankeyChartComponent);
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            const series = (applied.series as any[])[0];
            expect(series.type).toBe('sankey');
            expect(series.data.length).toBe(3);
            expect(series.links.length).toBe(2);
        });
    });

    describe('FunnelChart', () => {
        it('should compose a funnel series with sorting', async () => {
            const fixture = await setup(TestFunnelChartComponent);
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            const series = (applied.series as any[])[0];
            expect(series.type).toBe('funnel');
            expect(series.sort).toBe('descending');
        });
    });

    describe('GaugeChart', () => {
        it('should compose a gauge series from the value shorthand', async () => {
            const fixture = await setup(TestGaugeChartComponent);
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            const series = (applied.series as any[])[0];
            expect(series.type).toBe('gauge');
            expect(series.min).toBe(0);
            expect(series.max).toBe(100);
            expect(series.data[0].value).toBe(64);
        });
    });

    describe('MapChart', () => {
        it('should compose a map series bound to a registered map', async () => {
            registerMap('testmap', TEST_GEO_JSON as any);
            const fixture = await setup(TestMapChartComponent);
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            const series = (applied.series as any[])[0];
            expect(series.type).toBe('map');
            expect(series.map).toBe('testmap');
            expect((applied.visualMap as any[])[0].max).toBe(100);
        });
    });

    describe('Generic UIChart', () => {
        it('should render the provided options as-is', async () => {
            const fixture = await setup(TestGenericChartComponent);
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            expect((applied.series as any[]).length).toBe(2);
            expect((applied.series as any[])[0].type).toBe('line');
            expect((applied.series as any[])[1].type).toBe('bar');
        });

        it('should apply the dataset input', async () => {
            const fixture = await setup(TestGenericChartComponent);
            fixture.componentInstance.dataset = {
                source: [
                    ['Product', 'Sales'],
                    ['A', 10]
                ]
            };
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await flushUpdates();
            const applied = fixture.componentInstance.chartComponent.chart!.getOption();
            expect((applied.dataset as any[])[0].source[0]).toEqual(['Product', 'Sales']);
        });
    });

    describe('Theme helpers', () => {
        it('should parse hex colors to rgb', () => {
            expect(parseColor('#3498db')).toEqual([52, 152, 219]);
        });

        it('should parse rgb() colors', () => {
            expect(parseColor('rgb(52, 152, 219)')).toEqual([52, 152, 219]);
        });

        it('should mix colors', () => {
            expect(mixColors([0, 0, 0], [255, 255, 255], 0.5)).toBe('#808080');
        });

        it('should derive a vibrant categorical palette from the primary', () => {
            const palette = buildChartPalette('#3498db');
            expect(palette.length).toBeGreaterThanOrEqual(6);
            expect(palette[0]).toBe('#3498db');
        });

        it('should return a default vibrant palette when no primary color is given', () => {
            const palette = buildChartPalette();
            expect(palette.length).toBeGreaterThanOrEqual(6);
            expect(typeof palette[0]).toBe('string');
        });

        it('should return empty tokens without a document', () => {
            expect(readChartTokens(null)).toEqual({});
        });
    });
});
