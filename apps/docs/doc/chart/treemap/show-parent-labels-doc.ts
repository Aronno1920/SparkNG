import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';
import { format } from '@bdspark/sparkng-charts';

@Component({
    selector: 'show-parent-labels-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Disk usage treemap that displays upper labels on parent nodes so each directory level is named across its children.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class ShowParentLabelsDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.chart.showLoading();

            fetch('demo/chart/data/disk.tree.json')
                .then((response) => response.json())
                .then((diskData) => {
                    this.chart.hideLoading();

                    function getLevelOption() {
                        return [
                            {
                                itemStyle: {
                                    borderColor: '#777',
                                    borderWidth: 0,
                                    gapWidth: 1
                                },
                                upperLabel: {
                                    show: false
                                }
                            },
                            {
                                itemStyle: {
                                    borderColor: '#555',
                                    borderWidth: 5,
                                    gapWidth: 1
                                },
                                emphasis: {
                                    itemStyle: {
                                        borderColor: '#ddd'
                                    }
                                }
                            },
                            {
                                colorSaturation: [0.35, 0.5],
                                itemStyle: {
                                    borderWidth: 5,
                                    gapWidth: 1,
                                    borderColorSaturation: 0.6
                                }
                            }
                        ];
                    }

                    this.chart.setOption({
                        title: {
                            text: 'Disk Usage',
                            left: 'center'
                        },
                        tooltip: {
                            formatter: function (info: any) {
                                var value = info.value;
                                var treePathInfo = info.treePathInfo;
                                var treePath = [];

                                for (var i = 1; i < treePathInfo.length; i++) {
                                    treePath.push(treePathInfo[i].name);
                                }

                                return ['<div class="tooltip-title">' + format.encodeHTML(treePath.join('/')) + '</div>', 'Disk Usage: ' + value.toLocaleString('en-US') + ' KB'].join('');
                            }
                        },
                        series: [
                            {
                                name: 'Disk Usage',
                                type: 'treemap',
                                visibleMin: 300,
                                label: {
                                    show: true,
                                    formatter: '{b}'
                                },
                                upperLabel: {
                                    show: true,
                                    height: 30
                                },
                                itemStyle: {
                                    borderColor: '#fff'
                                },
                                levels: getLevelOption(),
                                data: diskData
                            }
                        ]
                    });
                });
        }
    }
}
