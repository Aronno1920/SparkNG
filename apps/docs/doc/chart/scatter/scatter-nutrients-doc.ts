import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';
import { color as chartColor } from '@bdspark/sparkng-charts';

@Component({
    selector: 'scatter-nutrients-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Protein versus calcium for 1000 foods, colored by food group hue with a calcium-driven color lightness visualMap and motion-blur trails.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterNutrientsDoc {
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
            // Enable trail effect for layer with zlevel = 1
            this.chart.getZr().configLayer(1, {
                motionBlur: true
            });

            fetch('demo/chart/data/nutrients.json')
                .then((response) => response.json())
                .then((originData) => {
                    const data = this.normalizeData(originData).slice(0, 1000);

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

        return originData;
    }

    private getOption(data: (string | number)[][]) {
        return {
            xAxis: {
                name: 'protein',
                splitLine: { show: false }
            },
            yAxis: {
                name: 'calcium',
                splitLine: { show: false }
            },
            visualMap: [
                {
                    show: false,
                    type: 'piecewise',
                    categories: this.groupCategories,
                    dimension: 2,
                    inRange: {
                        color: this.groupColors
                    },
                    outOfRange: {
                        color: ['#ccc']
                    },
                    top: 20,
                    textStyle: {
                        color: '#fff'
                    },
                    realtime: false
                },
                {
                    show: false,
                    dimension: 3,
                    max: 100,
                    inRange: {
                        colorLightness: [0.15, 0.6]
                    }
                }
            ],
            series: [
                {
                    zlevel: 1,
                    name: 'nutrients',
                    type: 'scatter',
                    data: data.map(function (item, idx) {
                        return [item[2], item[3], item[1], idx];
                    }),
                    animationThreshold: 5000,
                    progressiveThreshold: 5000
                }
            ],
            animationEasingUpdate: 'cubicInOut',
            animationDurationUpdate: 2000
        };
    }
}
