import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

// prettier-ignore
const data = [
  [96.24, 11.35],
  [33.09, 85.11],
  [57.6, 36.61],
  [36.77, 27.26],
  [20.1, 6.72],
  [45.53, 36.37],
  [110.07, 80.13],
  [72.05, 20.88],
  [39.82, 37.15],
  [48.05, 70.5],
  [0.85, 2.57],
  [51.66, 63.7],
  [61.07, 127.13],
  [64.54, 33.59],
  [35.5, 25.01],
  [226.55, 664.02],
  [188.6, 175.31],
  [81.31, 108.68]
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
    selector: 'polynomial-regression-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Net profit versus main business income of 18 companies fitted with a third-order polynomial regression curve.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PolynomialRegressionDoc {
    coefficients = polynomialFit(data, 3);

    polynomial(x: number): number {
        return this.coefficients.reduce((sum, c, i) => sum + c * Math.pow(x, i), 0);
    }

    regressionPoints = samplePoints(100, Math.min(...data.map((d) => d[0])), Math.max(...data.map((d) => d[0])), (x) => this.polynomial(x)).map(([x, y]) => [
        x,
        y,
        'y = ' +
            this.coefficients
                .map((c, i) => (i === 0 ? c.toFixed(2) : c.toFixed(4) + 'x^' + i))
                .reverse()
                .join(' + ')
    ]);

    options = {
        title: {
            text: '18 companies net profit and main business income (million)',
            subtext: 'By ecStat.regression',
            sublink: 'https://github.com/ecomfe/echarts-stat',
            left: 'center',
            top: 16
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
            },
            splitNumber: 20
        },
        yAxis: {
            min: -40,
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            }
        },
        series: [
            {
                name: 'scatter',
                type: 'scatter',
                data: data
            },
            {
                name: 'line',
                type: 'line',
                smooth: true,
                datasetIndex: 1,
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
