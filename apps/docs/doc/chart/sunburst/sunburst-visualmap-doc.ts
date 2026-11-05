import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'sunburst-visualmap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Family tree sunburst colored by a continuous visualMap from 0 to 10, with the 'Me' node pinned to red.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SunburstVisualmapDoc {
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
                    name: 'Aunt Jane',
                    children: [
                        {
                            name: 'Cousin Kate',
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
                            value: 5,
                            itemStyle: {
                                color: 'red'
                            }
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
            name: 'Mike',
            children: [
                {
                    name: 'Uncle Dan',
                    children: [
                        {
                            name: 'Cousin Lucy',
                            value: 3
                        },
                        {
                            name: 'Cousin Luck',
                            value: 4,
                            children: [
                                {
                                    name: 'Nephew',
                                    value: 2
                                }
                            ]
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
        visualMap: {
            type: 'continuous',
            min: 0,
            max: 10,
            inRange: {
                color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862']
            }
        },
        series: {
            type: 'sunburst',
            data: this.data,
            radius: [0, '90%'],
            label: {
                rotate: 'radial'
            }
        }
    };
}
