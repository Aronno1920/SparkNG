import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-sunburst-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Basic sunburst of a family tree, from Grandpa and Nancy down to cousins, with radially rotated labels.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BasicSunburstDoc {
    data = [
        {
            name: 'Grandpa',
            children: [
                {
                    name: 'Uncle Leo',
                    value: 15,
                    children: [
                        {
                            name: 'Cousin Jack',
                            value: 2
                        },
                        {
                            name: 'Cousin Mary',
                            value: 5,
                            children: [
                                {
                                    name: 'Jackson',
                                    value: 2
                                }
                            ]
                        },
                        {
                            name: 'Cousin Ben',
                            value: 4
                        }
                    ]
                },
                {
                    name: 'Father',
                    value: 10,
                    children: [
                        {
                            name: 'Me',
                            value: 5
                        },
                        {
                            name: 'Brother Peter',
                            value: 1
                        }
                    ]
                }
            ]
        },
        {
            name: 'Nancy',
            children: [
                {
                    name: 'Uncle Nike',
                    children: [
                        {
                            name: 'Cousin Betty',
                            value: 1
                        },
                        {
                            name: 'Cousin Jenny',
                            value: 2
                        }
                    ]
                }
            ]
        }
    ];

    options = {
        series: {
            type: 'sunburst',
            // emphasis: {
            //     focus: 'ancestor'
            // },
            data: this.data,
            radius: [0, '90%'],
            label: {
                rotate: 'radial'
            }
        }
    };
}
