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

function samplePoints(count: number, minX: number, maxX: number, fn: (x: number) => number, formula?: string) {
    const points: (number | string)[][] = [];
    for (let i = 0; i <= count; i++) {
        const x = minX + ((maxX - minX) * i) / count;
        const pt: (number | string)[] = [+x.toFixed(4), +fn(x).toFixed(4)];
        if (formula) {
            pt.push(formula);
        }
        points.push(pt);
    }
    return points;
}

function linearLeastSquares(data: [number, number][]) {
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

@Component({
    selector: 'exponential-regression-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>GDP growth 1981-1998 fitted with an exponential regression: the curve is fitted on ln(y) and rendered smooth with its formula label on hover.</p>
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

    formula = 'y = ' + this.alpha.toFixed(4) + 'e^' + this.beta.toFixed(4) + 'x';

    regressionPoints = samplePoints(50, data[0][0], data[data.length - 1][0], (x) => this.alpha * Math.exp(this.beta * x), this.formula);

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
                data: data,
                emphasis: {
                    focus: 'series',
                    label: {
                        show: true,
                        position: 'top'
                    }
                }
            },
            {
                name: 'line',
                type: 'line',
                smooth: true,
                symbolSize: 0.1,
                symbol: 'circle',
                label: {
                    show: false,
                    position: 'top'
                },
                emphasis: {
                    focus: 'series',
                    label: {
                        show: true,
                        fontSize: 16,
                        position: 'top',
                        formatter: this.formula
                    }
                },
                labelLayout: { dx: -20 },
                encode: { label: 2, tooltip: 1 },
                data: this.regressionPoints
            }
        ]
    };
}
