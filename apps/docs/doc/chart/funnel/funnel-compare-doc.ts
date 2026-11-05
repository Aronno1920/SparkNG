import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'funnel-compare-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Funnel Compare (Fake Data): four funnels pairing right-aligned and left-aligned Funnel/Pyramid series for five products.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class FunnelCompareDoc {
    options: any = {
        title: {
            text: 'Funnel Compare',
            subtext: 'Fake Data',
            left: 'left',
            top: 'bottom'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
            show: true,
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
            data: ['Prod A', 'Prod B', 'Prod C', 'Prod D', 'Prod E']
        },

        series: [
            {
                name: 'Funnel',
                type: 'funnel',
                width: '40%',
                height: '45%',
                left: '5%',
                top: '50%',
                funnelAlign: 'right',

                data: [
                    { value: 60, name: 'Prod C' },
                    { value: 30, name: 'Prod D' },
                    { value: 10, name: 'Prod E' },
                    { value: 80, name: 'Prod B' },
                    { value: 100, name: 'Prod A' }
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
                funnelAlign: 'right',

                data: [
                    { value: 60, name: 'Prod C' },
                    { value: 30, name: 'Prod D' },
                    { value: 10, name: 'Prod E' },
                    { value: 80, name: 'Prod B' },
                    { value: 100, name: 'Prod A' }
                ]
            },
            {
                name: 'Funnel',
                type: 'funnel',
                width: '40%',
                height: '45%',
                left: '55%',
                top: '5%',
                funnelAlign: 'left',

                data: [
                    { value: 60, name: 'Prod C' },
                    { value: 30, name: 'Prod D' },
                    { value: 10, name: 'Prod E' },
                    { value: 80, name: 'Prod B' },
                    { value: 100, name: 'Prod A' }
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
                funnelAlign: 'left',

                data: [
                    { value: 60, name: 'Prod C' },
                    { value: 30, name: 'Prod D' },
                    { value: 10, name: 'Prod E' },
                    { value: 80, name: 'Prod B' },
                    { value: 100, name: 'Prod A' }
                ]
            }
        ]
    };
}
