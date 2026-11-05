import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'multi-title-gauge-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Three gauges — Good, Better and Perfect — sharing one dial with overlap progress arcs, their titles and value badges re-randomized every 2 seconds.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class MultiTitleGaugeDoc implements OnDestroy {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    private timer: any;

    gaugeData = [
        {
            value: 20,
            name: 'Good',
            title: {
                offsetCenter: ['-40%', '80%']
            },
            detail: {
                offsetCenter: ['-40%', '95%']
            }
        },
        {
            value: 40,
            name: 'Better',
            title: {
                offsetCenter: ['0%', '80%']
            },
            detail: {
                offsetCenter: ['0%', '95%']
            }
        },
        {
            value: 60,
            name: 'Perfect',
            title: {
                offsetCenter: ['40%', '80%']
            },
            detail: {
                offsetCenter: ['40%', '95%']
            }
        }
    ];

    options = {
        series: [
            {
                type: 'gauge',
                anchor: {
                    show: true,
                    showAbove: true,
                    size: 18,
                    itemStyle: {
                        color: '#FAC858'
                    }
                },
                pointer: {
                    icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                    width: 8,
                    length: '80%',
                    offsetCenter: [0, '8%']
                },

                progress: {
                    show: true,
                    overlap: true,
                    roundCap: true
                },
                axisLine: {
                    roundCap: true
                },
                data: this.gaugeData,
                title: {
                    fontSize: 14,
                    color: 'inherit'
                },
                detail: {
                    valueAnimation: true,
                    width: 48,
                    height: 14,
                    fontSize: 14,
                    color: '#fff',
                    backgroundColor: 'inherit',
                    borderRadius: 3,
                    formatter: '{value}%'
                }
            }
        ]
    };

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.timer = setInterval(() => this.tick(), 2000);
        }
    }

    ngOnDestroy(): void {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    onInit(event: any): void {
        this.chart = event.chart;
    }

    private tick(): void {
        this.gaugeData[0].value = Math.round(Math.random() * 100);
        this.gaugeData[1].value = Math.round(Math.random() * 100);
        this.gaugeData[2].value = Math.round(Math.random() * 100);
        this.chart?.setOption({
            series: [
                {
                    data: this.gaugeData
                }
            ]
        });
    }
}
