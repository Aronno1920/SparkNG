import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';
import { color as chartColor } from '@bdspark/sparkng-charts';

@Component({
    selector: 'scatter-nutrients-matrix-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A 2x2 nutrient scatter matrix (carbohydrate/potassium by calcium/fiber) with linked axis pointers, per-axis dataZoom sliders and a group-colored piecewise visualMap.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterNutrientsMatrixDoc {
    private platformId = inject(PLATFORM_ID);

    indices = {
        name: 0,
        group: 1,
        id: 16
    };

    schema = [
        { name: 'name', index: 0 },
        { name: 'group', index: 1 },
        { name: 'protein', index: 2 },
        { name: 'calcium', index: 3 },
        { name: 'sodium', index: 4 },
        { name: 'fiber', index: 5 },
        { name: 'vitaminc', index: 6 },
        { name: 'potassium', index: 7 },
        { name: 'carbohydrate', index: 8 },
        { name: 'sugars', index: 9 },
        { name: 'fat', index: 10 },
        { name: 'water', index: 11 },
        { name: 'calories', index: 12 },
        { name: 'saturated', index: 13 },
        { name: 'monounsat', index: 14 },
        { name: 'polyunsat', index: 15 },
        { name: 'id', index: 16 }
    ];

    axisColors: Record<string, string> = {
        xAxisLeft: '#2A8339',
        xAxisRight: '#367DA6',
        yAxisTop: '#A68B36',
        yAxisBottom: '#BD5692'
    };

    // Default playground config values baked in (xAxisLeft/xAxisRight/yAxisTop/yAxisBottom).
    config: Record<string, string> = {
        xAxisLeft: 'carbohydrate',
        yAxisTop: 'calcium',
        xAxisRight: 'potassium',
        yAxisBottom: 'fiber'
    };

    colorBySchema: Record<string, string> = {};

    fieldIndices = this.schema.reduce(
        function (obj, item) {
            obj[item.name] = item.index;
            return obj;
        },
        {} as Record<string, number>
    );

    groupCategories: string[] = [];

    groupColors: string[] = [];

    data: (number | string)[][];

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            // zlevel 为 1 的层开启尾迹特效
            this.chart.getZr().configLayer(1, {
                motionBlur: true
            });

            fetch('demo/chart/data/nutrients.json')
                .then((response) => response.json())
                .then((originData) => {
                    this.data = this.normalizeData(originData).slice(0, 1000);

                    this.chart.setOption(this.getOption());
                });
        }
    }

    private normalizeData(originData: (number | string)[][]) {
        const groupMap: Record<string, number> = {};
        originData.forEach((row) => {
            const groupName = row[this.indices.group] as string;
            if (!groupMap.hasOwnProperty(groupName)) {
                groupMap[groupName] = 1;
            }
        });

        originData.forEach((row) => {
            row.forEach((item, index) => {
                if (index !== this.indices.name && index !== this.indices.group && index !== this.indices.id) {
                    // Convert null to zero, as all of them under unit "g".
                    row[index] = parseFloat(item as string) || 0;
                }
            });
        });

        for (const groupName in groupMap) {
            if (groupMap.hasOwnProperty(groupName)) {
                this.groupCategories.push(groupName);
            }
        }
        const hStep = Math.round(300 / (this.groupCategories.length - 1));
        for (let i = 0; i < this.groupCategories.length; i++) {
            this.groupColors.push(chartColor.modifyHSL('#5A94DF', hStep * i));
        }

        return originData;
    }

    private makeAxis(dimIndex: 0 | 1, id: string, name: string, nameLocation: any) {
        const axisColor = this.axisColors[id.split('-')[dimIndex]];
        this.colorBySchema[name] = axisColor;
        return {
            id: id,
            name: name,
            nameLocation: nameLocation,
            nameGap: nameLocation === 'middle' ? 30 : 10,
            gridId: id,
            splitLine: { show: false },
            axisLine: {
                lineStyle: {
                    color: axisColor
                }
            },
            axisLabel: {
                color: axisColor
            },
            axisTick: {
                lineStyle: {
                    color: axisColor
                }
            }
        };
    }

    private makeSeriesData(xLeftOrRight: string, yTopOrBottom: string): (number | string)[][] {
        return this.data.map((item, idx) => {
            const schemaX = this.config[xLeftOrRight];
            const schemaY = this.config[yTopOrBottom];
            return [
                item[this.fieldIndices[schemaX]], // 0: xValue
                item[this.fieldIndices[schemaY]], // 1: yValue
                item[1], // 2: group
                item[0], // 3: name
                schemaX, // 4: schemaX
                schemaY, // 5: schemaY
                idx // 6
            ];
        });
    }

    private makeSeries(xLeftOrRight: string, yTopOrBottom: string) {
        const id = xLeftOrRight + '-' + yTopOrBottom;
        return {
            zlevel: 1,
            type: 'scatter',
            name: 'nutrients',
            xAxisId: id,
            yAxisId: id,
            symbolSize: 8,
            emphasis: {
                itemStyle: {
                    color: '#fff'
                }
            },
            data: this.makeSeriesData(xLeftOrRight, yTopOrBottom)
        };
    }

    private makeDataZoom(opt: any) {
        return Object.assign(
            {
                type: 'slider',
                filterMode: 'empty',
                realtime: false
            },
            opt
        );
    }

    private tooltipFormatter(params: any[]): string {
        // Remove duplicate by data name.
        const mapByDataName: Record<string, Record<string, string>> = {};
        const mapOnDim: Record<string, Record<string, Record<string, string>>> = {
            x: {},
            y: {},
            xy: {}
        };
        params.forEach((item: any) => {
            const data = item.data;
            const dataName = data[3];
            const mapItem = mapByDataName[dataName] || (mapByDataName[dataName] = {});
            mapItem[data[4]] = data[0];
            mapItem[data[5]] = data[1];
            mapOnDim[item.axisDim][dataName] = mapItem;
        });
        Object.keys(mapByDataName).forEach(function (dataName) {
            if (mapOnDim.x[dataName] && mapOnDim.y[dataName]) {
                mapOnDim.xy[dataName] = mapByDataName[dataName];
                delete mapOnDim.x[dataName];
                delete mapOnDim.y[dataName];
            }
        });
        const resultHTML: string[] = [];
        [
            ['xy', 'CROSS'],
            ['x', 'V LINE'],
            ['y', 'H LINE']
        ].forEach((dimDefine) => {
            const html: string[] = [];
            Object.keys(mapOnDim[dimDefine[0]]).forEach((dataName) => {
                const mapItem = mapOnDim[dimDefine[0]][dataName];
                const valuesHTML: string[] = [];
                Object.keys(mapItem).forEach(function (dataName) {
                    valuesHTML.push('<span style="color:' + this.colorBySchema[dataName] + '">' + dataName + '</span>: ' + mapItem[dataName]);
                }, this);
                html.push('<div style="margin: 10px 0">' + dataName + '<br/>' + valuesHTML.join('<br/>') + '</div>');
            }, this);
            html.length && resultHTML.push('<div style="margin: 10px 0">' + '<div style="font-size: 16px; color: #aaa">POINTS ON ' + dimDefine[1] + '</div>' + html.join('') + '</div>');
        });
        return resultHTML.join('');
    }

    private getOption(): any {
        const gridWidth = '35%';
        const gridHeight = '35%';
        const gridLeft = 80;
        const gridRight = 50;
        const gridTop = 50;
        const gridBottom = 80;

        return {
            tooltip: {
                trigger: 'none',
                padding: [10, 20, 10, 20],
                backgroundColor: 'rgba(0,0,0,0.7)',
                transitionDuration: 0,
                extraCssText: 'width: 300px; white-space: normal',
                textStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                position: function (pos: number[], params: any, el: any, elRect: any, size: any) {
                    const obj: Record<string, number> = {};
                    obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 60;
                    obj[['top', 'bottom'][+(pos[1] < size.viewSize[1] / 2)]] = 20;
                    return obj;
                },
                formatter: (params: any[]) => this.tooltipFormatter(params)
            },
            axisPointer: {
                show: true,
                snap: true,
                lineStyle: {
                    type: 'dashed'
                },
                label: {
                    show: true,
                    margin: 6,
                    backgroundColor: '#556',
                    color: '#fff'
                },
                link: [
                    {
                        xAxisId: ['xAxisLeft-yAxisTop', 'xAxisLeft-yAxisBottom']
                    },
                    {
                        xAxisId: ['xAxisRight-yAxisTop', 'xAxisRight-yAxisBottom']
                    },
                    {
                        yAxisId: ['xAxisLeft-yAxisTop', 'xAxisRight-yAxisTop']
                    },
                    {
                        yAxisId: ['xAxisLeft-yAxisBottom', 'xAxisRight-yAxisBottom']
                    }
                ]
            },
            xAxis: [
                this.makeAxis(0, 'xAxisLeft-yAxisTop', 'carbohydrate', 'middle'),
                this.makeAxis(0, 'xAxisLeft-yAxisBottom', 'carbohydrate', 'middle'),
                this.makeAxis(0, 'xAxisRight-yAxisTop', 'potassium', 'middle'),
                this.makeAxis(0, 'xAxisRight-yAxisBottom', 'potassium', 'middle')
            ],
            yAxis: [
                this.makeAxis(1, 'xAxisLeft-yAxisTop', 'calcium', 'end'),
                this.makeAxis(1, 'xAxisLeft-yAxisBottom', 'fiber', 'end'),
                this.makeAxis(1, 'xAxisRight-yAxisTop', 'calcium', 'end'),
                this.makeAxis(1, 'xAxisRight-yAxisBottom', 'fiber', 'end')
            ],
            grid: [
                {
                    id: 'xAxisLeft-yAxisTop',
                    left: gridLeft,
                    top: gridTop,
                    width: gridWidth,
                    height: gridHeight
                },
                {
                    id: 'xAxisLeft-yAxisBottom',
                    left: gridLeft,
                    bottom: gridBottom,
                    width: gridWidth,
                    height: gridHeight
                },
                {
                    id: 'xAxisRight-yAxisTop',
                    right: gridRight,
                    top: gridTop,
                    width: gridWidth,
                    height: gridHeight
                },
                {
                    id: 'xAxisRight-yAxisBottom',
                    right: gridRight,
                    bottom: gridBottom,
                    width: gridWidth,
                    height: gridHeight
                }
            ],
            dataZoom: [
                this.makeDataZoom({
                    width: gridWidth,
                    height: 20,
                    left: gridLeft,
                    bottom: 10,
                    xAxisIndex: [0, 1]
                }),
                this.makeDataZoom({
                    width: gridWidth,
                    height: 20,
                    right: gridRight,
                    bottom: 10,
                    xAxisIndex: [2, 3]
                }),
                this.makeDataZoom({
                    orient: 'vertical',
                    width: 20,
                    height: gridHeight,
                    left: 10,
                    top: gridTop,
                    yAxisIndex: [0, 2]
                }),
                this.makeDataZoom({
                    orient: 'vertical',
                    width: 20,
                    height: gridHeight,
                    left: 10,
                    bottom: gridBottom,
                    yAxisIndex: [1, 3]
                })
            ],
            visualMap: [
                {
                    show: false,
                    type: 'piecewise',
                    categories: this.groupCategories,
                    dimension: 2,
                    inRange: {
                        color: this.groupColors //['#d94e5d','#eac736','#50a3ba']
                    },
                    outOfRange: {
                        color: ['#ccc'] //['#d94e5d','#eac736','#50a3ba']
                    },
                    top: 20,
                    textStyle: {
                        color: '#fff'
                    },
                    realtime: false
                }
            ],
            series: [this.makeSeries('xAxisLeft', 'yAxisTop'), this.makeSeries('xAxisLeft', 'yAxisBottom'), this.makeSeries('xAxisRight', 'yAxisTop'), this.makeSeries('xAxisRight', 'yAxisBottom')],
            animationThreshold: 5000,
            progressiveThreshold: 5000,
            animationEasingUpdate: 'cubicInOut',
            animationDurationUpdate: 2000
        };
    }
}
