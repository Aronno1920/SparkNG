import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-drilldown-animation-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Clicking a bar drills into its sub-categories with a <i>universalTransition</i> clone animation; a <i>Back</i> graphic restores the root view.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" (onChartClick)="onClick($event)" />
        </div>
        <app-code></app-code>
    `
})
export class BarDrilldownAnimationDoc {
    private chart: any;

    options: any = {
        xAxis: {
            data: ['Animals', 'Fruits', 'Cars']
        },
        yAxis: {},
        dataGroupId: '',
        animationDurationUpdate: 500,
        series: {
            type: 'bar',
            id: 'sales',
            data: [
                {
                    value: 5,
                    groupId: 'animals'
                },
                {
                    value: 2,
                    groupId: 'fruits'
                },
                {
                    value: 4,
                    groupId: 'cars'
                }
            ],
            universalTransition: {
                enabled: true,
                divideShape: 'clone'
            }
        }
    };

    drilldownData = [
        {
            dataGroupId: 'animals',
            data: [
                ['Cats', 4],
                ['Dogs', 2],
                ['Cows', 1],
                ['Sheep', 2],
                ['Pigs', 1]
            ]
        },
        {
            dataGroupId: 'fruits',
            data: [
                ['Apples', 4],
                ['Oranges', 2]
            ]
        },
        {
            dataGroupId: 'cars',
            data: [
                ['Toyota', 4],
                ['Opel', 2],
                ['Volkswagen', 2]
            ]
        }
    ];

    onInit(event: any): void {
        this.chart = event.chart;
    }

    onClick(event: any): void {
        if (event.data) {
            const subData = this.drilldownData.find((data) => data.dataGroupId === event.data.groupId);
            if (!subData) {
                return;
            }
            this.chart.setOption({
                xAxis: {
                    data: subData.data.map((item) => item[0])
                },
                series: {
                    type: 'bar',
                    id: 'sales',
                    dataGroupId: subData.dataGroupId,
                    data: subData.data.map((item) => item[1]),
                    universalTransition: {
                        enabled: true,
                        divideShape: 'clone'
                    }
                },
                graphic: [
                    {
                        type: 'text',
                        left: 50,
                        top: 20,
                        style: {
                            text: 'Back',
                            fontSize: 18
                        },
                        onclick: () => {
                            this.chart.setOption(this.options);
                        }
                    }
                ]
            });
        }
    }
}
