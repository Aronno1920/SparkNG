import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'radial-tree-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Radial Tree distributes nested branches outward in a 360-degree circular layout loaded from <i>flare.json</i>, with descendant emphasis highlighting.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" height="36rem" />
        </div>
        <app-code></app-code>
    `
})
export class RadialTreeDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            this.chart.showLoading();

            fetch('demo/chart/data/flare.json')
                .then((res) => res.json())
                .then((data) => {
                    this.chart.hideLoading();

                    this.options = {
                        tooltip: {
                            trigger: 'item',
                            triggerOn: 'mousemove'
                        },
                        series: [
                            {
                                type: 'tree',
                                data: [data],
                                top: '18%',
                                bottom: '14%',
                                layout: 'radial',
                                symbol: 'emptyCircle',
                                symbolSize: 7,
                                initialTreeDepth: 3,
                                animationDurationUpdate: 750,
                                emphasis: {
                                    focus: 'descendant'
                                }
                            }
                        ]
                    };

                    this.chart.setOption(this.options, true);
                });
        }
    }
}
