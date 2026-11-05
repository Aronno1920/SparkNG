import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { ChartModule, registerMap } from '@bdspark/sparkng/chart';

@Component({
    selector: 'flight-seatmap-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>An SVG aircraft cabin where seats can be multi-selected on the geo component; taken seats are rendered silent in red.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" />
        </div>
        <app-code></app-code>
    `
})
export class FlightSeatmapDoc {
    private platformId = inject(PLATFORM_ID);

    private chart: any;

    options: any = {};

    onInit(event: any): void {
        this.chart = event.chart;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        fetch('demo/chart/geo/flight-seats.svg')
            .then((r) => r.text())
            .then((svg: string) => {
                registerMap('flight-seats', { svg });

                const takenSeatNames = ['26E', '26D', '26C', '25D', '23C', '21A', '20F'];

                this.chart.setOption({
                    tooltip: {},
                    geo: {
                        map: 'flight-seats',
                        roam: true,
                        selectedMode: 'multiple',
                        layoutCenter: ['50%', '50%'],
                        layoutSize: '95%',
                        tooltip: {
                            show: true
                        },
                        itemStyle: {
                            color: '#fff'
                        },
                        emphasis: {
                            itemStyle: {
                                color: undefined,
                                borderColor: 'green',
                                borderWidth: 2
                            },
                            label: {
                                show: false
                            }
                        },
                        select: {
                            itemStyle: {
                                color: 'green'
                            },
                            label: {
                                show: false,
                                textBorderColor: '#fff',
                                textBorderWidth: 2
                            }
                        },
                        regions: this.makeTakenRegions(takenSeatNames)
                    }
                });

                // Get selected seats.
                this.chart.on('geoselectchanged', (params: any) => {
                    const selectedNames: string[] = params.allSelected[0].name.slice();

                    // Remove taken seats.
                    for (let i = selectedNames.length - 1; i >= 0; i--) {
                        if (takenSeatNames.indexOf(selectedNames[i]) >= 0) {
                            selectedNames.splice(i, 1);
                        }
                    }

                    console.log('selected', selectedNames);
                });
            });
    }

    private makeTakenRegions(takenSeatNames: string[]) {
        const regions = [];
        for (let i = 0; i < takenSeatNames.length; i++) {
            regions.push({
                name: takenSeatNames[i],
                silent: true,
                itemStyle: {
                    color: '#bf0e08'
                },
                emphasis: {
                    itemStyle: {
                        borderColor: '#aaa',
                        borderWidth: 1
                    }
                },
                select: {
                    itemStyle: {
                        color: '#bf0e08'
                    }
                }
            });
        }
        return regions;
    }
}
