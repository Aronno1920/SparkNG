import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'transition-treemap-sunburst-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>SCharts package size hierarchy that animates between a treemap and a sunburst every 3 seconds via universal transition.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class TransitionTreemapSunburstDoc implements OnDestroy {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    private intervalId: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            fetch('demo/chart/data/scharts-package-size.json')
                .then((response) => response.json())
                .then((data) => {
                    const treemapOption = {
                        series: [
                            {
                                type: 'treemap',
                                id: 'scharts-package-size',
                                animationDurationUpdate: 1000,
                                roam: false,
                                nodeClick: undefined,
                                data: data.children,
                                universalTransition: true,
                                label: {
                                    show: true
                                },
                                breadcrumb: {
                                    show: false
                                }
                            }
                        ]
                    };

                    const sunburstOption = {
                        series: [
                            {
                                type: 'sunburst',
                                id: 'scharts-package-size',
                                radius: ['20%', '90%'],
                                animationDurationUpdate: 1000,
                                nodeClick: undefined,
                                data: data.children,
                                universalTransition: true,
                                itemStyle: {
                                    borderWidth: 1,
                                    borderColor: 'rgba(255,255,255,.5)'
                                },
                                label: {
                                    show: false
                                }
                            }
                        ]
                    };

                    let currentOption: any = treemapOption;

                    this.chart.setOption(currentOption);

                    this.intervalId = setInterval(() => {
                        currentOption = currentOption === treemapOption ? sunburstOption : treemapOption;
                        this.chart.setOption(currentOption);
                    }, 3000);
                });
        }
    }

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}
