import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'pie-special-label-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A pie chart whose CityE slice carries a rich-text label: a bordered card with weather icons, day counts and percentages.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PieSpecialLabelDoc {
    weatherIcons = {
        Sunny: 'demo/chart/img/weather/sunny_128.png',
        Cloudy: 'demo/chart/img/weather/cloudy_128.png',
        Showers: 'demo/chart/img/weather/showers_128.png'
    };

    options = {
        title: {
            text: 'Weather Statistics',
            subtext: 'Fake Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: 10,
            left: 'center',
            data: ['CityA', 'CityB', 'CityD', 'CityC', 'CityE']
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [
                    {
                        value: 1548,
                        name: 'CityE',
                        label: {
                            formatter: ['{title|{b}}{abg|}', '  {weatherHead|Weather}{valueHead|Days}{rateHead|Percent}', '{hr|}', '  {Sunny|}{value|202}{rate|55.3%}', '  {Cloudy|}{value|142}{rate|38.9%}', '  {Showers|}{value|21}{rate|5.8%}'].join(
                                '\n'
                            ),
                            backgroundColor: '#eee',
                            borderColor: '#777',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                title: {
                                    color: '#eee',
                                    align: 'center'
                                },
                                abg: {
                                    backgroundColor: '#333',
                                    width: '100%',
                                    align: 'right',
                                    height: 25,
                                    borderRadius: [4, 4, 0, 0]
                                },
                                Sunny: {
                                    height: 30,
                                    align: 'left',
                                    backgroundColor: {
                                        image: this.weatherIcons.Sunny
                                    }
                                },
                                Cloudy: {
                                    height: 30,
                                    align: 'left',
                                    backgroundColor: {
                                        image: this.weatherIcons.Cloudy
                                    }
                                },
                                Showers: {
                                    height: 30,
                                    align: 'left',
                                    backgroundColor: {
                                        image: this.weatherIcons.Showers
                                    }
                                },
                                weatherHead: {
                                    color: '#333',
                                    height: 24,
                                    align: 'left'
                                },
                                hr: {
                                    borderColor: '#777',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                value: {
                                    width: 20,
                                    padding: [0, 20, 0, 30],
                                    align: 'left'
                                },
                                valueHead: {
                                    color: '#333',
                                    width: 20,
                                    padding: [0, 20, 0, 30],
                                    align: 'center'
                                },
                                rate: {
                                    width: 40,
                                    align: 'right',
                                    padding: [0, 10, 0, 0]
                                },
                                rateHead: {
                                    color: '#333',
                                    width: 40,
                                    align: 'center',
                                    padding: [0, 10, 0, 0]
                                }
                            }
                        }
                    },
                    { value: 735, name: 'CityC' },
                    { value: 510, name: 'CityD' },
                    { value: 434, name: 'CityB' },
                    { value: 335, name: 'CityA' }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
}
