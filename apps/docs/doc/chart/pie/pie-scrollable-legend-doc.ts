import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'pie-scrollable-legend-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>A pie chart of 50 randomly generated names with a scrollable vertical legend.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class PieScrollableLegendDoc {
    data = genData(50);

    options = {
        title: {
            text: 'Name Frequency Statistics',
            subtext: 'Fictional Data',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: this.data.legendData
        },
        series: [
            {
                name: 'Name',
                type: 'pie',
                radius: '55%',
                center: ['40%', '50%'],
                data: this.data.seriesData,
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

function genData(count: number) {
    const firstNames = [
        'James',
        'Mary',
        'John',
        'Patricia',
        'Robert',
        'Jennifer',
        'Michael',
        'Linda',
        'William',
        'Elizabeth',
        'David',
        'Barbara',
        'Richard',
        'Susan',
        'Joseph',
        'Jessica',
        'Thomas',
        'Sarah',
        'Charles',
        'Karen',
        'Christopher',
        'Nancy',
        'Daniel',
        'Lisa',
        'Matthew',
        'Betty',
        'Anthony',
        'Margaret',
        'Mark',
        'Sandra',
        'Steven',
        'Ashley',
        'Paul',
        'Kimberly',
        'Andrew',
        'Emily',
        'Joshua',
        'Donna',
        'Kenneth',
        'Michelle'
    ];
    const lastNames = [
        'Smith',
        'Johnson',
        'Williams',
        'Brown',
        'Jones',
        'Garcia',
        'Miller',
        'Davis',
        'Rodriguez',
        'Martinez',
        'Hernandez',
        'Lopez',
        'Gonzalez',
        'Wilson',
        'Anderson',
        'Thomas',
        'Taylor',
        'Moore',
        'Jackson',
        'Martin',
        'Lee',
        'Perez',
        'Thompson',
        'White',
        'Harris',
        'Sanchez',
        'Clark',
        'Ramirez',
        'Lewis',
        'Robinson',
        'Walker'
    ];
    const legendData: string[] = [];
    const seriesData: { name: string; value: number }[] = [];
    for (let i = 0; i < count; i++) {
        const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
        const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
        const name = `${fn} ${ln} ${i + 1}`;
        legendData.push(name);
        seriesData.push({
            name: name,
            value: Math.round(Math.random() * 100000)
        });
    }

    return {
        legendData: legendData,
        seriesData: seriesData
    };
}
