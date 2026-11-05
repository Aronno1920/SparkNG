import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

const schema = [
    { name: 'AQIindex', index: 1, text: 'AQI' },
    { name: 'PM25', index: 2, text: 'PM 2.5' },
    { name: 'PM10', index: 3, text: 'PM 10' },
    { name: 'CO', index: 4, text: 'CO' },
    { name: 'NO2', index: 5, text: 'NO₂' },
    { name: 'SO2', index: 6, text: 'SO₂' },
    { name: 'grade', index: 7, text: 'Grade' }
];
// prettier-ignore
const rawData = [
  [55, 9, 56, 0.46, 18, 6, 'Good', 'Beijing'],
  [25, 11, 21, 0.65, 34, 9, 'Excellent', 'Beijing'],
  [56, 7, 63, 0.3, 14, 5, 'Good', 'Beijing'],
  [33, 7, 29, 0.33, 16, 6, 'Excellent', 'Beijing'],
  [42, 24, 44, 0.76, 40, 16, 'Excellent', 'Beijing'],
  [82, 58, 90, 1.77, 68, 33, 'Good', 'Beijing'],
  [74, 49, 77, 1.46, 48, 27, 'Good', 'Beijing'],
  [78, 55, 80, 1.29, 59, 29, 'Good', 'Beijing'],
  [267, 216, 280, 4.8, 108, 64, 'Heavy', 'Beijing'],
  [185, 127, 216, 2.52, 61, 27, 'Moderate', 'Beijing'],
  [39, 19, 38, 0.57, 31, 15, 'Excellent', 'Beijing'],
  [41, 11, 40, 0.43, 21, 7, 'Excellent', 'Beijing'],
  [64, 38, 74, 1.04, 46, 22, 'Good', 'Beijing'],
  [108, 79, 120, 1.7, 75, 41, 'Light', 'Beijing'],
  [108, 63, 116, 1.48, 44, 26, 'Light', 'Beijing'],
  [33, 6, 29, 0.34, 13, 5, 'Excellent', 'Beijing'],
  [94, 66, 110, 1.54, 62, 31, 'Good', 'Beijing'],
  [186, 142, 192, 3.88, 93, 79, 'Moderate', 'Beijing'],
  [57, 31, 54, 0.96, 32, 14, 'Good', 'Beijing'],
  [22, 8, 17, 0.48, 23, 10, 'Excellent', 'Beijing'],
  [39, 15, 36, 0.61, 29, 13, 'Excellent', 'Beijing'],
  [94, 69, 114, 2.08, 73, 39, 'Good', 'Beijing'],
  [99, 73, 110, 2.43, 76, 48, 'Good', 'Beijing'],
  [31, 12, 30, 0.5, 32, 16, 'Excellent', 'Beijing'],
  [42, 27, 43, 1, 53, 22, 'Excellent', 'Beijing'],
  [154, 117, 157, 3.05, 92, 58, 'Moderate', 'Beijing'],
  [234, 185, 230, 4.09, 123, 69, 'Heavy', 'Beijing'],
  [160, 120, 186, 2.77, 91, 50, 'Moderate', 'Beijing'],
  [134, 96, 165, 2.76, 83, 41, 'Light', 'Beijing'],
  [52, 24, 60, 1.03, 50, 21, 'Good', 'Beijing'],
  [46, 5, 49, 0.28, 10, 6, 'Excellent', 'Beijing'],

  [26, 37, 27, 1.163, 27, 13, 'Excellent', 'Guangzhou'],
  [85, 62, 71, 1.195, 60, 8, 'Good', 'Guangzhou'],
  [78, 38, 74, 1.363, 37, 7, 'Good', 'Guangzhou'],
  [21, 21, 36, 0.634, 40, 9, 'Excellent', 'Guangzhou'],
  [41, 42, 46, 0.915, 81, 13, 'Excellent', 'Guangzhou'],
  [56, 52, 69, 1.067, 92, 16, 'Good', 'Guangzhou'],
  [64, 30, 28, 0.924, 51, 2, 'Good', 'Guangzhou'],
  [55, 48, 74, 1.236, 75, 26, 'Good', 'Guangzhou'],
  [76, 85, 113, 1.237, 114, 27, 'Good', 'Guangzhou'],
  [91, 81, 104, 1.041, 56, 40, 'Good', 'Guangzhou'],
  [84, 39, 60, 0.964, 25, 11, 'Good', 'Guangzhou'],
  [64, 51, 101, 0.862, 58, 23, 'Good', 'Guangzhou'],
  [70, 69, 120, 1.198, 65, 36, 'Good', 'Guangzhou'],
  [77, 105, 178, 2.549, 64, 16, 'Good', 'Guangzhou'],
  [109, 68, 87, 0.996, 74, 29, 'Light', 'Guangzhou'],
  [73, 68, 97, 0.905, 51, 34, 'Good', 'Guangzhou'],
  [54, 27, 47, 0.592, 53, 12, 'Good', 'Guangzhou'],
  [51, 61, 97, 0.811, 65, 19, 'Good', 'Guangzhou'],
  [91, 71, 121, 1.374, 43, 18, 'Good', 'Guangzhou'],
  [73, 102, 182, 2.787, 44, 19, 'Good', 'Guangzhou'],
  [73, 50, 76, 0.717, 31, 20, 'Good', 'Guangzhou'],
  [84, 94, 140, 2.238, 68, 18, 'Good', 'Guangzhou'],
  [93, 77, 104, 1.165, 53, 7, 'Good', 'Guangzhou'],
  [99, 130, 227, 3.97, 55, 15, 'Good', 'Guangzhou'],
  [146, 84, 139, 1.094, 40, 17, 'Light', 'Guangzhou'],
  [113, 108, 137, 1.481, 48, 15, 'Light', 'Guangzhou'],
  [81, 48, 62, 1.619, 26, 3, 'Good', 'Guangzhou'],
  [56, 48, 68, 1.336, 37, 9, 'Good', 'Guangzhou'],
  [82, 92, 174, 3.29, 0, 13, 'Good', 'Guangzhou'],
  [106, 116, 188, 3.628, 101, 16, 'Light', 'Guangzhou'],
  [118, 50, 0, 1.383, 76, 11, 'Light', 'Guangzhou'],

  [91, 45, 125, 0.82, 34, 23, 'Good', 'Shanghai'],
  [65, 27, 78, 0.86, 45, 29, 'Good', 'Shanghai'],
  [83, 60, 84, 1.09, 73, 27, 'Good', 'Shanghai'],
  [109, 81, 121, 1.28, 68, 51, 'Light', 'Shanghai'],
  [106, 77, 114, 1.07, 55, 51, 'Light', 'Shanghai'],
  [109, 81, 121, 1.28, 68, 51, 'Light', 'Shanghai'],
  [106, 77, 114, 1.07, 55, 51, 'Light', 'Shanghai'],
  [89, 65, 78, 0.86, 51, 26, 'Good', 'Shanghai'],
  [53, 33, 47, 0.64, 50, 17, 'Good', 'Shanghai'],
  [80, 55, 80, 1.01, 75, 24, 'Good', 'Shanghai'],
  [117, 81, 124, 1.03, 45, 24, 'Light', 'Shanghai'],
  [99, 71, 142, 1.1, 62, 42, 'Good', 'Shanghai'],
  [95, 69, 130, 1.28, 74, 50, 'Good', 'Shanghai'],
  [116, 87, 131, 1.47, 84, 40, 'Light', 'Shanghai'],
  [108, 80, 121, 1.3, 85, 37, 'Light', 'Shanghai'],
  [134, 83, 167, 1.16, 57, 43, 'Light', 'Shanghai'],
  [79, 43, 107, 1.05, 59, 37, 'Good', 'Shanghai'],
  [71, 46, 89, 0.86, 64, 25, 'Good', 'Shanghai'],
  [97, 71, 113, 1.17, 88, 31, 'Good', 'Shanghai'],
  [84, 57, 91, 0.85, 55, 31, 'Good', 'Shanghai'],
  [87, 63, 101, 0.9, 56, 41, 'Good', 'Shanghai'],
  [104, 77, 119, 1.09, 73, 48, 'Light', 'Shanghai'],
  [87, 62, 100, 1, 72, 28, 'Good', 'Shanghai'],
  [168, 128, 172, 1.49, 97, 56, 'Moderate', 'Shanghai'],
  [65, 45, 51, 0.74, 39, 17, 'Good', 'Shanghai'],
  [39, 24, 38, 0.61, 47, 17, 'Excellent', 'Shanghai'],
  [39, 24, 39, 0.59, 50, 19, 'Excellent', 'Shanghai'],
  [93, 68, 96, 1.05, 79, 29, 'Good', 'Shanghai'],
  [188, 143, 197, 1.66, 99, 51, 'Moderate', 'Shanghai'],
  [174, 131, 174, 1.55, 108, 50, 'Moderate', 'Shanghai'],
  [187, 143, 201, 1.39, 89, 53, 'Moderate', 'Shanghai']
];

