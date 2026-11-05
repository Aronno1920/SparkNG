import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';
import { time } from '@bdspark/sparkng-charts';

@Component({
    selector: 'intraday-chart-breaks-2-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A single-day intraday line chart with a lunch-break axis gap whose labels show the break start and end times.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class IntradayChartBreaks2Doc {
    options: any;

    constructor() {
        var formatTime = time.format;

        var _data = this.generateData1();

        this.options = {
            // Choose axis ticks based on UTC time.
            useUTC: true,
            title: {
                text: 'Intraday Chart with Breaks (Single Day)',
                left: 'center'
            },
            tooltip: {
                show: true,
                trigger: 'axis'
            },
            xAxis: [
                {
                    type: 'time',
                    interval: 1000 * 60 * 30, // 30 minutes
                    axisLabel: {
                        showMinLabel: true,
                        showMaxLabel: true,
                        formatter: (value, index, extra) => {
                            if (!extra || !extra.break) {
                                // The third parameter is `useUTC: true`.
                                return formatTime(value, '{HH}:{mm}', true);
                            }
                            // Only render the label on break start, but not on break end.
                            if (extra.break.type === 'start') {
                                return formatTime(extra.break.start, '{HH}:{mm}', true) + '/' + formatTime(extra.break.end, '{HH}:{mm}', true);
                            }
                            return '';
                        }
                    },
                    breakLabelLayout: {
                        // Disable auto move of break labels if overlapping,
                        // and use `axisLabel.formatter` to control the label display.
                        moveOverlap: false
                    },
                    breaks: [
                        {
                            start: _data.breakStart,
                            end: _data.breakEnd,
                            gap: 0
                        }
                    ],
                    breakArea: {
                        expandOnClick: false,
                        zigzagAmplitude: 0,
                        zigzagZ: 200
                    }
                }
            ],
            yAxis: {
                type: 'value',
                min: 'dataMin'
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0
                },
                {
                    type: 'slider',
                    xAxisIndex: 0
                }
            ],
            series: [
                {
                    type: 'line',
                    symbolSize: 0,
                    data: _data.seriesData
                }
            ]
        };
    }

    /**
     * Generate random data, not relevant to scharts API.
     */
    private generateData1() {
        var seriesData = [];
        var time = new Date('2024-04-09T09:30:00Z');
        var endTime = new Date('2024-04-09T15:00:00Z').getTime();
        var breakStart = new Date('2024-04-09T11:30:00Z').getTime();
        var breakEnd = new Date('2024-04-09T13:00:00Z').getTime();

        for (var val = 1669; time.getTime() <= endTime;) {
            if (time.getTime() <= breakStart || time.getTime() >= breakEnd) {
                val = val + Math.floor((Math.random() - 0.5 * Math.sin(val / 1000)) * 20 * 100) / 100;
                val = +val.toFixed(2);
                seriesData.push([time.getTime(), val]);
            }
            time.setMinutes(time.getMinutes() + 1);
        }
        return {
            seriesData: seriesData,
            breakStart: breakStart,
            breakEnd: breakEnd
        };
    }
}
