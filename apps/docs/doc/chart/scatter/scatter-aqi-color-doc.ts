import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'scatter-aqi-color-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Beijing, Shanghai and Guangzhou AQI bubbles where a visualMap sizes points by PM2.5 and modulates color lightness by sulphur dioxide level.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class ScatterAqiColorDoc {
    dataBJ = [
        [1, 55, 9, 56, 0.46, 18, 6, 'Good'],
        [2, 25, 11, 21, 0.65, 34, 9, 'Excellent'],
        [3, 56, 7, 63, 0.3, 14, 5, 'Good'],
        [4, 33, 7, 29, 0.33, 16, 6, 'Excellent'],
        [5, 42, 24, 44, 0.76, 40, 16, 'Excellent'],
        [6, 82, 58, 90, 1.77, 68, 33, 'Good'],
        [7, 74, 49, 77, 1.46, 48, 27, 'Good'],
        [8, 78, 55, 80, 1.29, 59, 29, 'Good'],
        [9, 267, 216, 280, 4.8, 108, 64, 'Heavy'],
        [10, 185, 127, 216, 2.52, 61, 27, 'Moderate'],
        [11, 39, 19, 38, 0.57, 31, 15, 'Excellent'],
        [12, 41, 11, 40, 0.43, 21, 7, 'Excellent'],
        [13, 64, 38, 74, 1.04, 46, 22, 'Good'],
        [14, 108, 79, 120, 1.7, 75, 41, 'Light'],
        [15, 108, 63, 116, 1.48, 44, 26, 'Light'],
        [16, 33, 6, 29, 0.34, 13, 5, 'Excellent'],
        [17, 94, 66, 110, 1.54, 62, 31, 'Good'],
        [18, 186, 142, 192, 3.88, 93, 79, 'Moderate'],
        [19, 57, 31, 54, 0.96, 32, 14, 'Good'],
        [20, 22, 8, 17, 0.48, 23, 10, 'Excellent'],
        [21, 39, 15, 36, 0.61, 29, 13, 'Excellent'],
        [22, 94, 69, 114, 2.08, 73, 39, 'Good'],
        [23, 99, 73, 110, 2.43, 76, 48, 'Good'],
        [24, 31, 12, 30, 0.5, 32, 16, 'Excellent'],
        [25, 42, 27, 43, 1, 53, 22, 'Excellent'],
        [26, 154, 117, 157, 3.05, 92, 58, 'Moderate'],
        [27, 234, 185, 230, 4.09, 123, 69, 'Heavy'],
        [28, 160, 120, 186, 2.77, 91, 50, 'Moderate'],
        [29, 134, 96, 165, 2.76, 83, 41, 'Light'],
        [30, 52, 24, 60, 1.03, 50, 21, 'Good'],
        [31, 46, 5, 49, 0.28, 10, 6, 'Excellent']
    ];

    dataGZ = [
        [1, 26, 37, 27, 1.163, 27, 13, 'Excellent'],
        [2, 85, 62, 71, 1.195, 60, 8, 'Good'],
        [3, 78, 38, 74, 1.363, 37, 7, 'Good'],
        [4, 21, 21, 36, 0.634, 40, 9, 'Excellent'],
        [5, 41, 42, 46, 0.915, 81, 13, 'Excellent'],
        [6, 56, 52, 69, 1.067, 92, 16, 'Good'],
        [7, 64, 30, 28, 0.924, 51, 2, 'Good'],
        [8, 55, 48, 74, 1.236, 75, 26, 'Good'],
        [9, 76, 85, 113, 1.237, 114, 27, 'Good'],
        [10, 91, 81, 104, 1.041, 56, 40, 'Good'],
        [11, 84, 39, 60, 0.964, 25, 11, 'Good'],
        [12, 64, 51, 101, 0.862, 58, 23, 'Good'],
        [13, 70, 69, 120, 1.198, 65, 36, 'Good'],
        [14, 77, 105, 178, 2.549, 64, 16, 'Good'],
        [15, 109, 68, 87, 0.996, 74, 29, 'Light'],
        [16, 73, 68, 97, 0.905, 51, 34, 'Good'],
        [17, 54, 27, 47, 0.592, 53, 12, 'Good'],
        [18, 51, 61, 97, 0.811, 65, 19, 'Good'],
        [19, 91, 71, 121, 1.374, 43, 18, 'Good'],
        [20, 73, 102, 182, 2.787, 44, 19, 'Good'],
        [21, 73, 50, 76, 0.717, 31, 20, 'Good'],
        [22, 84, 94, 140, 2.238, 68, 18, 'Good'],
        [23, 93, 77, 104, 1.165, 53, 7, 'Good'],
        [24, 99, 130, 227, 3.97, 55, 15, 'Good'],
        [25, 146, 84, 139, 1.094, 40, 17, 'Light'],
        [26, 113, 108, 137, 1.481, 48, 15, 'Light'],
        [27, 81, 48, 62, 1.619, 26, 3, 'Good'],
        [28, 56, 48, 68, 1.336, 37, 9, 'Good'],
        [29, 82, 92, 174, 3.29, 0, 13, 'Good'],
        [30, 106, 116, 188, 3.628, 101, 16, 'Light'],
        [31, 118, 50, 0, 1.383, 76, 11, 'Light']
    ];

    dataSH = [
        [1, 91, 45, 125, 0.82, 34, 23, 'Good'],
        [2, 65, 27, 78, 0.86, 45, 29, 'Good'],
        [3, 83, 60, 84, 1.09, 73, 27, 'Good'],
        [4, 109, 81, 121, 1.28, 68, 51, 'Light'],
        [5, 106, 77, 114, 1.07, 55, 51, 'Light'],
        [6, 109, 81, 121, 1.28, 68, 51, 'Light'],
        [7, 106, 77, 114, 1.07, 55, 51, 'Light'],
        [8, 89, 65, 78, 0.86, 51, 26, 'Good'],
        [9, 53, 33, 47, 0.64, 50, 17, 'Good'],
        [10, 80, 55, 80, 1.01, 75, 24, 'Good'],
        [11, 117, 81, 124, 1.03, 45, 24, 'Light'],
        [12, 99, 71, 142, 1.1, 62, 42, 'Good'],
        [13, 95, 69, 130, 1.28, 74, 50, 'Good'],
        [14, 116, 87, 131, 1.47, 84, 40, 'Light'],
        [15, 108, 80, 121, 1.3, 85, 37, 'Light'],
        [16, 134, 83, 167, 1.16, 57, 43, 'Light'],
        [17, 79, 43, 107, 1.05, 59, 37, 'Good'],
        [18, 71, 46, 89, 0.86, 64, 25, 'Good'],
        [19, 97, 71, 113, 1.17, 88, 31, 'Good'],
        [20, 84, 57, 91, 0.85, 55, 31, 'Good'],
        [21, 87, 63, 101, 0.9, 56, 41, 'Good'],
        [22, 104, 77, 119, 1.09, 73, 48, 'Light'],
        [23, 87, 62, 100, 1, 72, 28, 'Good'],
        [24, 168, 128, 172, 1.49, 97, 56, 'Moderate'],
        [25, 65, 45, 51, 0.74, 39, 17, 'Good'],
        [26, 39, 24, 38, 0.61, 47, 17, 'Excellent'],
        [27, 39, 24, 39, 0.59, 50, 19, 'Excellent'],
        [28, 93, 68, 96, 1.05, 79, 29, 'Good'],
        [29, 188, 143, 197, 1.66, 99, 51, 'Moderate'],
        [30, 174, 131, 174, 1.55, 108, 50, 'Moderate'],
        [31, 187, 143, 201, 1.39, 89, 53, 'Moderate']
    ];

    schema = [
        { name: 'date', index: 0, text: 'Day' },
        { name: 'AQIindex', index: 1, text: 'AQI Index' },
        { name: 'PM25', index: 2, text: 'PM2.5' },
        { name: 'PM10', index: 3, text: 'PM10' },
        { name: 'CO', index: 4, text: 'Carbon Monoxide (CO)' },
        { name: 'NO2', index: 5, text: 'Nitrogen Dioxide (NO2)' },
        { name: 'SO2', index: 6, text: 'Sulphur Dioxide (SO2)' }
    ];

    itemStyle = {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.3)'
    };

    options = {
        color: ['#dd4444', '#fec42c', '#80F1BE'],
        legend: {
            top: 10,
            data: ['Beijing', 'Shanghai', 'Guangzhou'],
            textStyle: {
                fontSize: 16
            }
        },
        grid: {
            left: '10%',
            right: 150,
            top: '18%',
            bottom: '10%'
        },
        tooltip: {
            backgroundColor: 'rgba(255,255,255,0.7)',
            formatter: (param: any) => {
                const value = param.value;
                // prettier-ignore
                return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                    + param.seriesName + ' Day ' + value[0] + ': '
                    + value[7]
                    + '</div>'
                    + this.schema[1].text + ': ' + value[1] + '<br>'
                    + this.schema[2].text + ': ' + value[2] + '<br>'
                    + this.schema[3].text + ': ' + value[3] + '<br>'
                    + this.schema[4].text + ': ' + value[4] + '<br>'
                    + this.schema[5].text + ': ' + value[5] + '<br>'
                    + this.schema[6].text + ': ' + value[6] + '<br>';
            }
        },
        xAxis: {
            type: 'value',
            name: 'Date',
            nameGap: 16,
            nameTextStyle: {
                fontSize: 16
            },
            max: 31,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: 'AQI Index',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
                fontSize: 16
            },
            splitLine: {
                show: false
            }
        },
        visualMap: [
            {
                left: 'right',
                top: '10%',
                dimension: 2,
                min: 0,
                max: 250,
                itemWidth: 30,
                itemHeight: 120,
                calculable: true,
                precision: 0.1,
                text: ['Size: PM2.5'],
                textGap: 30,
                inRange: {
                    symbolSize: [10, 70]
                },
                outOfRange: {
                    symbolSize: [10, 70],
                    color: ['rgba(255,255,255,0.4)']
                },
                controller: {
                    inRange: {
                        color: ['#c23531']
                    },
                    outOfRange: {
                        color: ['#999']
                    }
                }
            },
            {
                left: 'right',
                bottom: '5%',
                dimension: 6,
                min: 0,
                max: 50,
                itemHeight: 120,
                text: ['Lightness: SO2'],
                textGap: 30,
                inRange: {
                    colorLightness: [0.9, 0.5]
                },
                outOfRange: {
                    color: ['rgba(255,255,255,0.4)']
                },
                controller: {
                    inRange: {
                        color: ['#c23531']
                    },
                    outOfRange: {
                        color: ['#999']
                    }
                }
            }
        ],
        series: [
            {
                name: 'Beijing',
                type: 'scatter',
                itemStyle: this.itemStyle,
                data: this.dataBJ
            },
            {
                name: 'Shanghai',
                type: 'scatter',
                itemStyle: this.itemStyle,
                data: this.dataSH
            },
            {
                name: 'Guangzhou',
                type: 'scatter',
                itemStyle: this.itemStyle,
                data: this.dataGZ
            }
        ]
    };
}