const CATEGORY_DIM_COUNT = 6;
const GAP = 2;
const BASE_LEFT = 5;
const BASE_TOP = 10;
// const GRID_WIDTH = 220;
// const GRID_HEIGHT = 220;
const GRID_WIDTH = (100 - BASE_LEFT - GAP) / CATEGORY_DIM_COUNT - GAP;
const GRID_HEIGHT = (100 - BASE_TOP - GAP) / CATEGORY_DIM_COUNT - GAP;
const CATEGORY_DIM = 7;
const SYMBOL_SIZE = 4;

function retrieveScatterData(data: (number | string)[][], dimX: number, dimY: number) {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        const item = [data[i][dimX], data[i][dimY]];
        item[CATEGORY_DIM] = data[i][CATEGORY_DIM];
        result.push(item);
    }
    return result;
}

function generateGrids() {
    let index = 0;

    const grid: any[] = [];
    const xAxis: any[] = [];
    const yAxis: any[] = [];
    const series: any[] = [];

    for (let i = 0; i < CATEGORY_DIM_COUNT; i++) {
        for (let j = 0; j < CATEGORY_DIM_COUNT; j++) {
            if (CATEGORY_DIM_COUNT - i + j >= CATEGORY_DIM_COUNT) {
                continue;
            }

            grid.push({
                left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
                top: BASE_TOP + j * (GRID_HEIGHT + GAP) + '%',
                width: GRID_WIDTH + '%',
                height: GRID_HEIGHT + '%'
            });

            xAxis.push({
                splitNumber: 3,
                position: 'top',
                axisLine: {
                    show: j === 0,
                    onZero: false
                },
                axisTick: {
                    show: j === 0,
                    inside: true
                },
                axisLabel: {
                    show: j === 0
                },
                type: 'value',
                gridIndex: index,
                scale: true
            });

            yAxis.push({
                splitNumber: 3,
                position: 'right',
                axisLine: {
                    show: i === CATEGORY_DIM_COUNT - 1,
                    onZero: false
                },
                axisTick: {
                    show: i === CATEGORY_DIM_COUNT - 1,
                    inside: true
                },
                axisLabel: {
                    show: i === CATEGORY_DIM_COUNT - 1
                },
                type: 'value',
                gridIndex: index,
                scale: true
            });

            series.push({
                type: 'scatter',
                symbolSize: SYMBOL_SIZE,
                xAxisIndex: index,
                yAxisIndex: index,
                data: retrieveScatterData(rawData, i, j)
            });

            index++;
        }
    }

    return { grid, xAxis, yAxis, series };
}

