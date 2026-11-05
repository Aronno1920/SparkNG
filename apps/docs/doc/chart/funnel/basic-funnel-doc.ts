import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'basic-funnel-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Funnel chart of the Show, Click, Visit, Inquiry and Order stages, sorted descending with inside labels.</p>
        </app-docsectiontext>
        <div class="card">
            <p-chart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class BasicFunnelDoc {
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
                name: 'Funnel',
                type: 'funnel',
                left: '10%',
                top: 60,
                bottom: 60,
                width: '80%',
                min: 0,
                max: 100,
                minSize: '0%',
                maxSize: '100%',
                sort: 'descending',
                gap: 2,
                label: {
                    show: true,
                    position: 'inside'
                },
                labelLine: {
                    length: 10,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20
                    }
                },
                data: [
                    { value: 60, name: 'Visit' },
                    { value: 40, name: 'Inquiry' },
                    { value: 20, name: 'Order' },
                    { value: 80, name: 'Click' },
                    { value: 100, name: 'Show' }
                ]
            }
        ]
    };
}
