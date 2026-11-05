import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'stacked-bar-normalization-variation-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Normalized stacks connected by translucent <i>graphic</i> polygons that visualize the share variation between consecutive categories.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class StackedBarNormalizationVariationDoc {
    rawData = [
        [100, 302, 301, 334, 390, 330, 320],
        [320, 132, 101, 134, 90, 230, 210],
        [220, 182, 191, 234, 290, 330, 310],
        [150, 212, 201, 154, 190, 330, 410],
        [820, 832, 901, 934, 1290, 1330, 1320]
    ];

    totalData: number[] = [];

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        this.buildOptions();
    }

    private buildOptions(): void {
        const myChart = this.chart;
        for (let i = 0; i < this.rawData[0].length; ++i) {
            let sum = 0;
            for (let j = 0; j < this.rawData.length; ++j) {
                sum += this.rawData[j][i];
            }
            this.totalData.push(sum);
        }

        const grid = {
            left: 100,
            right: 100,
            top: 50,
            bottom: 90
        };
        const gridWidth = myChart.getWidth() - grid.left - grid.right;
        const gridHeight = myChart.getHeight() - grid.top - grid.bottom;
        const categoryWidth = gridWidth / this.rawData[0].length;
        const barWidth = categoryWidth * 0.6;
        const barPadding = (categoryWidth - barWidth) / 2;

        const series = ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'].map((name, sid) => {
            return {
                name,
                type: 'bar',
                stack: 'total',
                barWidth: '60%',
                label: {
                    show: true,
                    formatter: (params: any) => Math.round(params.value * 1000) / 10 + '%'
                },
                data: this.rawData[sid].map((d: number, did: number) => (this.totalData[did] <= 0 ? 0 : d / this.totalData[did]))
            };
        });

        const color = ['#5070dd', '#b6d634', '#505372', '#ff994d', '#0ca8df'];
        const elements: any[] = [];
        for (let j = 1, jlen = this.rawData[0].length; j < jlen; ++j) {
            const leftX = grid.left + categoryWidth * j - barPadding;
            const rightX = leftX + barPadding * 2;
            let leftY = grid.top + gridHeight;
            let rightY = leftY;
            for (let i = 0, len = series.length; i < len; ++i) {
                const points: number[][] = [];
                const leftBarHeight = (this.rawData[i][j - 1] / this.totalData[j - 1]) * gridHeight;
                points.push([leftX, leftY]);
                points.push([leftX, leftY - leftBarHeight]);
                const rightBarHeight = (this.rawData[i][j] / this.totalData[j]) * gridHeight;
                points.push([rightX, rightY - rightBarHeight]);
                points.push([rightX, rightY]);
                points.push([leftX, leftY]);

                leftY -= leftBarHeight;
                rightY -= rightBarHeight;

                elements.push({
                    type: 'polygon',
                    shape: {
                        points
                    },
                    style: {
                        fill: color[i],
                        opacity: 0.25
                    }
                });
            }
        }

        this.options = {
            legend: {
                selectedMode: false
            },
            grid,
            yAxis: {
                type: 'value'
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            series,
            graphic: {
                elements
            }
        };
    }
}
