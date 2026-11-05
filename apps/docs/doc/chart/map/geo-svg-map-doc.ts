import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { ChartModule, registerMap } from '@bdspark/sparkng/chart';

@Component({
    selector: 'geo-svg-map-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>An SVG topographic map of pre-Hellenic Sicily with scatter-rendered buttons that select routes and show enterable tooltips.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class GeoSvgMapDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        fetch('demo/chart/geo/Sicily_prehellenic_topographic_map.svg')
            .then((r) => r.text())
            .then((svg: string) => {
                registerMap('sicily', { svg });

                const option: any = {
                    tooltip: {
                        formatter: function (params: any) {
                            console.log(params);
                            return [params.name + ':', 'xxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxx'].join('<br>');
                        }
                    },
                    geo: [
                        {
                            map: 'sicily',
                            roam: true,
                            layoutCenter: ['50%', '50%'],
                            layoutSize: '100%',
                            selectedMode: 'single',
                            tooltip: {
                                show: true,
                                confine: true,
                                formatter: function (params: any) {
                                    return [
                                        'This is the introduction:',
                                        'xxxxxxxxxxxxxxxxxxxxx',
                                        'xxxxxxxxxxxxxxxxxxxxx',
                                        'xxxxxxxxxxxxxxxxxxxxx',
                                        'xxxxxxxxxxxxxxxxxxxxx',
                                        'xxxxxxxxxxxxxxxxxxxxx',
                                        'xxxxxxxxxxxxxxxxxxxxx',
                                        'xxxxxxxxxxxxxxxxxxxxx',
                                        'xxxxxxxxxxxxxxxxxxxxx',
                                        'xxxxxxxxxxxxxxxxxxxxx',
                                        'xxxxxxxxxxxxxxxxxxxxx'
                                    ].join('<br>');
                                }
                            },
                            itemStyle: {
                                color: undefined
                            },
                            emphasis: {
                                label: {
                                    show: false
                                }
                            },
                            select: {
                                itemStyle: {
                                    color: '#b50205'
                                },
                                label: {
                                    show: false
                                }
                            },
                            regions: [
                                {
                                    name: 'route1',
                                    itemStyle: {
                                        borderWidth: 0
                                    },
                                    select: {
                                        itemStyle: {
                                            color: '#b5280d',
                                            borderWidth: 0
                                        }
                                    },
                                    tooltip: {
                                        position: 'right',
                                        alwaysShowContent: true,
                                        enterable: true,
                                        extraCssText: 'user-select: text',
                                        formatter: ['Route 1:', 'xxxxxxxxxxxxxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxxxxxxxxxxxxx'].join('<br>')
                                    }
                                },
                                {
                                    name: 'route2',
                                    itemStyle: {
                                        borderWidth: 0
                                    },
                                    select: {
                                        itemStyle: {
                                            color: '#b5280d',
                                            borderWidth: 0
                                        }
                                    },
                                    tooltip: {
                                        position: 'left',
                                        alwaysShowContent: true,
                                        enterable: true,
                                        extraCssText: 'user-select: text',
                                        formatter: ['Route 2:', 'xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx', 'xxxxxxxxxxxxxx'].join('<br>')
                                    }
                                }
                            ]
                        }
                    ],

                    // -------------
                    // Make buttons
                    grid: {
                        top: 10,
                        left: 'center',
                        width: 80,
                        height: 20
                    },
                    xAxis: {
                        axisLine: { show: false },
                        splitLine: { show: false },
                        axisLabel: { show: false },
                        axisTick: { show: false }
                    },
                    yAxis: {
                        axisLine: { show: false },
                        splitLine: { show: false },
                        axisLabel: { show: false },
                        axisTick: { show: false }
                    },
                    series: {
                        type: 'scatter',
                        itemStyle: {},
                        label: {
                            show: true,
                            borderColor: '#999',
                            borderWidth: 1,
                            borderRadius: 2,
                            backgroundColor: '#fff',
                            padding: [3, 5],
                            fontSize: 18,
                            opacity: 1,
                            color: '#333'
                        },
                        encode: {
                            label: 2
                        },
                        symbolSize: 0,
                        tooltip: { show: false },
                        selectedMode: 'single',
                        select: {
                            label: {
                                color: '#fff',
                                borderColor: '#555',
                                backgroundColor: '#555'
                            }
                        },
                        data: [
                            [0, 0, 'route1'],
                            [1, 0, 'route2']
                        ]
                    }
                    // Make buttons end
                    // -----------------
                };

                this.chart.setOption(option);

                this.chart.on('selectchanged', (params: any) => {
                    if (!params.selected.length) {
                        this.chart.dispatchAction({
                            type: 'hideTip'
                        });
                        this.chart.dispatchAction({
                            type: 'geoSelect',
                            geoIndex: 0
                            // Use no name to unselect.
                        });
                    } else {
                        const btnDataIdx = params.selected[0].dataIndex[0];
                        const name = option.series.data[btnDataIdx][2];

                        this.chart.dispatchAction({
                            type: 'geoSelect',
                            geoIndex: 0,
                            name: name
                        });
                        this.chart.dispatchAction({
                            type: 'showTip',
                            geoIndex: 0,
                            name: name
                        });
                    }
                });
            });
    }
}
