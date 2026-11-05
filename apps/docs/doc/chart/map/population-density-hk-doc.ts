import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { ChartModule, registerMap } from '@bdspark/sparkng/chart';

@Component({
    selector: 'population-density-hk-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>The 18 districts of Hong Kong colored by 2011 population density, with English region names mapped to Chinese labels.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class PopulationDensityHkDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.chart.showLoading();
        fetch('demo/chart/geo/HK.json')
            .then((r) => r.json())
            .then((geoJson: any) => {
                this.chart.hideLoading();

                registerMap('HK', geoJson);

                this.chart.setOption({
                    title: {
                        text: 'Population Density of Hong Kong (2011)',
                        subtext: 'Data from Wikipedia',
                        sublink: 'https://en.wikipedia.org/wiki/Districts_of_Hong_Kong'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}<br/>{c} (p / km2)'
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: { readOnly: false },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    visualMap: {
                        min: 800,
                        max: 50000,
                        text: ['High', 'Low'],
                        realtime: false,
                        calculable: true,
                        inRange: {
                            color: ['lightskyblue', 'yellow', 'orangered']
                        }
                    },
                    series: [
                        {
                            name: 'Population Density of 18 HK Districts',
                            type: 'map',
                            map: 'HK',
                            label: {
                                show: true
                            },
                            data: [
                                { name: 'Central and Western', value: 20057.34 },
                                { name: 'Wan Chai', value: 15477.48 },
                                { name: 'Eastern', value: 31686.1 },
                                { name: 'Southern', value: 6992.6 },
                                { name: 'Yau Tsim Mong', value: 44045.49 },
                                { name: 'Sham Shui Po', value: 40689.64 },
                                { name: 'Kowloon City', value: 37659.78 },
                                { name: 'Wong Tai Sin', value: 45180.97 },
                                { name: 'Kwun Tong', value: 55204.26 },
                                { name: 'Kwai Tsing', value: 21900.9 },
                                { name: 'Tsuen Wan', value: 4918.26 },
                                { name: 'Tuen Mun', value: 5881.84 },
                                { name: 'Yuen Long', value: 4178.01 },
                                { name: 'North', value: 2227.92 },
                                { name: 'Tai Po', value: 2180.98 },
                                { name: 'Sha Tin', value: 9172.94 },
                                { name: 'Sai Kung', value: 3368 },
                                { name: 'Islands', value: 806.98 }
                            ]
                        }
                    ]
                });
            });
    }
}
