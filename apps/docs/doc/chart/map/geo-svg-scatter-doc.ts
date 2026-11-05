import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { ChartModule, registerMap } from '@bdspark/sparkng/chart';

@Component({
    selector: 'geo-svg-scatter-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Ripple effect scatter points sized by value over an SVG map of Iceland; clicking logs the converted geo coordinate.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class GeoSvgScatterDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        fetch('demo/chart/geo/Map_of_Iceland.svg')
            .then((r) => r.text())
            .then((svg: string) => {
                registerMap('iceland_svg', { svg });

                this.chart.setOption({
                    tooltip: {},
                    geo: {
                        tooltip: {
                            show: true
                        },
                        map: 'iceland_svg',
                        roam: true
                    },
                    series: {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        geoIndex: 0,
                        symbolSize: function (params: number[]) {
                            return (params[2] / 100) * 15 + 5;
                        },
                        itemStyle: {
                            color: '#b02a02'
                        },
                        encode: {
                            tooltip: 2
                        },
                        data: [
                            [488.2358421078053, 459.70913833075736, 100],
                            [770.3415644319939, 757.9672194986475, 30],
                            [1180.0329284196291, 743.6141808346214, 80],
                            [894.03790632245, 1188.1985153835008, 61],
                            [1372.98925630313, 477.3839988649537, 70],
                            [1378.62251255796, 935.6708486282843, 81]
                        ]
                    }
                });

                this.chart.getZr().on('click', (params: any) => {
                    const pixelPoint = [params.offsetX, params.offsetY];
                    const dataPoint = this.chart.convertFromPixel({ geoIndex: 0 }, pixelPoint);
                    console.log(dataPoint);
                });
            });
    }
}
