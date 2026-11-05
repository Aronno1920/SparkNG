import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'datatransform-filter-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Filtering datasets dynamically with transform filter configurations for specific countries and time spans.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class DatatransformFilterDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.chart.showLoading();
            fetch('demo/chart/data/life-expectancy-table.json')
                .then((res) => res.json())
                .then((rawData) => {
                    this.chart.hideLoading();
                    this.chart.setOption(this.buildOption(rawData));
                });
        }
    }

    private buildOption(rawData: any): any {
        return {
            dataset: [
                {
                    id: 'dataset_raw',
                    source: rawData
                },
                {
                    id: 'dataset_since_1950_of_germany',
                    fromDatasetId: 'dataset_raw',
                    transform: {
                        type: 'filter',
                        config: {
                            and: [
                                { dimension: 'Year', gte: 1950 },
                                { dimension: 'Country', '=': 'Germany' }
                            ]
                        }
                    }
                },
                {
                    id: 'dataset_since_1950_of_france',
                    fromDatasetId: 'dataset_raw',
                    transform: {
                        type: 'filter',
                        config: {
                            and: [
                                { dimension: 'Year', gte: 1950 },
                                { dimension: 'Country', '=': 'France' }
                            ]
                        }
                    }
                }
            ],
            title: {
                text: 'Income of Germany and France since 1950'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                nameLocation: 'middle'
            },
            yAxis: {
                name: 'Income'
            },
            series: [
                {
                    type: 'line',
                    datasetId: 'dataset_since_1950_of_germany',
                    showSymbol: false,
                    encode: {
                        x: 'Year',
                        y: 'Income',
                        itemName: 'Year',
                        tooltip: ['Income']
                    }
                },
                {
                    type: 'line',
                    datasetId: 'dataset_since_1950_of_france',
                    showSymbol: false,
                    encode: {
                        x: 'Year',
                        y: 'Income',
                        itemName: 'Year',
                        tooltip: ['Income']
                    }
                }
            ]
        };
    }
}
