import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'sunburst-label-rotate-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Silent sunburst whose labels switch between radial, tangential and 0-degree rotation per ring level, with a red-orange-yellow depth palette.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class SunburstLabelRotateDoc {
    options = {
        silent: true,
        series: [
            {
                radius: ['15%', '80%'],
                type: 'sunburst',
                sort: undefined,
                emphasis: {
                    focus: 'ancestor'
                },
                data: [
                    {
                        value: 8,
                        children: [
                            {
                                value: 4,
                                children: [
                                    {
                                        value: 2
                                    },
                                    {
                                        value: 1
                                    },
                                    {
                                        value: 1
                                    },
                                    {
                                        value: 0.5
                                    }
                                ]
                            },
                            {
                                value: 2
                            }
                        ]
                    },
                    {
                        value: 4,
                        children: [
                            {
                                children: [
                                    {
                                        value: 2
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 4,
                        children: [
                            {
                                children: [
                                    {
                                        value: 2
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 3,
                        children: [
                            {
                                children: [
                                    {
                                        value: 1
                                    }
                                ]
                            }
                        ]
                    }
                ],
                label: {
                    color: '#000',
                    textBorderColor: '#fff',
                    textBorderWidth: 2,
                    formatter: function (param: any) {
                        var depth = param.treePathInfo.length;
                        if (depth === 2) {
                            return 'radial';
                        } else if (depth === 3) {
                            return 'tangential';
                        } else if (depth === 4) {
                            return '0';
                        }
                        return '';
                    }
                },
                levels: [
                    {},
                    {
                        itemStyle: {
                            color: '#CD4949'
                        },
                        label: {
                            rotate: 'radial'
                        }
                    },
                    {
                        itemStyle: {
                            color: '#F47251'
                        },
                        label: {
                            rotate: 'tangential'
                        }
                    },
                    {
                        itemStyle: {
                            color: '#FFC75F'
                        },
                        label: {
                            rotate: 0
                        }
                    }
                ]
            }
        ]
    };
}
