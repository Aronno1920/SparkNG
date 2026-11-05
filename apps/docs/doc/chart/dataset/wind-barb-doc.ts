import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';
import { format, type CustomSeriesRenderItemAPI, type CustomSeriesRenderItemParams, type CustomSeriesRenderItemReturn } from '@bdspark/sparkng-charts';

@Component({
    selector: 'wind-barb-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Wind barbs for Hobart rendered by a custom series pointing along the 16-wind compass, over a wave-height area line, weather icons and a piecewise visualMap of wind speed.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" height="36rem" />
        </div>
        <app-code></app-code>
    `
})
export class WindBarbDoc {
    private platformId = inject(PLATFORM_ID);

    private weatherIcons: Record<string, string> = {
        Showers: 'demo/chart/img/weather/showers_128.png',
        Sunny: 'demo/chart/img/weather/sunny_128.png',
        Cloudy: 'demo/chart/img/weather/cloudy_128.png'
    };

    private directionMap: Record<string, number> = {};

    private dims = {
        time: 0,
        windSpeed: 1,
        R: 2,
        waveHeight: 3,
        weatherIcon: 2,
        minTemp: 3,
        maxTemp: 4
    };
    private arrowSize = 18;
    private weatherIconSize = 45;

    private chart: any;

    options: any = {};

    constructor() {
        // prettier-ignore
        ['W', 'WSW', 'SW', 'SSW', 'S', 'SSE', 'SE', 'ESE', 'E', 'ENE', 'NE', 'NNE', 'N', 'NNW', 'NW', 'WNW'].forEach(
            (name, index) => {
                this.directionMap[name] = Math.PI / 8 * index;
            }
        );
    }

    onInit(event: any): void {
        this.chart = event.chart;
        if (this.chart && isPlatformBrowser(this.platformId)) {
            fetch('demo/chart/data/wind-barb-hobart.json')
                .then((response) => response.json())
                .then((rawData) => {
                    this.chart.setOption(this.getOption(rawData));
                });
        }
    }

    private getOption(rawData: any): any {
        const data = rawData.data.map(function (entry: any) {
            return [entry.time, entry.windSpeed, entry.R, entry.waveHeight];
        });
        const weatherData = rawData.forecast.map((entry: any) => {
            return [entry.localDate, 0, this.weatherIcons[entry.skyIcon], entry.minTemp, entry.maxTemp];
        });

        return {
            title: {
                text: 'Weather, Wind Direction, Wind Speed, and Wave Forecast',
                subtext: 'Data from www.seabreeze.com.au',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                formatter: (params: any) => {
                    return [
                        format.formatTime('yyyy-MM-dd', params[0].value[this.dims.time]) + ' ' + format.formatTime('hh:mm', params[0].value[this.dims.time]),
                        'Wind Speed: ' + params[0].value[this.dims.windSpeed] + ' knots',
                        'Wind Direction: ' + params[0].value[this.dims.R],
                        'Wave Height: ' + params[0].value[this.dims.waveHeight] + ' m'
                    ].join('<br>');
                }
            },
            grid: {
                top: 160,
                bottom: 125
            },
            xAxis: {
                type: 'time',
                maxInterval: 3600 * 1000 * 24,
                splitLine: {
                    lineStyle: {
                        color: '#ddd'
                    }
                }
            },
            yAxis: [
                {
                    name: 'Wind Speed (knots)',
                    nameLocation: 'middle',
                    nameGap: 35,
                    axisLine: {
                        lineStyle: {
                            color: '#666'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#ddd'
                        }
                    }
                },
                {
                    name: 'Wave Height (m)',
                    nameLocation: 'middle',
                    nameGap: 35,
                    max: 6,
                    axisLine: {
                        lineStyle: {
                            color: '#015DD5'
                        }
                    },
                    splitLine: { show: false }
                },
                {
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: { show: false },
                    splitLine: { show: false }
                }
            ],
            visualMap: {
                type: 'piecewise',
                // show: false,
                orient: 'horizontal',
                left: 'center',
                bottom: 10,
                pieces: [
                    {
                        gte: 17,
                        color: '#18BF12',
                        label: 'Strong Wind (>= 17 knots)'
                    },
                    {
                        gte: 11,
                        lt: 17,
                        color: '#f4e9a3',
                        label: 'Moderate Wind (11 - 17 knots)'
                    },
                    {
                        lt: 11,
                        color: '#D33C3E',
                        label: 'Light Breeze (< 11 knots)'
                    }
                ],
                seriesIndex: 1,
                dimension: 1
            },
            dataZoom: [
                {
                    type: 'inside',
                    xAxisIndex: 0,
                    minSpan: 5
                },
                {
                    type: 'slider',
                    xAxisIndex: 0,
                    minSpan: 5,
                    bottom: 50
                }
            ],
            series: [
                {
                    type: 'line',
                    yAxisIndex: 1,
                    showSymbol: false,
                    emphasis: {
                        scale: false
                    },
                    symbolSize: 10,
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            global: false,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(88,160,253,1)'
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba(88,160,253,0.7)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(88,160,253,0)'
                                }
                            ]
                        }
                    },
                    lineStyle: {
                        color: 'rgba(88,160,253,1)'
                    },
                    itemStyle: {
                        color: 'rgba(88,160,253,1)'
                    },
                    encode: {
                        x: this.dims.time,
                        y: this.dims.waveHeight
                    },
                    data: data,
                    z: 2
                },
                {
                    type: 'custom',
                    renderItem: (param: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) => this.renderArrow(param, api),
                    encode: {
                        x: this.dims.time,
                        y: this.dims.windSpeed
                    },
                    data: data,
                    z: 10
                },
                {
                    type: 'line',
                    symbol: 'none',
                    encode: {
                        x: this.dims.time,
                        y: this.dims.windSpeed
                    },
                    lineStyle: {
                        color: '#aaa',
                        type: 'dotted'
                    },
                    data: data,
                    z: 1
                },
                {
                    type: 'custom',
                    renderItem: (param: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) => this.renderWeather(param, api),
                    data: weatherData,
                    tooltip: {
                        trigger: 'item',
                        formatter: (param: any) => {
                            return param.value[this.dims.time] + ': ' + param.value[this.dims.minTemp] + ' - ' + param.value[this.dims.maxTemp] + '°';
                        }
                    },
                    yAxisIndex: 2,
                    z: 11
                }
            ]
        };
    }

    private renderArrow(param: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI): CustomSeriesRenderItemReturn {
        const point = api.coord([api.value(this.dims.time), api.value(this.dims.windSpeed)]);

        return {
            type: 'path',
            shape: {
                pathData: 'M31 16l-15-15v9h-26v12h26v9z',
                x: -this.arrowSize / 2,
                y: -this.arrowSize / 2,
                width: this.arrowSize,
                height: this.arrowSize
            },
            rotation: this.directionMap[api.value(this.dims.R) as string],
            position: point,
            style: api.style({
                stroke: '#555',
                lineWidth: 1
            })
        } as CustomSeriesRenderItemReturn;
    }

    private renderWeather(param: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI): any {
        const point = api.coord([(api.value(this.dims.time) as number) + (3600 * 24 * 1000) / 2, 0]);

        return {
            type: 'group',
            children: [
                {
                    type: 'image',
                    style: {
                        image: api.value(this.dims.weatherIcon) as string,
                        x: -this.weatherIconSize / 2,
                        y: -this.weatherIconSize / 2,
                        width: this.weatherIconSize,
                        height: this.weatherIconSize
                    },
                    position: [point[0], 110]
                },
                {
                    type: 'text',
                    style: {
                        text: api.value(this.dims.minTemp) + ' - ' + api.value(this.dims.maxTemp) + '°',
                        textFont: api.font({ fontSize: 14 }),
                        textAlign: 'center',
                        textVerticalAlign: 'bottom'
                    },
                    position: [point[0], 80]
                }
            ]
        };
    }
}
