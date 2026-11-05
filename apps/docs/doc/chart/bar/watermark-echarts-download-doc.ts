import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'watermark-echarts-download-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>ECharts download statistics over a rotated "ECHARTS" watermark: a canvas pattern fills the background behind stacked chart/component bars and two download pies.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" height="30rem" />
        </div>
        <app-code></app-code>
    `
})
export class WatermarkEchartsDownloadDoc {
    private platformId = inject(PLATFORM_ID);

    builderJson = {
        all: 10887,
        charts: {
            map: 3237,
            lines: 2164,
            bar: 7561,
            line: 7778,
            pie: 7355,
            scatter: 2405,
            candlestick: 1842,
            radar: 2090,
            heatmap: 1762,
            treemap: 1593,
            graph: 2060,
            boxplot: 1537,
            parallel: 1908,
            gauge: 2107,
            funnel: 1692,
            sankey: 1568
        } as Record<string, number>,
        components: {
            geo: 2788,
            title: 9575,
            legend: 9400,
            tooltip: 9466,
            grid: 9266,
            markPoint: 3419,
            markLine: 2984,
            timeline: 2739,
            dataZoom: 2744,
            visualMap: 2466,
            toolbox: 3034,
            polar: 1945
        } as Record<string, number>,
        ie: 9743
    };

    downloadJson: Record<string, number> = {
        'echarts.min.js': 17365,
        'echarts.simple.min.js': 4079,
        'echarts.common.min.js': 6929,
        'echarts.js': 14890
    };

    themeJson: Record<string, number> = {
        'dark.js': 1594,
        'infographic.js': 925,
        'shine.js': 1608,
        'roma.js': 721,
        'macarons.js': 2179,
        'vintage.js': 1982
    };

    waterMarkText = 'ECHARTS';

    options: any = {};

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = canvas.height = 100;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.globalAlpha = 0.08;
            ctx.font = '20px Microsoft Yahei';
            ctx.translate(50, 50);
            ctx.rotate(-Math.PI / 4);
            ctx.fillText(this.waterMarkText, 0, 0);

            this.options = {
                backgroundColor: {
                    type: 'pattern',
                    image: canvas,
                    repeat: 'repeat'
                },
                tooltip: {},
                title: [
                    {
                        text: '在线构建',
                        subtext: '总计 ' + this.builderJson.all,
                        left: '25%',
                        textAlign: 'center'
                    },
                    {
                        text: '各版本下载',
                        subtext: '总计 ' + Object.keys(this.downloadJson).reduce((all, key) => all + this.downloadJson[key], 0),
                        left: '75%',
                        textAlign: 'center'
                    },
                    {
                        text: '主题下载',
                        subtext: '总计 ' + Object.keys(this.themeJson).reduce((all, key) => all + this.themeJson[key], 0),
                        left: '75%',
                        top: '50%',
                        textAlign: 'center'
                    }
                ],
                grid: [
                    { top: 50, width: '50%', bottom: '45%', left: 10, containLabel: true },
                    { top: '55%', width: '50%', bottom: 0, left: 10, containLabel: true }
                ],
                xAxis: [
                    { type: 'value', max: this.builderJson.all, splitLine: { show: false } },
                    { type: 'value', max: this.builderJson.all, gridIndex: 1, splitLine: { show: false } }
                ],
                yAxis: [
                    {
                        type: 'category',
                        data: Object.keys(this.builderJson.charts),
                        axisLabel: { interval: 0, rotate: 30 },
                        splitLine: { show: false }
                    },
                    {
                        gridIndex: 1,
                        type: 'category',
                        data: Object.keys(this.builderJson.components),
                        axisLabel: { interval: 0, rotate: 30 },
                        splitLine: { show: false }
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        label: { position: 'right', show: true },
                        data: Object.keys(this.builderJson.charts).map((key) => this.builderJson.charts[key])
                    },
                    {
                        type: 'bar',
                        stack: 'chart',
                        silent: true,
                        itemStyle: { color: '#eee' },
                        data: Object.keys(this.builderJson.charts).map((key) => this.builderJson.all - this.builderJson.charts[key])
                    },
                    {
                        type: 'bar',
                        stack: 'component',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        z: 3,
                        label: { position: 'right', show: true },
                        data: Object.keys(this.builderJson.components).map((key) => this.builderJson.components[key])
                    },
                    {
                        type: 'bar',
                        stack: 'component',
                        silent: true,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        itemStyle: { color: '#eee' },
                        data: Object.keys(this.builderJson.components).map((key) => this.builderJson.all - this.builderJson.components[key])
                    },
                    {
                        type: 'pie',
                        radius: [0, '30%'],
                        center: ['75%', '25%'],
                        data: Object.keys(this.downloadJson).map((key) => ({ name: key.replace('.js', ''), value: this.downloadJson[key] }))
                    },
                    {
                        type: 'pie',
                        radius: [0, '30%'],
                        center: ['75%', '75%'],
                        data: Object.keys(this.themeJson).map((key) => ({ name: key.replace('.js', ''), value: this.themeJson[key] }))
                    }
                ]
            };
        }
    }
}
