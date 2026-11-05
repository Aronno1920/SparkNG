import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { ChartModule, registerMap } from '@bdspark/sparkng/chart';
import { number } from '@bdspark/sparkng-charts';

// Hexbin statistics code based on [d3-hexbin](https://github.com/d3/d3-hexbin)
function hexBinStatistics(points: number[][], r: number) {
    const dx = r * 2 * Math.sin(Math.PI / 3);
    const dy = r * 1.5;
    const binsById: any = {};
    const bins: any[] = [];

    for (let i = 0, n = points.length; i < n; ++i) {
        const point = points[i];
        let px = point[0];
        let py = point[1];

        if (isNaN(px) || isNaN(py)) {
            continue;
        }

        let pj = Math.round((py = py / dy));
        let pi = Math.round((px = px / dx - (pj & 1) / 2));
        const py1 = py - pj;

        if (Math.abs(py1) * 3 > 1) {
            const px1 = px - pi;
            const pi2 = pi + (px < pi ? -1 : 1) / 2;
            const pj2 = pj + (py < pj ? -1 : 1);
            const px2 = px - pi2;
            const py2 = py - pj2;
            if (px1 * px1 + py1 * py1 > px2 * px2 + py2 * py2) {
                pi = pi2 + (pj & 1 ? 1 : -1) / 2;
                pj = pj2;
            }
        }

        const id = pi + '-' + pj;
        let bin = binsById[id];
        if (bin) {
            bin.points.push(point);
        } else {
            bins.push((bin = binsById[id] = { points: [point] }));
            bin.x = (pi + (pj & 1) / 2) * dx;
            bin.y = pj * dy;
        }
    }

    let maxBinLen = -Infinity;
    for (let i = 0; i < bins.length; i++) {
        maxBinLen = Math.max(maxBinLen, bins.length);
    }

    return {
        maxBinLen,
        bins
    };
}

@Component({
    selector: 'hexagonal-binning-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Kawhi Leonard's 2016-17 regular season shots binned into hexagons over an NBA court map; hexagon size encodes attempts and color encodes field goal percentage.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class HexagonalBinningDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        Promise.all([fetch('demo/chart/data/kawhi-leonard-16-17-regular.json').then((r) => r.json()), fetch('demo/chart/data/nba-court.json').then((r) => r.json())]).then(([shotData, nbaCourt]: any[]) => {
            registerMap('nbaCourt', nbaCourt.borderGeoJSON);

            const backgroundColor = '#333';
            const hexagonRadiusInGeo = 1;

            const hexBinResult = hexBinStatistics(
                shotData.data.map(function (item: any[]) {
                    // "shot_made_flag" made missed
                    const made = item[shotData.schema.indexOf('shot_made_flag')];
                    return [item[shotData.schema.indexOf('loc_x')], item[shotData.schema.indexOf('loc_y')], made === 'made' ? 1 : 0];
                }),
                hexagonRadiusInGeo
            );

            const data = hexBinResult.bins.map(function (bin: any) {
                let made = 0;
                bin.points.forEach(function (point: number[]) {
                    made += point[2];
                });
                return [bin.x, bin.y, bin.points.length, ((made / bin.points.length) * 100).toFixed(2)];
            });

            function renderItemHexBin(params: any, api: any) {
                const center = api.coord([api.value(0), api.value(1)]);
                const points = [];
                const pointsBG = [];

                const maxViewRadius = api.size([hexagonRadiusInGeo, 0])[0];
                const minViewRadius = Math.min(maxViewRadius, 4);
                const extentMax = Math.log(Math.sqrt(hexBinResult.maxBinLen));
                const viewRadius = number.linearMap(Math.log(Math.sqrt(api.value(2))), [0, extentMax], [minViewRadius, maxViewRadius]);

                let angle = Math.PI / 6;
                for (let i = 0; i < 6; i++, angle += Math.PI / 3) {
                    points.push([center[0] + viewRadius * Math.cos(angle), center[1] + viewRadius * Math.sin(angle)]);
                    pointsBG.push([center[0] + maxViewRadius * Math.cos(angle), center[1] + maxViewRadius * Math.sin(angle)]);
                }

                return {
                    type: 'group',
                    children: [
                        {
                            type: 'polygon',
                            shape: {
                                points: points
                            },
                            style: {
                                stroke: '#ccc',
                                fill: api.visual('color'),
                                lineWidth: 1
                            }
                        },
                        {
                            type: 'polygon',
                            shape: {
                                points: pointsBG
                            },
                            style: {
                                stroke: null,
                                fill: 'rgba(0,0,0,0.5)',
                                lineWidth: 0
                            },
                            z2: -19
                        }
                    ]
                };
            }

            function renderItemNBACourt(param: any, api: any) {
                return {
                    type: 'group',
                    children: nbaCourt.geometry.map(function (item: any) {
                        return {
                            type: item.type,
                            style: {
                                stroke: '#aaa',
                                fill: null,
                                lineWidth: 1.5
                            },
                            shape: {
                                points: item.points.map(api.coord)
                            }
                        };
                    })
                };
            }

            this.chart.setOption({
                backgroundColor: backgroundColor,
                tooltip: {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    textStyle: {
                        color: '#333'
                    }
                },
                animation: false,
                title: {
                    text: 'Some Player',
                    subtext: 'Regular Season',
                    backgroundColor: backgroundColor,
                    top: 10,
                    left: 10,
                    textStyle: {
                        color: '#eee'
                    }
                },
                legend: {
                    data: ['bar', 'error']
                },
                geo: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    roam: true,
                    silent: true,
                    itemStyle: {
                        color: backgroundColor,
                        borderWidth: 0
                    },
                    map: 'nbaCourt'
                },
                visualMap: {
                    type: 'continuous',
                    orient: 'horizontal',
                    right: 30,
                    top: 40,
                    min: 0,
                    max: 100,
                    align: 'bottom',
                    text: [null, 'FG:   '],
                    dimension: 3,
                    calculable: true,
                    textStyle: {
                        color: '#eee'
                    },
                    formatter: '{value} %',
                    inRange: {
                        // color: ['rgba(241,222,158, 0.3)', 'rgba(241,222,158, 1)']
                        color: ['green', 'yellow']
                    }
                },
                series: [
                    {
                        type: 'custom',
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        renderItem: renderItemHexBin,
                        dimensions: [null, null, 'Field Goals Attempted (hexagon size)', 'Field Goal Percentage (color)'],
                        encode: {
                            tooltip: [2, 3]
                        },
                        data: data
                    },
                    {
                        coordinateSystem: 'geo',
                        type: 'custom',
                        geoIndex: 0,
                        renderItem: renderItemNBACourt,
                        silent: true,
                        data: [0]
                    }
                ]
            });
        });
    }
}
