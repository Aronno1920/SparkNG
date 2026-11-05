import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'geo-svg-traffic-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>GEO SVG Traffic simulates flow velocities and traffic density across vector networks.</p>
        </app-docsectiontext>
        <div class="card">
            <p-mapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class GeoSvgTrafficDoc {
    options = {
        geo: { map: 'world', roam: true },
        series: [
            {
                type: 'lines',
                coordinateSystem: 'geo',
                effect: { show: true, period: 4, trailLength: 0.2, symbol: 'arrow', symbolSize: 6 },
                data: [
                    {
                        coords: [
                            [-122.4, 37.7],
                            [-74, 40.7]
                        ]
                    },
                    {
                        coords: [
                            [-74, 40.7],
                            [13.4, 52.5]
                        ]
                    }
                ],
                lineStyle: { color: '#10b981', width: 1.5, opacity: 0.6 }
            }
        ]
    };
}
