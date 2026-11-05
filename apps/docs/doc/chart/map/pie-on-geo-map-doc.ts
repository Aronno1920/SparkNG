import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { ChartModule, registerMap } from '@bdspark/sparkng/chart';
import { version } from '@bdspark/sparkng-charts';

@Component({
    selector: 'pie-on-geo-map-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Four random pie charts placed at geographic coordinates (and one at a region name) over a GeoJSON map of Iceland.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class PieOnGeoMapDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        this.chart.showLoading();
        fetch('demo/chart/geo/iceland.geo.json')
            .then((r) => r.json())
            .then((geoJSON: any) => {
                registerMap('iceland', geoJSON);

                function randomPieSeries(center: string | number[], radius: number): any {
                    const data = ['A', 'B', 'C', 'D'].map((t) => {
                        return {
                            value: Math.round(Math.random() * 100),
                            name: 'Category ' + t
                        };
                    });
                    return {
                        type: 'pie',
                        coordinateSystem: 'geo',
                        tooltip: {
                            formatter: '{b}: {c} ({d}%)'
                        },
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        animationDuration: 0,
                        radius,
                        center,
                        data
                    };
                }

                this.chart.setOption({
                    geo: {
                        map: 'iceland',
                        roam: true,
                        aspectScale: Math.cos((65 * Math.PI) / 180),
                        // nameProperty: 'name_en', // If using en name.
                        itemStyle: {
                            areaColor: '#e7e8ea'
                        },
                        emphasis: {
                            label: { show: false }
                        }
                    },
                    tooltip: {},
                    legend: {},
                    series: [
                        randomPieSeries([-19.007740346534653, 64.1780281585128], 45),
                        randomPieSeries([-17.204666089108912, 65.44804833928391], 25),
                        randomPieSeries([-15.264995297029705, 64.8592208009264], 30),
                        randomPieSeries(
                            // it's also supported to use geo region name as center since v5.4.1
                            +version.split('.').slice(0, 3).join('') > 540
                                ? 'Vestfirðir'
                                : // or you can only use the LngLat array
                                  [-13, 66],
                            30
                        )
                    ]
                });
                this.chart.hideLoading();
            });
    }
}
