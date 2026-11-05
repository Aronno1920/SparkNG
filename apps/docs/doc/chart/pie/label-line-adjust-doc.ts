import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'label-line-adjust-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Three stacked pies of reading time with edge-aligned two-line rich labels, where a custom <i>labelLayout</i> re-anchors the end point of each label line.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class LabelLineAdjustDoc {
    private chart: any;

    options: any = {};

    datas = [
        ////////////////////////////////////////
        [
            { name: 'Visitor from St. Petersburg', value: 5.6 },
            { name: 'Complete Works of Dostoevsky', value: 1 },
            { name: 'Records of the Grand Historian (6 vols)', value: 0.8 },
            { name: "Gardner's Art Through the Ages", value: 0.5 },
            { name: 'Surfaces and Essences', value: 0.5 },
            { name: 'Other', value: 3.8 }
        ],
        // ////////////////////////////////////////
        [
            { name: 'Foundation and Earth', value: 3.8 },
            { name: 'Product Methodology', value: 2.3 },
            { name: 'Art Refugee', value: 2.2 },
            { name: 'The World Crisis (5 vols)', value: 1.3 },
            { name: 'Essential Scrum', value: 1.2 },
            { name: 'Other', value: 5.7 }
        ],

        ////////////////////////////////////////
        [
            { name: 'Klein Bottle', value: 3.5 },
            { name: 'The Most Important Thing', value: 2.8 },
            { name: 'Brief History of China', value: 1.7 },
            { name: 'Educated', value: 1.4 },
            { name: 'Surfaces and Essences', value: 0.5 },
            { name: 'Other', value: 3.8 }
        ]
    ];

    onInit(event: any): void {
        this.chart = event.chart;
        this.chart.setOption(this.buildOptions());
    }

    private buildOptions(): any {
        return {
            title: {
                text: 'Reading Book Distribution',
                left: 'center',
                textStyle: {
                    color: '#999',
                    fontWeight: 'normal',
                    fontSize: 14
                }
            },
            series: this.datas.map((data: any, idx: number) => {
                const top = idx * 33.3;
                return {
                    type: 'pie',
                    radius: [20, 60],
                    top: top + '%',
                    height: '33.33%',
                    left: 'center',
                    width: 400,
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    label: {
                        alignTo: 'edge',
                        formatter: '{name|{b}}\n{time|{c} h}',
                        minMargin: 5,
                        edgeDistance: 10,
                        lineHeight: 15,
                        rich: {
                            time: {
                                fontSize: 10,
                                color: '#999'
                            }
                        }
                    },
                    labelLine: {
                        length: 15,
                        length2: 0,
                        maxSurfaceAngle: 80
                    },
                    labelLayout: (params: any) => {
                        const isLeft = params.labelRect.x < this.chart.getWidth() / 2;
                        const points = params.labelLinePoints as number[][];
                        // Update the end point.
                        points[2][0] = isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width;

                        return {
                            labelLinePoints: points
                        };
                    },
                    data: data
                };
            })
        };
    }
}
