import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'multiple-funnels-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Multiple Funnels: four funnels arranged in a grid, alternating descending funnels and ascending pyramids.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class MultipleFunnelsDoc {
    options: any = {
        title: {
            text: 'Funnel',
            left: 'left',
            top: 'bottom'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
            orient: 'vertical',
            top: 'center',
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
        },

        series: [
            {
                name: 'Funnel',
                type: 'funnel',
                width: '40%',
                height: '45%',
                left: '5%',
                top: '50%',
                data: [
                    { value: 60, name: 'Visit' },
                    { value: 30, name: 'Inquiry' },
                    { value: 10, name: 'Order' },
                    { value: 80, name: 'Click' },
                    { value: 100, name: 'Show' }
                ]
            },
            {
                name: 'Pyramid',
                type: 'funnel',
                width: '40%',
                height: '45%',
                left: '5%',
                top: '5%',
                sort: 'ascending',
                data: [
                    { value: 60, name: 'Visit' },
                    { value: 30, name: 'Inquiry' },
                    { value: 10, name: 'Order' },
                    { value: 80, name: 'Click' },
                    { value: 100, name: 'Show' }
                ]
            },
            {
                name: 'Funnel',
                type: 'funnel',
                width: '40%',
                height: '45%',
                left: '55%',
                top: '5%',
                label: {
                    position: 'left'
                },
                data: [
                    { value: 60, name: 'Visit' },
                    { value: 30, name: 'Inquiry' },
                    { value: 10, name: 'Order' },
                    { value: 80, name: 'Click' },
                    { value: 100, name: 'Show' }
                ]
            },
            {
                name: 'Pyramid',
                type: 'funnel',
                width: '40%',
                height: '45%',
                left: '55%',
                top: '50%',
                sort: 'ascending',
                label: {
                    position: 'left'
                },
                data: [
                    { value: 60, name: 'Visit' },
                    { value: 30, name: 'Inquiry' },
                    { value: 10, name: 'Order' },
                    { value: 80, name: 'Click' },
                    { value: 100, name: 'Show' }
                ]
            }
        ]
    };
}
