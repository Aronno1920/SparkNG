import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'animation-delay-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>One hundred columns enter with a per-index <i>animationDelay</i> and an <i>elasticOut</i> easing; the second series trails the first by 100 ms.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class AnimationDelayDoc {
    xAxisData: string[] = [];
    data1: number[] = [];
    data2: number[] = [];

    options: any;

    constructor() {
        for (let i = 0; i < 100; i++) {
            this.xAxisData.push('A' + i);
            this.data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
            this.data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }

        this.options = {
            title: {
                text: 'Bar Animation Delay'
            },
            legend: {
                data: ['bar', 'bar2']
            },
            toolbox: {
                feature: {
                    magicType: {
                        type: ['stack']
                    },
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {},
            xAxis: {
                data: this.xAxisData,
                splitLine: {
                    show: false
                }
            },
            yAxis: {},
            series: [
                {
                    name: 'bar',
                    type: 'bar',
                    data: this.data1,
                    emphasis: {
                        focus: 'series'
                    },
                    animationDelay: function (idx: number) {
                        return idx * 10;
                    }
                },
                {
                    name: 'bar2',
                    type: 'bar',
                    data: this.data2,
                    emphasis: {
                        focus: 'series'
                    },
                    animationDelay: function (idx: number) {
                        return idx * 10 + 100;
                    }
                }
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx: number) {
                return idx * 5;
            }
        };
    }
}
