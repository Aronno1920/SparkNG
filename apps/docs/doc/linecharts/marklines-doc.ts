import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'marklines-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Comprehensive demonstration of all <i>markLine</i> label placements, offsets, and diagonal coordinate lines.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MarklinesDoc {
    options: any;

    constructor() {
        const markLine: any[] = [];
        const positions = ['start', 'middle', 'end', 'insideStart', 'insideStartTop', 'insideStartBottom', 'insideMiddle', 'insideMiddleTop', 'insideMiddleBottom', 'insideEnd', 'insideEndTop', 'insideEndBottom'] as const;

        for (let i = 0; i < positions.length; ++i) {
            markLine.push({
                name: positions[i],
                yAxis: 1.8 - 0.2 * Math.floor(i / 3),
                label: {
                    formatter: '{b}',
                    position: positions[i]
                }
            });

            if (positions[i] !== 'middle') {
                const name = positions[i] === 'insideMiddle' ? 'insideMiddle / middle' : positions[i];

                markLine.push([
                    {
                        name: 'start: ' + positions[i],
                        coord: [0, 0.3],
                        label: {
                            formatter: name,
                            position: positions[i]
                        }
                    },
                    {
                        name: 'end: ' + positions[i],
                        coord: [3, 1]
                    }
                ]);
            }
        }

        this.options = {
            animation: false,
            textStyle: {
                fontSize: 14
            },
            xAxis: {
                data: ['A', 'B', 'C', 'D', 'E'],
                boundaryGap: true,
                splitArea: {
                    show: true
                }
            },
            yAxis: {
                max: 2
            },
            series: [
                {
                    name: 'line',
                    type: 'line',
                    stack: 'all',
                    symbolSize: 6,
                    data: [0.3, 1.4, 1.2, 1, 0.6],
                    markLine: {
                        data: markLine,
                        label: {
                            distance: [20, 8]
                        }
                    }
                }
            ],
            grid: {
                top: 30,
                left: 60,
                right: 60,
                bottom: 40
            }
        };
    }
}
