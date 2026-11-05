import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { isPlatformBrowser } from '@angular/common';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { ChartModule, registerMap } from '@bdspark/sparkng/chart';

const CHUNK_COUNT = 32;

@Component({
    selector: 'ny-streets-lines-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Nearly one million New York street segments streamed as 32 binary chunks and appended progressively to a large-mode lines series over the world map.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class NyStreetsLinesDoc implements OnDestroy {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    private destroyed = false;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        fetch('demo/chart/geo/world.json')
            .then((r) => r.json())
            .then((worldJson: any) => {
                if (this.destroyed) {
                    return;
                }

                registerMap('world', worldJson);

                this.chart.setOption({
                    progressive: 20000,
                    backgroundColor: '#111',
                    geo: {
                        center: [-74.04327099998152, 40.86737600240287],
                        zoom: 360,
                        map: 'world',
                        roam: true,
                        silent: true,
                        itemStyle: {
                            color: 'transparent',
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderWidth: 1
                        }
                    },
                    series: [
                        {
                            type: 'lines',

                            coordinateSystem: 'geo',

                            blendMode: 'lighter',

                            dimensions: ['value'],

                            data: new Float64Array(),
                            polyline: true,
                            large: true,

                            lineStyle: {
                                color: 'orange',
                                width: 0.5,
                                opacity: 0.3
                            }
                        }
                    ]
                });

                this.fetchData(0);
            });
    }

    private fetchData(idx: number): void {
        if (this.destroyed) {
            return;
        }
        if (idx >= CHUNK_COUNT) {
            return;
        }
        const dataURL = 'demo/chart/data/links-ny/links_ny_' + idx + '.bin';

        fetch(dataURL)
            .then((response) => response.arrayBuffer())
            .then((buffer) => {
                if (this.destroyed) {
                    return;
                }

                const rawData = new Float32Array(buffer);
                const data = new Float64Array(rawData.length - 2);
                const offsetX = rawData[0];
                const offsetY = rawData[1];
                let off = 0;
                for (let i = 2; i < rawData.length;) {
                    const count = rawData[i++];
                    data[off++] = count;
                    for (let k = 0; k < count; k++) {
                        const x = rawData[i++] + offsetX;
                        const y = rawData[i++] + offsetY;
                        data[off++] = x;
                        data[off++] = y;
                    }
                }

                this.chart.appendData({
                    seriesIndex: 0,
                    data: data
                });

                this.fetchData(idx + 1);
            });
    }

    ngOnDestroy(): void {
        this.destroyed = true;
    }
}
