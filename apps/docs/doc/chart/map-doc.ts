import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { ChartModule, registerMap } from '@bdspark/sparkng/chart';

@Component({
    selector: 'map-doc',
    standalone: true,
    imports: [NgIf, AppCode, AppDocSectionText, ChartModule],
    template: `
        <app-docsectiontext>
            <p>Map charts color regions of a GeoJSON map by value. Register the map once with <i>registerMap</i>, reference it by name and attach a <i>visualMap</i> to drive the color scale. This demo loads the world atlas from a CDN at runtime.</p>
        </app-docsectiontext>
        <div class="card">
            <p-mapchart *ngIf="ready()" map="world" [data]="data" [visualMap]="visualMap" />
        </div>
        <app-code></app-code>
    `
})
export class MapDoc {
    platformId = inject(PLATFORM_ID);

    readonly ready = signal(false);

    data = [
        { name: 'United States', value: 482 },
        { name: 'Germany', value: 376 },
        { name: 'Brazil', value: 294 },
        { name: 'India', value: 449 },
        { name: 'Japan', value: 362 },
        { name: 'Australia', value: 211 }
    ];

    visualMap = {
        min: 0,
        max: 500,
        text: ['High', 'Low']
    };

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            fetch('https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/world.json')
                .then((response) => response.json())
                .then((geoJson) => {
                    registerMap('world', geoJson);
                    this.ready.set(true);
                })
                .catch(() => {
                    this.ready.set(true);
                });
        }
    }
}
