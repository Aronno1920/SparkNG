import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'function-plot-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Mathematical functions plotted by generating the points from a formula — here sine, its harmonic and their sum.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class FunctionPlotDoc {
    private readonly step = 0.1;

    private generate(fn: (x: number) => number): [number, number][] {
        const points: [number, number][] = [];
        for (let x = -Math.PI * 2; x <= Math.PI * 2; x += this.step) {
            points.push([+x.toFixed(2), +fn(x).toFixed(4)]);
        }
        return points;
    }

    options = {
        tooltip: { trigger: 'axis' },
        legend: {},
        grid: { left: 48, right: 24 },
        xAxis: { type: 'value' },
        yAxis: { type: 'value' },
        series: [
            {
                name: 'sin(x)',
                type: 'line',
                showSymbol: false,
                clip: true,
                data: this.generate(Math.sin)
            },
            {
                name: 'sin(2x) / 2',
                type: 'line',
                showSymbol: false,
                clip: true,
                data: this.generate((x) => Math.sin(2 * x) / 2)
            },
            {
                name: 'sum',
                type: 'line',
                showSymbol: false,
                clip: true,
                lineStyle: { width: 3 },
                data: this.generate((x) => Math.sin(x) + Math.sin(2 * x) / 2)
            }
        ]
    };
}