const gridOption = generateGrids();

@Component({
    selector: 'scatter-matrix-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Air quality of Beijing, Shanghai and Guangzhou shown as a lower-triangular scatter matrix plus a parallel coordinates strip, all brush-linked and colored by city.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" height="34rem" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterMatrixDoc {
    options = {
        animation: false,
        brush: {
            brushLink: 'all',
            xAxisIndex: gridOption.xAxis.map(function (_, idx) {
                return idx;
            }),
            yAxisIndex: gridOption.yAxis.map(function (_, idx) {
                return idx;
            }),
            inBrush: {
                opacity: 1
            }
        },
        visualMap: {
            type: 'piecewise',
            categories: ['Beijing', 'Shanghai', 'Guangzhou'],
            dimension: CATEGORY_DIM,
            orient: 'horizontal',
            top: 0,
            left: 'center',
            inRange: {
                color: ['#51689b', '#ce5c5c', '#fbc357']
            },
            outOfRange: {
                color: '#ddd'
            },
            seriesIndex: gridOption.series.map(function (_, idx) {
                return idx;
            })
        },
        tooltip: {
            trigger: 'item'
        },
        parallelAxis: [
            { dim: 0, name: schema[0].text },
            { dim: 1, name: schema[1].text },
            { dim: 2, name: schema[2].text },
            { dim: 3, name: schema[3].text },
            { dim: 4, name: schema[4].text },
            { dim: 5, name: schema[5].text },
            {
                dim: 6,
                name: schema[6].text,
                type: 'category',
                data: ['Excellent', 'Good', 'Light', 'Moderate', 'Heavy', 'Severe']
            }
        ],
        parallel: {
            bottom: '5%',
            left: '2%',
            height: '30%',
            width: '55%',
            parallelAxisDefault: {
                type: 'value',
                name: 'AQI Index',
                nameLocation: 'end',
                nameGap: 20,
                splitNumber: 3,
                nameTextStyle: {
                    fontSize: 14
                },
                axisLine: {
                    lineStyle: {
                        color: '#555'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#555'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    color: '#555'
                }
            }
        },
        xAxis: gridOption.xAxis,
        yAxis: gridOption.yAxis,
        grid: gridOption.grid,
        series: [
            {
                name: 'parallel',
                type: 'parallel',
                smooth: true,
                lineStyle: {
                    width: 1,
                    opacity: 0.3
                },
                data: rawData
            },
            ...gridOption.series
        ]
    };
}
