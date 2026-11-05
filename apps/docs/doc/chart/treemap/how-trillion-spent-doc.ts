import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';
import { format } from '@bdspark/sparkng-charts';

type Mode = number;
interface TreeNode {
    name: string;
    id: string;
    value: number[];

    children?: TreeNode[];
}

@Component({
    selector: 'how-trillion-spent-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Obama's 2012 budget proposal of $3.7 trillion shown as a treemap, with single-select legend modes for 2012Budget, 2011Budget and Growth and per-household figures in each label.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class HowTrillionSpentDoc {
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

                    function buildData(mode: Mode, originList: TreeNode[]) {
                        let out: TreeNode[] = [];

                        for (let i = 0; i < originList.length; i++) {
                            let node = originList[i];
                            let newNode = cloneNodeInfo(node);

                            if (!newNode) {
                                continue;
                            }
                            out[i] = newNode;
                            let value = newNode.value;

                            // Calculate amount per household.
                            value[3] = value[0] / household_america_2012;

                            // if mode === 0 and mode === 2 do nothing
                            if (mode === 1) {
                                // Set 'Change from 2010' to value[0].
                                let tmp = value[1];
                                value[1] = value[0];
                                value[0] = tmp;
                            }

                            if (node.children) {
                                newNode.children = buildData(mode, node.children);
                            }
                        }

                        return out;
                    }

                    function cloneNodeInfo(node?: TreeNode) {
                        if (!node) {
                            return;
                        }

                        const newNode = {} as TreeNode;
                        newNode.name = node.name;
                        newNode.id = node.id;
                        newNode.value = (node.value || []).slice();
                        return newNode;
                    }

                    function getLevelOption(mode: Mode) {
                        return [
                            {
                                color: mode === 2 ? ['#c23531', '#314656', '#61a0a8', '#dd8668', '#91c7ae', '#6e7074', '#61a0a8', '#bda29a', '#44525d', '#c4ccd3'] : undefined,
                                colorMappingBy: 'id',
                                itemStyle: {
                                    borderWidth: 3,
                                    gapWidth: 3
                                }
                            },
                            {
                                colorAlpha: mode === 2 ? [0.5, 1] : undefined,
                                itemStyle: {
                                    gapWidth: 1
                                }
                            }
                        ];
                    }

                    function isValidNumber(num: number) {
                        return num != null && isFinite(num);
                    }

                    function getTooltipFormatter(mode: Mode) {
                        let amountIndex = mode === 1 ? 1 : 0;
                        let amountIndex2011 = mode === 1 ? 0 : 1;

                        return function (info: any) {
                            let value = info.value;

                            let amount = value[amountIndex];
                            amount = isValidNumber(amount) ? (amount * 1000).toLocaleString('en-US') + '$' : '-';

                            let amount2011 = value[amountIndex2011];
                            amount2011 = isValidNumber(amount2011) ? (amount2011 * 1000).toLocaleString('en-US') + '$' : '-';

                            let perHousehold = value[3];
                            perHousehold = isValidNumber(perHousehold) ? (+perHousehold.toFixed(4) * 1000).toLocaleString('en-US') + '$' : '-';

                            let change = value[2];
                            change = isValidNumber(change) ? change.toFixed(2) + '%' : '-';

                            return [
                                '<div class="tooltip-title">' + format.encodeHTML(info.name) + '</div>',
                                '2012 Amount: &nbsp;&nbsp;' + amount + '<br>',
                                'Per Household: &nbsp;&nbsp;' + perHousehold + '<br>',
                                '2011 Amount: &nbsp;&nbsp;' + amount2011 + '<br>',
                                'Change From 2011: &nbsp;&nbsp;' + change
                            ].join('');
                        };
                    }

                    function createSeriesCommon(mode: Mode): any {
                        return {
                            type: 'treemap',
                            tooltip: {
                                formatter: getTooltipFormatter(mode)
                            },
                            label: {
                                position: 'insideTopLeft',
                                formatter: function (params: any) {
                                    let arr = ['{name|' + params.name + '}', '{hr|}', '{budget|$ ' + params.value[0].toLocaleString('en-US') + '} {label|budget}'];

                                    mode !== 1 && arr.push('{household|$ ' + (+params.value[3].toFixed(4) * 1000).toLocaleString('en-US') + '} {label|per household}');

                                    return arr.join('\n');
                                },
                                rich: {
                                    budget: {
                                        fontSize: 22,
                                        lineHeight: 30,
                                        color: 'yellow'
                                    },
                                    household: {
                                        fontSize: 14,
                                        color: '#fff'
                                    },
                                    label: {
                                        fontSize: 9,
                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                        color: '#fff',
                                        borderRadius: 2,
                                        padding: [2, 4],
                                        lineHeight: 25,
                                        align: 'right'
                                    },
                                    name: {
                                        fontSize: 12,
                                        color: '#fff'
                                    },
                                    hr: {
                                        width: '100%',
                                        borderColor: 'rgba(255,255,255,0.2)',
                                        borderWidth: 0.5,
                                        height: 0,
                                        lineHeight: 10
                                    }
                                }
                            },
                            itemStyle: {
                                borderColor: 'black'
                            },
                            levels: getLevelOption(0)
                        };
                    }

                    let modes = ['2012Budget', '2011Budget', 'Growth'];

                    this.chart.setOption({
                        title: {
                            top: 5,
                            left: 'center',
                            text: 'How $3.7 Trillion is Spent',
                            subtext: 'Obama’s 2012 Budget Proposal'
                        },
                        legend: {
                            data: modes,
                            selectedMode: 'single',
                            top: 55,
                            itemGap: 5,
                            borderRadius: 5
                        },
                        tooltip: {},
                        series: modes.map(function (mode, idx) {
                            let seriesOpt = createSeriesCommon(idx);
                            seriesOpt.name = mode;
                            seriesOpt.top = 80;
                            seriesOpt.visualDimension = idx === 2 ? 2 : undefined;
                            seriesOpt.data = buildData(idx, obama_budget_2012);
                            seriesOpt.levels = getLevelOption(idx);
                            return seriesOpt;
                        })
                    });
                });
        }
    }
}
