import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'customized-funnel-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Customized funnel overlaying the semi-transparent Expected funnel with the Actual funnel whose inside labels show percentages.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class CustomizedFunnelDoc {
    options: any = {
        title: {
            text: 'Funnel'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
        },
        series: [
            {
                name: 'Expected',
                type: 'funnel',
                left: '10%',
                width: '80%',
                label: {
                    formatter: '{b}Expected'
                },
                labelLine: {
                    show: false
                },
                itemStyle: {
                    opacity: 0.7
                },
                emphasis: {
                    label: {
                        position: 'inside',
                        formatter: '{b}Expected: {c}%'
                    }
                },
                data: [
                    { value: 60, name: 'Visit' },
                    { value: 40, name: 'Inquiry' },
                    { value: 20, name: 'Order' },
                    { value: 80, name: 'Click' },
                    { value: 100, name: 'Show' }
                ]
            },
            {
                name: 'Actual',
                type: 'funnel',
                left: '10%',
                width: '80%',
                maxSize: '80%',
                label: {
                    position: 'inside',
                    formatter: '{c}%',
                    color: '#fff'
                },
                itemStyle: {
                    opacity: 0.5,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                emphasis: {
                    label: {
                        position: 'inside',
                        formatter: '{b}Actual: {c}%'
                    }
                },
                data: [
                    { value: 30, name: 'Visit' },
                    { value: 10, name: 'Inquiry' },
                    { value: 5, name: 'Order' },
                    { value: 50, name: 'Click' },
                    { value: 80, name: 'Show' }
                ],
                // Ensure outer shape will not be over inner shape when hover.
                z: 100
            }
        ]
    };
}
