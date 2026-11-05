import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

// prettier-ignore
const data = [

        [1, 4862.4],
        [2, 5294.7],
        [3, 5934.5],
        [4, 7171.0],
        [5, 8964.4],
        [6, 10202.2],
        [7, 11962.5],
        [8, 14928.3],
        [9, 16909.2],
        [10, 18547.9],
        [11, 21617.8],
        [12, 26638.1],
        [13, 34634.4],
        [14, 46759.4],
        [15, 58478.1],
        [16, 67884.6],
        [17, 74462.6],
        [18, 79395.7]
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
    selector: 'exponential-regression-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>GDP growth 1981-1998 fitted with an exponential regression: the curve is fitted on ln(y) and rendered smooth with its formula label.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ExponentialRegressionDoc {
    fit = linearLeastSquares(data.map(([x, y]) => [x, Math.log(y)] as [number, number]));

    alpha = Math.exp(this.fit.beta0);

    beta = this.fit.beta1;

    regressionPoints = samplePoints(50, data[0][0], data[data.length - 1][0], (x) => this.alpha * Math.exp(this.beta * x)).map(([x, y]) => [x, y, 'y = ' + this.alpha.toFixed(4) + 'e^' + this.beta.toFixed(4) + 'x']);

    options = {
        title: {
            text: '1981 - 1998 gross domestic product GDP (trillion yuan)',
            subtext: 'By ecStat.regression',
            sublink: 'https://github.com/ecomfe/echarts-stat',
            left: 'center'
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
