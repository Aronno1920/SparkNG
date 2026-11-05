import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

interface RawNode {
    [key: string]: any;
    $count?: number;
}

interface TreeNode {
    name: string;
    value: number;
    children?: TreeNode[];
}

@Component({
    selector: 'option-query-treemap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>April 2016 statistics of SCharts option usage, converted to a drill-down treemap with leafDepth 2.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class OptionQueryTreemapDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.chart.showLoading();

            fetch('demo/chart/data/ec-option-doc-statistics-201604.json')
                .then((response) => response.json())
                .then((rawData: RawNode) => {
                    this.chart.hideLoading();

                    function convert(source: RawNode, target: TreeNode, basePath: string) {
                        for (let key in source) {
                            let path = basePath ? basePath + '.' + key : key;
                            if (!key.match(/^\$/)) {
                                target.children = target.children || [];
                                const child = {
                                    name: path
                                } as TreeNode;
                                target.children.push(child);
                                convert(source[key], child, path);
                            }
                        }

                        if (!target.children) {
                            target.value = source.$count || 1;
                        } else {
                            target.children.push({
                                name: basePath,
                                value: source.$count
                            });
                        }
                    }

                    const data = {
                        children: [] as TreeNode[]
                    } as TreeNode;

                    convert(rawData, data, '');

                    this.chart.setOption({
                        title: {
                            text: 'SCharts Options',
                            subtext: '2016/04',
                            left: 'leafDepth'
                        },
                        tooltip: {},
                        series: [
                            {
                                name: 'option',
                                type: 'treemap',
                                visibleMin: 300,
                                data: data.children,
                                leafDepth: 2,
                                levels: [
                                    {
                                        itemStyle: {
                                            borderColor: '#555',
                                            borderWidth: 4,
                                            gapWidth: 4
                                        }
                                    },
                                    {
                                        colorSaturation: [0.3, 0.6],
                                        itemStyle: {
                                            borderColorSaturation: 0.7,
                                            gapWidth: 2,
                                            borderWidth: 2
                                        }
                                    },
                                    {
                                        colorSaturation: [0.3, 0.5],
                                        itemStyle: {
                                            borderColorSaturation: 0.6,
                                            gapWidth: 1
                                        }
                                    },
                                    {
                                        colorSaturation: [0.3, 0.5]
                                    }
                                ]
                            }
                        ]
                    });
                });
        }
    }
}
