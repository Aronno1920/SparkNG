import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { ChartModule, registerMap } from '@bdspark/sparkng/chart';

// Self-contained port of d3-geo v2.0.1's geoAlbersUsa composite projection.
// The official example loads d3-array/d3-geo from a CDN; the math below is the
// same projection pipeline (conic equal area sub-projections for the lower 48,
// Alaska and Hawaii with d3's default clip regions and invert bands).
const d3Radians = Math.PI / 180;
const d3Degrees = 180 / Math.PI;
const d3Epsilon = 1e-6;
const d3Pi = Math.PI;
const d3Tau = d3Pi * 2;
const d3HalfPi = d3Pi / 2;

function d3Asin(x: number): number {
    return x > 1 ? d3HalfPi : x < -1 ? -d3HalfPi : Math.asin(x);
}

function d3Sign(x: number): number {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}

function conicEqualAreaRaw(y0: number, y1: number): any {
    const sy0 = Math.sin(y0);
    const n = (sy0 + Math.sin(y1)) / 2;
    const c = 1 + sy0 * (2 * n - sy0);
    const r0 = Math.sqrt(c) / n;

    function project(x: number, y: number): [number, number] {
        const r = Math.sqrt(c - 2 * n * Math.sin(y)) / n;
        return [r * Math.sin((x *= n)), r0 - r * Math.cos(x)];
    }

    project.invert = function (x: number, y: number): [number, number] {
        const r0y = r0 - y;
        let l = Math.atan2(x, Math.abs(r0y)) * d3Sign(r0y);
        if (r0y * n < 0) {
            l -= d3Pi * d3Sign(x) * d3Sign(r0y);
        }
        return [l / n, d3Asin((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
    };

    return project;
}

// d3 conic projection wrapper: rotate -> raw projection -> scale/translate,
// with `center` mapping to the translate point (y axis flipped).
function conicEqualAreaProjection(parallels: [number, number], rotate: number[], center: [number, number], k: number, translate: [number, number]) {
    const raw = conicEqualAreaRaw(parallels[0] * d3Radians, parallels[1] * d3Radians);
    const deltaLambda = (rotate[0] % 360) * d3Radians;
    const centerPoint = raw(center[0] * d3Radians, center[1] * d3Radians);

    function rotateLambda(lambda: number): number {
        lambda += deltaLambda;
        return lambda > d3Pi ? lambda - d3Tau : lambda < -d3Pi ? lambda + d3Tau : lambda;
    }

    return {
        project(point: [number, number]): [number, number] {
            const p = raw(rotateLambda(point[0] * d3Radians), point[1] * d3Radians);
            return [translate[0] + k * (p[0] - centerPoint[0]), translate[1] - k * (p[1] - centerPoint[1])];
        },
        invert(point: [number, number]): [number, number] {
            const p = raw.invert((point[0] - translate[0]) / k + centerPoint[0], (translate[1] - point[1]) / k + centerPoint[1]);
            if (!p || !isFinite(p[0]) || !isFinite(p[1])) {
                return null as any;
            }
            let lambda = p[0] - deltaLambda;
            lambda = lambda > d3Pi ? lambda - d3Tau : lambda < -d3Pi ? lambda + d3Tau : lambda;
            return [lambda * d3Degrees, p[1] * d3Degrees];
        }
    };
}

// d3.geoAlbersUsa(): composite of three conic equal area projections with the
// mutually exclusive clip regions from d3-geo, scale 1070, translate [480, 250].
function geoAlbersUsa() {
    const k = 1070;
    const x = 480;
    const y = 250;

    const lower48 = conicEqualAreaProjection([29.5, 45.5], [96, 0], [-0.6, 38.7], k, [x, y]);
    const alaska = conicEqualAreaProjection([55, 65], [154, 0], [-2, 58.5], k * 0.35, [x - 0.307 * k, y + 0.201 * k]);
    const hawaii = conicEqualAreaProjection([8, 18], [157, 0], [-3, 19.9], k, [x - 0.205 * k, y + 0.212 * k]);

    const lower48Extent = [x - 0.455 * k, y - 0.238 * k, x + 0.455 * k, y + 0.238 * k];
    const alaskaExtent = [x - 0.425 * k + d3Epsilon, y + 0.12 * k + d3Epsilon, x - 0.214 * k - d3Epsilon, y + 0.234 * k - d3Epsilon];
    const hawaiiExtent = [x - 0.214 * k + d3Epsilon, y + 0.166 * k + d3Epsilon, x - 0.115 * k - d3Epsilon, y + 0.234 * k - d3Epsilon];

    function within(p: [number, number], extent: number[]): boolean {
        return extent[0] <= p[0] && p[0] <= extent[2] && extent[1] <= p[1] && p[1] <= extent[3];
    }

    function albersUsa(coordinates: [number, number]): [number, number] {
        let p: [number, number] = lower48.project(coordinates);
        if (within(p, lower48Extent)) {
            return p;
        }
        p = alaska.project(coordinates);
        if (within(p, alaskaExtent)) {
            return p;
        }
        p = hawaii.project(coordinates);
        if (within(p, hawaiiExtent)) {
            return p;
        }
        return null;
    }

    albersUsa.invert = function (coordinates: [number, number]): [number, number] {
        const cx = (coordinates[0] - x) / k;
        const cy = (coordinates[1] - y) / k;
        return (cy >= 0.12 && cy < 0.234 && cx >= -0.425 && cx < -0.214 ? alaska : cy >= 0.166 && cy < 0.234 && cx >= -0.214 && cx < -0.115 ? hawaii : lower48).invert(coordinates);
    };

    return albersUsa;
}

@Component({
    selector: 'usa-choropleth-projection-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>USA population estimates rendered with a custom Albers USA composite projection supplied to the map series.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class UsaChoroplethProjectionDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.chart.showLoading();
        fetch('demo/chart/geo/USA.json')
            .then((r) => r.json())
            .then((usaJson: any) => {
                this.chart.hideLoading();

                const projection = geoAlbersUsa();

                registerMap('USA', usaJson);

                this.chart.setOption({
                    title: {
                        text: 'USA Population Estimates (2012)',
                        subtext: 'Data from www.census.gov',
                        sublink: 'http://www.census.gov/popest/data/datasets.html',
                        left: 'right'
                    },
                    tooltip: {
                        trigger: 'item',
                        showDelay: 0,
                        transitionDuration: 0.2
                    },
                    visualMap: {
                        left: 'right',
                        min: 500000,
                        max: 38000000,
                        inRange: {
                            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                        },
                        text: ['High', 'Low'],
                        calculable: true
                    },
                    toolbox: {
                        show: true,
                        //orient: 'vertical',
                        left: 'left',
                        top: 'top',
                        feature: {
                            dataView: { readOnly: false },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series: [
                        {
                            name: 'USA PopEstimates',
                            type: 'map',
                            map: 'USA',
                            projection: {
                                project: function (point: [number, number]) {
                                    return projection(point);
                                },
                                unproject: function (point: [number, number]) {
                                    return projection.invert(point);
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            },
                            data: [
                                { name: 'Alabama', value: 4822023 },
                                { name: 'Alaska', value: 731449 },
                                { name: 'Arizona', value: 6553255 },
                                { name: 'Arkansas', value: 2949131 },
                                { name: 'California', value: 38041430 },
                                { name: 'Colorado', value: 5187582 },
                                { name: 'Connecticut', value: 3590347 },
                                { name: 'Delaware', value: 917092 },
                                { name: 'District of Columbia', value: 632323 },
                                { name: 'Florida', value: 19317568 },
                                { name: 'Georgia', value: 9919945 },
                                { name: 'Hawaii', value: 1392313 },
                                { name: 'Idaho', value: 1595728 },
                                { name: 'Illinois', value: 12875255 },
                                { name: 'Indiana', value: 6537334 },
                                { name: 'Iowa', value: 3074186 },
                                { name: 'Kansas', value: 2885905 },
                                { name: 'Kentucky', value: 4380415 },
                                { name: 'Louisiana', value: 4601893 },
                                { name: 'Maine', value: 1329192 },
                                { name: 'Maryland', value: 5884563 },
                                { name: 'Massachusetts', value: 6646144 },
                                { name: 'Michigan', value: 9883360 },
                                { name: 'Minnesota', value: 5379139 },
                                { name: 'Mississippi', value: 2984926 },
                                { name: 'Missouri', value: 6021988 },
                                { name: 'Montana', value: 1005141 },
                                { name: 'Nebraska', value: 1855525 },
                                { name: 'Nevada', value: 2758931 },
                                { name: 'New Hampshire', value: 1320718 },
                                { name: 'New Jersey', value: 8864590 },
                                { name: 'New Mexico', value: 2085538 },
                                { name: 'New York', value: 19570261 },
                                { name: 'North Carolina', value: 9752073 },
                                { name: 'North Dakota', value: 699628 },
                                { name: 'Ohio', value: 11544225 },
                                { name: 'Oklahoma', value: 3814820 },
                                { name: 'Oregon', value: 3899353 },
                                { name: 'Pennsylvania', value: 12763536 },
                                { name: 'Rhode Island', value: 1050292 },
                                { name: 'South Carolina', value: 4723723 },
                                { name: 'South Dakota', value: 833354 },
                                { name: 'Tennessee', value: 6456243 },
                                { name: 'Texas', value: 26059203 },
                                { name: 'Utah', value: 2855287 },
                                { name: 'Vermont', value: 626011 },
                                { name: 'Virginia', value: 8185867 },
                                { name: 'Washington', value: 6897012 },
                                { name: 'West Virginia', value: 1855413 },
                                { name: 'Wisconsin', value: 5726398 },
                                { name: 'Wyoming', value: 576412 },
                                { name: 'Puerto Rico', value: 3667084 }
                            ]
                        }
                    ]
                });
            });
    }
}
