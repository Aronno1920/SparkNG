import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';
import { format, number } from '@bdspark/sparkng-charts';

interface TreeNode {
    name: string;
    id: string;
    value: number[];

    children?: TreeNode[];
}

@Component({
    selector: 'gradient-mapping-treemap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Obama's 2012 budget proposal mapped to a red-grey-green gradient by growth value, so each item's change from 2011 colors its rectangle.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class GradientMappingTreemapDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.chart.showLoading();

            const household_america_2012 = 113616229;
            fetch('demo/chart/data/obama_budget_proposal_2012.json')
                .then((response) => response.json())
                .then((obama_budget_2012: TreeNode[]) => {
                    this.chart.hideLoading();

                    const visualMin = -100;
                    const visualMax = 100;
                    const visualMinBound = -40;
                    const visualMaxBound = 40;

                    convertData(obama_budget_2012);

                    function convertData(originList: TreeNode[]) {
                        let min = Infinity;
                        let max = -Infinity;

                        for (let i = 0; i < originList.length; i++) {
                            let node = originList[i];
                            if (node) {
                                let value = node.value;
                                value[2] != null && value[2] < min && (min = value[2]);
                                value[2] != null && value[2] > max && (max = value[2]);
                            }
                        }

                        for (let i = 0; i < originList.length; i++) {
                            let node = originList[i];
                            if (node) {
                                let value = node.value;

                                // Scale value for visual effect
                                if (value[2] != null && value[2] > 0) {
                                    value[3] = number.linearMap(value[2], [0, max], [visualMaxBound, visualMax], true);
                                } else if (value[2] != null && value[2] < 0) {
                                    value[3] = number.linearMap(value[2], [min, 0], [visualMin, visualMinBound], true);
                                } else {
                                    value[3] = 0;
                                }

                                if (!isFinite(value[3])) {
                                    value[3] = 0;
                                }

                                if (node.children) {
                                    convertData(node.children);
                                }
                            }
                        }
                    }

                    function isValidNumber(num: number) {
                        return num != null && isFinite(num);
                    }

                    this.chart.setOption({
                        title: {
                            left: 'center',
                            text: 'Gradient Mapping',
                            subtext: 'Growth > 0: green; Growth < 0: red; Growth = 0: grey'
                        },
                        tooltip: {
                            formatter: function (info: any) {
                                let value = info.value;

                                let amount = value[0];
                                amount = isValidNumber(amount) ? (amount * 1000).toLocaleString('en-US') + '$' : '-';

                                let amount2011 = value[1];
                                amount2011 = isValidNumber(amount2011) ? (amount2011 * 1000).toLocaleString('en-US') + '$' : '-';

                                let change = value[2];
                                change = isValidNumber(change) ? change.toFixed(2) + '%' : '-';

                                return [
                                    '<div class="tooltip-title">' + format.encodeHTML(info.name) + '</div>',
                                    '2012 Amount: &nbsp;&nbsp;' + amount + '<br>',
                                    '2011 Amount: &nbsp;&nbsp;' + amount2011 + '<br>',
                                    'Change From 2011: &nbsp;&nbsp;' + change
                                ].join('');
                            }
                        },
                        series: [
                            {
                                name: 'ALL',
                                top: 80,
                                type: 'treemap',
                                label: {
                                    show: true,
                                    formatter: '{b}'
                                },
                                itemStyle: {
                                    borderColor: 'black'
                                },
                                visualMin: visualMin,
                                visualMax: visualMax,
                                visualDimension: 3,
                                levels: [
                                    {
                                        itemStyle: {
                                            borderWidth: 3,
                                            borderColor: '#333',
                                            gapWidth: 3
                                        }
                                    },
                                    {
                                        color: ['#942e38', '#aaa', '#269f3c'],
                                        colorMappingBy: 'value',
                                        itemStyle: {
                                            gapWidth: 1
                                        }
                                    }
                                ],
                                data: obama_budget_2012
                            }
                        ]
                    });
                });
        }
    }
}
