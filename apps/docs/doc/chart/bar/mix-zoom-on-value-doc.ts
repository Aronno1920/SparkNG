import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'mix-zoom-on-value-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Obama's 2012 budget proposal loads from JSON and zooms on the value axis: a slider dataZoom filters the budget bars from 94% to 100%.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class MixZoomOnValueDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.chart.showLoading();
            fetch('demo/chart/data/obama_budget_proposal_2012.list.json')
                .then((response) => response.json())
                .then((obamaBudget2012) => {
                    this.chart.hideLoading();
                    this.chart.setOption(this.buildOption(obamaBudget2012));
                });
        }
    }

    private buildOption(obamaBudget2012: any): any {
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true
                    }
                }
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            legend: {
                data: ['Growth', 'Budget 2011', 'Budget 2012'],
                itemGap: 5
            },
            grid: {
                top: '12%',
                left: '1%',
                right: '10%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: obamaBudget2012.names
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Budget (million USD)',
                    axisLabel: {
                        formatter: function (a: number) {
                            a = +a;
                            return isFinite(a) ? (a / 1000).toLocaleString('en-US') : '';
                        }
                    }
                }
            ],
            dataZoom: [
                {
                    show: true,
                    start: 94,
                    end: 100
                },
                {
                    type: 'inside',
                    start: 94,
                    end: 100
                },
                {
                    show: true,
                    yAxisIndex: 0,
                    filterMode: 'empty',
                    width: 30,
                    height: '80%',
                    showDataShadow: false,
                    left: '93%'
                }
            ],
            series: [
                {
                    name: 'Budget 2011',
                    type: 'bar',
                    data: obamaBudget2012.budget2011List
                },
                {
                    name: 'Budget 2012',
                    type: 'bar',
                    data: obamaBudget2012.budget2012List
                }
            ]
        };
    }
}
