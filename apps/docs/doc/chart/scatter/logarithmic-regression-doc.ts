import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

// prettier-ignore
const source: any[][] = [

        [28604, 77, 17096869, 'Australia', 1990],
        [31163, 77.4, 27662440, 'Canada', 1990],
        [1516, 68, 1154605773, 'China', 1990],
        [13670, 74.7, 10582082, 'Cuba', 1990],
        [28599, 75, 4986705, 'Finland', 1990],
        [29476, 77.1, 56943299, 'France', 1990],
        [31476, 75.4, 78958237, 'Germany', 1990],
        [28666, 78.1, 254830, 'Iceland', 1990],
        [1777, 57.7, 870601776, 'India', 1990],
        [29550, 79.1, 122249285, 'Japan', 1990],
        [2076, 67.9, 20194354, 'North Korea', 1990],
        [12087, 72, 42972254, 'South Korea', 1990],
        [24021, 75.4, 3397534, 'New Zealand', 1990],
        [43296, 76.8, 4240375, 'Norway', 1990],
        [10088, 70.8, 38195258, 'Poland', 1990],
        [19349, 69.6, 147568552, 'Russia', 1990],
        [10670, 67.3, 53994605, 'Turkey', 1990],
        [26424, 75.7, 57110117, 'United Kingdom', 1990],
        [37062, 75.4, 252847810, 'United States', 1990],
        [44056, 81.8, 23968973, 'Australia', 2015],
        [43294, 81.7, 35939927, 'Canada', 2015],
        [13334, 76.9, 1376048943, 'China', 2015],
        [21291, 78.5, 11389562, 'Cuba', 2015],
        [38923, 80.8, 5503457, 'Finland', 2015],
        [37599, 81.9, 64395345, 'France', 2015],
        [44053, 81.1, 80688545, 'Germany', 2015],
        [42182, 82.8, 329425, 'Iceland', 2015],
        [5903, 66.8, 1311050527, 'India', 2015],
        [36162, 83.5, 126573481, 'Japan', 2015],
        [1390, 71.4, 25155317, 'North Korea', 2015],
        [34644, 80.7, 50293439, 'South Korea', 2015],
        [34186, 80.6, 4528526, 'New Zealand', 2015],
        [64304, 81.6, 5210967, 'Norway', 2015],
        [24787, 77.3, 38611794, 'Poland', 2015],
        [23038, 73.13, 143456918, 'Russia', 2015],
        [19360, 76.5, 78665830, 'Turkey', 2015],
        [38225, 81.4, 64715810, 'United Kingdom', 2015],
        [53354, 79.1, 321773631, 'United States', 2015]
];

function samplePoints(count, minX, maxX, fn) {
    const points = [];
    for (let i = 0; i <= count; i++) {
        const x = minX + ((maxX - minX) * i) / count;
        points.push([+x.toFixed(4), +fn(x).toFixed(4)]);
    }
    return points;
}

function linearLeastSquares(data) {
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    const n = data.length;
    data.forEach(([x, y]) => {
        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumXX += x * x;
    });
    const beta1 = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const beta0 = (sumY - beta1 * sumX) / n;
    return { beta0, beta1 };
}

function polynomialFit(data, order) {
    // Ordinary least squares via normal equations + Gaussian elimination,
    // matching the ecStat regression results.
    const size = order + 1;
    const a = Array.from({ length: size }, () => new Array(size).fill(0));
    const b = new Array(size).fill(0);
    data.forEach(([x, y]) => {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                a[i][j] += Math.pow(x, i + j);
            }
            b[i] += Math.pow(x, i) * y;
        }
    });
    for (let i = 0; i < size; i++) {
        let maxRow = i;
        for (let k = i + 1; k < size; k++) {
            if (Math.abs(a[k][i]) > Math.abs(a[maxRow][i])) maxRow = k;
        }
        [a[i], a[maxRow]] = [a[maxRow], a[i]];
        [b[i], b[maxRow]] = [b[maxRow], b[i]];
        for (let k = i + 1; k < size; k++) {
            const factor = a[k][i] / a[i][i];
            for (let j = i; j < size; j++) a[k][j] -= factor * a[i][j];
            b[k] -= factor * b[i];
        }
    }
    const coeffs = new Array(size).fill(0);
    for (let i = size - 1; i >= 0; i--) {
        let sum = b[i];
        for (let j = i + 1; j < size; j++) sum -= a[i][j] * coeffs[j];
        coeffs[i] = sum / a[i][i];
    }
    return coeffs;
}

@Component({
    selector: 'logarithmic-regression-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Life expectancy versus per capita GDP for 1990 and 2015: each year is a separate scatter series and a logarithmic regression curve labeled with its formula.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class LogarithmicRegressionDoc {
    data1990 = source.filter((row) => row[4] === 1990);

    data2015 = source.filter((row) => row[4] === 2015);

    fit = linearLeastSquares(source.map(([x, y]) => [Math.log(x), y] as [number, number]));

    regressionPoints = samplePoints(50, Math.min(...source.map((d) => d[0])), Math.max(...source.map((d) => d[0])), (x) => this.fit.beta0 + this.fit.beta1 * Math.log(x)).map(([x, y]) => [
        x,
        y,
        'y = ' + this.fit.beta0.toFixed(4) + ' + ' + this.fit.beta1.toFixed(4) + 'ln(x)'
    ]);

    options = {
        title: {
            text: '1990 and 2015 per capita life expectancy and GDP',
            subtext: 'By ecStat.regression',
            sublink: 'https://github.com/ecomfe/echarts-stat',
            left: 'center'
        },
        legend: {
            bottom: 10,
            data: ['1990', '2015']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: '1990',
                type: 'scatter',
                data: this.data1990
            },
            {
                name: '2015',
                type: 'scatter',
                data: this.data2015
            },
            {
                name: 'line',
                type: 'line',
                smooth: true,
                datasetIndex: 3,
                symbolSize: 0.1,
                symbol: 'circle',
                label: { show: true, fontSize: 16 },
                labelLayout: { dx: -20 },
                encode: { label: 2, tooltip: 1 },
                data: this.regressionPoints
            }
        ]
    };
}
