import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bump-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A bump chart tracks rankings over time with smooth curves, end labels, and highlighted series emphasis.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BumpDoc {
    names = ['Orange', 'Tomato', 'Apple', 'Sakana', 'Banana', 'Iwashi', 'Snappy Fish', 'Lemon', 'Pasta'] as const;

    years = ['2001', '2002', '2003', '2004', '2005', '2006'];

    options: any;

    constructor() {
        this.options = {
            title: {
                text: 'Bump Chart (Ranking)'
            },
            tooltip: {
                trigger: 'item'
            },
            grid: {
                left: 30,
                right: 110,
                bottom: 30,
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                splitLine: {
                    show: true
                },
                axisLabel: {
                    margin: 30,
                    fontSize: 16
                },
                boundaryGap: false,
                data: this.years
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    margin: 30,
                    fontSize: 16,
                    formatter: '#{value}'
                },
                inverse: true,
                interval: 1,
                min: 1,
                max: this.names.length
            },
            series: this.generateSeriesList()
        };
    }

    private shuffle<T>(array: T[]): T[] {
        const copy = [...array];
        let currentIndex = copy.length;
        let randomIndex = 0;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]];
        }
        return copy;
    }

    private generateRankingData(): Map<string, number[]> {
        const map: Map<string, number[]> = new Map();
        const defaultRanking: number[] = Array.from({ length: this.names.length }, (_, i) => i + 1);

        for (const _ of this.years) {
            const shuffleArray = this.shuffle(defaultRanking);
            this.names.forEach((name, i) => {
                map.set(name, (map.get(name) || []).concat(shuffleArray[i]));
            });
        }
        return map;
    }

    private generateSeriesList(): any[] {
        const seriesList: any[] = [];
        const rankingMap = this.generateRankingData();

        rankingMap.forEach((data, name) => {
            seriesList.push({
                name,
                symbolSize: 20,
                type: 'line',
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
                endLabel: {
                    show: true,
                    formatter: '{a}',
                    distance: 20
                },
                lineStyle: {
                    width: 4
                },
                data
            });
        });
        return seriesList;
    }
}
