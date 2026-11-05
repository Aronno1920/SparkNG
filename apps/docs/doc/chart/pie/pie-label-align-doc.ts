import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'pie-label-align-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Three pies of the same data comparing outer label alignment modes: <i>alignTo</i> 'none' (default), 'labelLine' and 'edge'.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PieLabelAlignDoc {
    data = [
        {
            name: 'Apples',
            value: 70
        },
        {
            name: 'Strawberries',
            value: 68
        },
        {
            name: 'Bananas',
            value: 48
        },
        {
            name: 'Oranges',
            value: 40
        },
        {
            name: 'Pears',
            value: 32
        },
        {
            name: 'Pineapples',
            value: 27
        },
        {
            name: 'Grapes',
            value: 18
        }
    ];

    options = {
        title: [
            {
                text: 'Pie label alignTo',
                left: 'center'
            },
            {
                subtext: 'alignTo: "none" (default)',
                left: '16.67%',
                top: '75%',
                textAlign: 'center'
            },
            {
                subtext: 'alignTo: "labelLine"',
                left: '50%',
                top: '75%',
                textAlign: 'center'
            },
            {
                subtext: 'alignTo: "edge"',
                left: '83.33%',
                top: '75%',
                textAlign: 'center'
            }
        ],
        series: [
            {
                type: 'pie',
                radius: '25%',
                center: ['50%', '50%'],
                data: this.data,
                label: {
                    position: 'outer',
                    alignTo: 'none',
                    bleedMargin: 5
                },
                left: 0,
                right: '66.6667%',
                top: 0,
                bottom: 0
            },
            {
                type: 'pie',
                radius: '25%',
                center: ['50%', '50%'],
                data: this.data,
                label: {
                    position: 'outer',
                    alignTo: 'labelLine',
                    bleedMargin: 5
                },
                left: '33.3333%',
                right: '33.3333%',
                top: 0,
                bottom: 0
            },
            {
                type: 'pie',
                radius: '25%',
                center: ['50%', '50%'],
                data: this.data,
                label: {
                    position: 'outer',
                    alignTo: 'edge',
                    margin: 20
                },
                left: '66.6667%',
                right: 0,
                top: 0,
                bottom: 0
            }
        ]
    };
}
