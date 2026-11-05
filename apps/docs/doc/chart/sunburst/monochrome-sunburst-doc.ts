import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'monochrome-sunburst-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Monochrome sunburst on a grey base where accent-colored leaves stand out, with unsorted nodes and radial labels.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MonochromeSunburstDoc {
    item1 = {
        color: '#F54F4A'
    };
    item2 = {
        color: '#FF8C75'
    };
    item3 = {
        color: '#FFB499'
    };

    data = [
        {
            children: [
                {
                    value: 5,
                    children: [
                        {
                            value: 1,
                            itemStyle: this.item1
                        },
                        {
                            value: 2,
                            children: [
                                {
                                    value: 1,
                                    itemStyle: this.item2
                                }
                            ]
                        },
                        {
                            children: [
                                {
                                    value: 1
                                }
                            ]
                        }
                    ],
                    itemStyle: this.item1
                },
                {
                    value: 10,
                    children: [
                        {
                            value: 6,
                            children: [
                                {
                                    value: 1,
                                    itemStyle: this.item1
                                },
                                {
                                    value: 1
                                },
                                {
                                    value: 1,
                                    itemStyle: this.item2
                                },
                                {
                                    value: 1
                                }
                            ],
                            itemStyle: this.item3
                        },
                        {
                            value: 2,
                            children: [
                                {
                                    value: 1
                                }
                            ],
                            itemStyle: this.item3
                        },
                        {
                            children: [
                                {
                                    value: 1,
                                    itemStyle: this.item2
                                }
                            ]
                        }
                    ],
                    itemStyle: this.item1
                }
            ],
            itemStyle: this.item1
        },
        {
            value: 9,
            children: [
                {
                    value: 4,
                    children: [
                        {
                            value: 2,
                            itemStyle: this.item2
                        },
                        {
                            children: [
                                {
                                    value: 1,
                                    itemStyle: this.item1
                                }
                            ]
                        }
                    ],
                    itemStyle: this.item1
                },
                {
                    children: [
                        {
                            value: 3,
                            children: [
                                {
                                    value: 1
                                },
                                {
                                    value: 1,
                                    itemStyle: this.item2
                                }
                            ]
                        }
                    ],
                    itemStyle: this.item3
                }
            ],
            itemStyle: this.item2
        },
        {
            value: 7,
            children: [
                {
                    children: [
                        {
                            value: 1,
                            itemStyle: this.item3
                        },
                        {
                            value: 3,
                            children: [
                                {
                                    value: 1,
                                    itemStyle: this.item2
                                },
                                {
                                    value: 1
                                }
                            ],
                            itemStyle: this.item2
                        },
                        {
                            value: 2,
                            children: [
                                {
                                    value: 1
                                },
                                {
                                    value: 1,
                                    itemStyle: this.item1
                                }
                            ],
                            itemStyle: this.item1
                        }
                    ],
                    itemStyle: this.item3
                }
            ],
            itemStyle: this.item1
        },
        {
            children: [
                {
                    value: 6,
                    children: [
                        {
                            value: 1,
                            itemStyle: this.item2
                        },
                        {
                            value: 2,
                            children: [
                                {
                                    value: 2,
                                    itemStyle: this.item2
                                }
                            ],
                            itemStyle: this.item1
                        },
                        {
                            value: 1,
                            itemStyle: this.item3
                        }
                    ],
                    itemStyle: this.item3
                },
                {
                    value: 3,
                    children: [
                        {
                            value: 1
                        },
                        {
                            children: [
                                {
                                    value: 1,
                                    itemStyle: this.item2
                                }
                            ]
                        },
                        {
                            value: 1
                        }
                    ],
                    itemStyle: this.item3
                }
            ],
            itemStyle: this.item1
        }
    ];

    options = {
        series: {
            radius: ['15%', '80%'],
            type: 'sunburst',
            sort: undefined,
            emphasis: {
                focus: 'ancestor'
            },
            data: this.data,
            label: {
                rotate: 'radial'
            },
            levels: [],
            itemStyle: {
                color: '#ddd',
                borderWidth: 2
            }
        }
    };
}
