import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ChartModule } from '@bdspark/sparkng/chart';

@Component({
    selector: 'geo-svg-lines-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>GEO SVG Lines visualizes flight routes and transit trajectories across map projections.</p>
        </app-docsectiontext>
        <div class="card">
            <p-mapchart [options]="options" />
        </div>
        <app-code></app-code>
    `
})
export class GeoSvgLinesDoc {
    options = {
        geo: { map: 'world', roam: true },
        series: [
            {
                type: 'lines',
                coordinateSystem: 'geo',
                data: [
                    {
                        coords: [
                            [-74, 40.7],
                            [0.12, 51.5]
                        ]
                    },
                    {
                        coords: [
                            [0.12, 51.5],
                            [139.6, 35.6]
                        ]
                    }
                ],
                lineStyle: { color: '#38bdf8', width: 2, curveness: 0.2 }
            }
        ]
    };
}
