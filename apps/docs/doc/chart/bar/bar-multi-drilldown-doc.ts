import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'bar-multi-drilldown-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Three levels of drilldown across things, animals, fruits and cars: each bar clones into its children through <i>universalTransition</i> and the <i>Back</i> label rewinds one level.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" (onChartInit)="onInit($event)" (onChartClick)="onClick($event)" />
        </div>
        <app-code></app-code>
    `
})
export class BarMultiDrilldownDoc {
    // This example requires SCharts v5.5.0 or later
    // level 1 (root)
    data_things = [
        ['Animals', 3, 'things', 'animals'],
        ['Fruits', 3, 'things', 'fruits'],
        ['Cars', 2, 'things', 'cars']
    ];
    // level 2
    data_animals = [
        ['Dogs', 3, 'animals', 'dogs'],
        ['Cats', 4, 'animals', 'cats'],
        ['Birds', 3, 'animals', 'birds']
    ];
    data_fruits = [
        ['Pomes', 3, 'fruits', 'pomes'],
        ['Berries', 4, 'fruits', 'berries'],
        ['Citrus', 9, 'fruits', 'citrus']
    ];
    data_cars = [
        ['SUV', 5, 'cars', 'suv'],
        ['Sports', 3, 'cars', 'sports']
    ];
    // level 3
    data_dogs = [
        ['Corgi', 5, 'dogs'], // the "childest" data need not to be specified a `childGroupId`
        ['Bulldog', 6, 'dogs'],
        ['Shiba Inu', 7, 'dogs']
    ];
    data_cats = [
        ['American Shorthair', 2, 'cats'],
        ['British Shorthair', 9, 'cats'],
        ['Bengal', 2, 'cats'],
        ['Birman', 2, 'cats']
    ];
    data_birds = [
        ['Goose', 1, 'birds'],
        ['Owl', 2, 'birds'],
        ['Eagle', 8, 'birds']
    ];
    data_pomes = [
        ['Apple', 9, 'pomes'],
        ['Pear', 2, 'pomes'],
        ['Kiwi', 1, 'pomes']
    ];
    data_berries = [
        ['Blackberries', 7, 'berries'],
        ['Cranberries', 2, 'berries'],
        ['Strawberries', 9, 'berries'],
        ['Grapes', 4, 'berries']
    ];
    data_citrus = [
        ['Oranges', 3, 'citrus'],
        ['Grapefruits', 7, 'citrus'],
        ['Tangerines', 8, 'citrus'],
        ['Lemons', 7, 'citrus'],
        ['Limes', 3, 'citrus'],
        ['Kumquats', 2, 'citrus'],
        ['Citrons', 3, 'citrus'],
        ['Tengelows', 3, 'citrus'],
        ['Uglifruit', 1, 'citrus']
    ];
    data_suv = [
        ['Mazda CX-30', 7, 'suv'],
        ['BMW X2', 7, 'suv'],
        ['Ford Bronco Sport', 2, 'suv'],
        ['Toyota RAV4', 9, 'suv'],
        ['Porsche Macan', 4, 'suv']
    ];
    data_sports = [
        ['Porsche 718 Cayman', 2, 'sports'],
        ['Porsche 911 Turbo', 2, 'sports'],
        ['Ferrari F8', 4, 'sports']
    ];

    allLevelData = [this.data_things, this.data_animals, this.data_fruits, this.data_cars, this.data_dogs, this.data_cats, this.data_birds, this.data_pomes, this.data_berries, this.data_citrus, this.data_suv, this.data_sports];

    allOptions: { [index: string]: any } = {};

    private chart: any;

    options: any;

    // A stack to remember previous option id
    optionStack: string[] = [];

    constructor() {
        this.allLevelData.forEach((data) => {
            // since dataItems of each data have same groupId in this
            // example, we can use groupId as optionId for optionStack.
            const optionId = data[0][2];

            const option = {
                id: optionId, // option.id is not a property of the option model, but can be accessed if we provide it
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    minInterval: 1
                },
                animationDurationUpdate: 500,
                series: {
                    type: 'bar',
                    dimensions: ['x', 'y', 'groupId', 'childGroupId'],
                    encode: {
                        x: 'x',
                        y: 'y',
                        itemGroupId: 'groupId',
                        itemChildGroupId: 'childGroupId'
                    },
                    data,
                    universalTransition: {
                        enabled: true,
                        divideShape: 'clone'
                    }
                },
                graphic: [
                    {
                        type: 'text',
                        left: 50,
                        top: 20,
                        style: {
                            text: 'Back',
                            fontSize: 18,
                            fill: 'grey'
                        },
                        onclick: () => {
                            this.goBack();
                        }
                    }
                ]
            };
            this.allOptions[optionId] = option;
        });

        this.options = this.allOptions['things']; // The initial option is the root data option
    }

    onInit(event: any): void {
        this.chart = event.chart;
    }

    onClick(event: any): void {
        const dataItem = event.data;
        if (dataItem && dataItem[3]) {
            // If current params is not belong to the "childest" data, it has data[3]
            const childGroupId = dataItem[3];
            // since we use groupId as optionId in this example,
            // we use childGroupId as the next level optionId.
            this.goForward(childGroupId);
        }
    }

    private goForward(optionId: string): void {
        this.optionStack.push(this.chart.getOption().id); // push current option id into stack.
        this.chart.setOption(this.allOptions[optionId]);
    }

    private goBack(): void {
        if (this.optionStack.length === 0) {
            console.log('Already in root level!');
        } else {
            console.log('Go back to previous level.');
            this.chart.setOption(this.allOptions[this.optionStack.pop() as string]);
        }
    }
}
