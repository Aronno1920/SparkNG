import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';
import { color as chartColor } from '@bdspark/sparkng-charts';

@Component({
    selector: 'parallel-nutrients-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Nutrient composition of foods on a vertical parallel layout: a piecewise visualMap tints each food group's polyline with an interpolated hue ladder.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" height="34rem" />
        </div>
        <app-code></app-code>
    `
})
export class ParallelNutrientsDoc {
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

    groupCategories: string[] = [];

    groupColors: string[] = [];

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            fetch('demo/chart/data/nutrients.json')
                .then((response) => response.json())
                .then((data) => {
                    this.normalizeData(data);
                    this.chart.setOption(this.getOption(data));
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
    }

    private getOption(data: number[][]) {
        const lineStyle = {
            width: 0.5,
            opacity: 0.05
        };

        return {
            backgroundColor: '#333',
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1
            },
            title: [
                {
                    text: 'Groups',
                    top: 0,
                    left: 0,
                    textStyle: {
                        color: '#fff'
                    }
                }
            ],
            visualMap: {
                show: true,
                type: 'piecewise',
                categories: this.groupCategories,
                dimension: this.indices.group,
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
            },
            parallelAxis: [
                { dim: 16, name: this.schema[16].name, scale: true, nameLocation: 'end' },
                { dim: 2, name: this.schema[2].name, nameLocation: 'end' },
                { dim: 4, name: this.schema[4].name, nameLocation: 'end' },
                { dim: 3, name: this.schema[3].name, nameLocation: 'end' },
                { dim: 5, name: this.schema[5].name, nameLocation: 'end' },
                { dim: 6, name: this.schema[6].name, nameLocation: 'end' },
                { dim: 7, name: this.schema[7].name, nameLocation: 'end' },
                { dim: 8, name: this.schema[8].name, nameLocation: 'end' },
                { dim: 9, name: this.schema[9].name, nameLocation: 'end' },
                { dim: 10, name: this.schema[10].name, nameLocation: 'end' },
                { dim: 11, name: this.schema[11].name, nameLocation: 'end' },
                { dim: 12, name: this.schema[12].name, nameLocation: 'end' },
                { dim: 13, name: this.schema[13].name, nameLocation: 'end' },
                { dim: 14, name: this.schema[14].name, nameLocation: 'end' },
                { dim: 15, name: this.schema[15].name, nameLocation: 'end' }
            ],
            parallel: {
                left: 280,
                top: 20,
                // top: 150,
                // height: 300,
                width: 400,
                layout: 'vertical',
                parallelAxisDefault: {
                    type: 'value',
                    name: 'nutrients',
                    nameLocation: 'end',
                    nameGap: 20,
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 14
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#aaa'
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: '#777'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        color: '#fff'
                    }
                }
            },
            series: {
                type: 'parallel',
                lineStyle: lineStyle,
                data: data
            }
        };
    }
}
