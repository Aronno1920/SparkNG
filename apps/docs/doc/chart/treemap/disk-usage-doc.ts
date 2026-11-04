import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'disk-usage-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>File system storage analysis highlighting directory consumption.</p>
        </app-docsectiontext>
        <div class="card">
            <p-treemapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class DiskUsageDoc {
    options = {
        title: { text: 'Storage Consumption' },
        series: [
            {
                type: 'treemap',
                data: [
                    {
                        name: 'System',
                        value: 50,
                        children: [
                            { name: 'kernel', value: 20 },
                            { name: 'libs', value: 30 }
                        ]
                    },
                    {
                        name: 'Users',
                        value: 120,
                        children: [
                            { name: 'Alice', value: 70 },
                            { name: 'Bob', value: 50 }
                        ]
                    }
                ]
            }
        ]
    };
}
