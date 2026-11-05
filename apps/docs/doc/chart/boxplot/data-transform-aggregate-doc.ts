import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'data-transform-aggregate-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Income since 1950: per-country income boxplots aggregated from the life-expectancy table, overlaid with a detail scatter of every record.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" height="36rem" />
        </div>
        <app-code></app-code>
    `
})
export class DataTransformAggregateDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    private rawData: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (!this.chart || !isPlatformBrowser(this.platformId)) {
            return;
        }
        if (this.rawData) {
            this.chart.setOption(this.buildOption(this.rawData));
            return;
        }
        this.chart.showLoading();
        fetch('demo/chart/data/life-expectancy-table.json')
            .then((response) => response.json())
            .then((rawData) => {
                this.rawData = rawData;
                this.chart.hideLoading();
                this.options = this.buildOption(rawData);
                this.chart.setOption(this.options);
            })
            .catch(() => {
                this.chart.hideLoading();
            });
    }

    private buildOption(rawData: any[]): any {
        return {
            dataset: [
                {
                    id: 'raw',
                    source: rawData
                },
                {
                    id: 'since_year',
                    fromDatasetId: 'raw',
                    transform: [
                        {
                            type: 'filter',
                            config: {
                                dimension: 'Year',
                                gte: 1950
                            }
                        }
                    ]
                },
                // The official example aggregates with the external
                // `ecSimpleTransform:aggregate` transform (scharts-simple-transform
                // plugin), which is not bundled here. The same five-number summary
                // (min, Q1, median, Q3, max of Income grouped by Country, using the
                // plugin's linear-interpolation quantile H = (n - 1) * p + 1) is
                // computed in aggregateIncome() instead; the official built-in
                // `sort` transform on Q3 is kept.
                {
                    id: 'income_aggregate_raw',
                    source: this.aggregateIncome(rawData)
                },
                {
                    id: 'income_aggregate',
                    fromDatasetId: 'income_aggregate_raw',
                    transform: {
                        type: 'sort',
                        config: {
                            dimension: 'Q3',
                            order: 'asc'
                        }
                    }
                }
            ],
            title: {
                text: 'Income since 1950'
            },
            tooltip: {
                trigger: 'axis',
                confine: true
            },
            xAxis: {
                name: 'Income',
                nameLocation: 'middle',
                nameGap: 30,
                scale: true
            },
            yAxis: {
                type: 'category'
            },
            grid: {
                bottom: 140
            },
            legend: {
                selected: { detail: false }
            },
            dataZoom: [
                {
                    type: 'inside'
                },
                {
                    type: 'slider',
                    height: 20,
                    bottom: 60
                }
            ],
            series: [
                {
                    name: 'boxplot',
                    type: 'boxplot',
                    datasetId: 'income_aggregate',
                    itemStyle: {
                        color: '#b8c5f2'
                    },
                    encode: {
                        x: ['min', 'Q1', 'median', 'Q3', 'max'],
                        y: 'Country',
                        itemName: ['Country'],
                        tooltip: ['min', 'Q1', 'median', 'Q3', 'max']
                    }
                },
                {
                    name: 'detail',
                    type: 'scatter',
                    datasetId: 'since_year',
                    symbolSize: 6,
                    tooltip: {
                        trigger: 'item'
                    },
                    label: {
                        show: true,
                        position: 'top',
                        align: 'left',
                        verticalAlign: 'middle',
                        rotate: 90,
                        fontSize: 12
                    },
                    itemStyle: {
                        color: '#d00000'
                    },
                    encode: {
                        x: 'Income',
                        y: 'Country',
                        label: 'Year',
                        itemName: 'Year',
                        tooltip: ['Country', 'Year', 'Income']
                    }
                }
            ]
        };
    }

    // Equivalent of the official `ecSimpleTransform:aggregate` resultDimensions:
    // min/Q1/median/Q3/max of Income, grouped by Country, in first-appearance order.
    private aggregateIncome(rawData: any[]): any[] {
        const header = rawData[0];
        const incomeIdx = header.indexOf('Income');
        const countryIdx = header.indexOf('Country');
        const yearIdx = header.indexOf('Year');
        const incomesByCountry: any = {};
        const countries: any[] = [];
        for (let i = 1; i < rawData.length; i++) {
            // Same rows as the `since_year` dataset (Year gte 1950) that the
            // official example aggregates.
            if (rawData[i][yearIdx] < 1950) {
                continue;
            }
            const country = rawData[i][countryIdx];
            if (!incomesByCountry[country]) {
                incomesByCountry[country] = [];
                countries.push(country);
            }
            incomesByCountry[country].push(rawData[i][incomeIdx]);
        }
        const aggregated = [['min', 'Q1', 'median', 'Q3', 'max', 'Country']];
        for (const country of countries) {
            const values = incomesByCountry[country].slice().sort((a: number, b: number) => a - b);
            aggregated.push([values[0], this.quantile(values, 0.25), this.quantile(values, 0.5), this.quantile(values, 0.75), values[values.length - 1], country]);
        }
        return aggregated;
    }

    // Linear-interpolation quantile used by scharts-simple-transform.
    private quantile(ascArr: number[], p: number): number {
        const H = (ascArr.length - 1) * p + 1;
        const h = Math.floor(H);
        const v = +ascArr[h - 1];
        const e = H - h;
        return e ? v + e * (ascArr[h] - v) : v;
    }
}
