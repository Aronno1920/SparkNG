import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal, ViewChild } from '@angular/core';
import { SchedulerModule, SchedulerRoot } from '@bdspark/sparkng/scheduler';
import type { SchedulerEvent } from '@bdspark/sparkng/types/scheduler';

@Component({
    selector: 'import-export-doc',
    standalone: true,
    imports: [AppDocSectionText, SchedulerModule, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                Scheduler comes with built-in data interchange facilities: export your event schedule directly to industry-standard
                <strong>iCalendar (.ics)</strong> files (compatible with Google Calendar, Apple Calendar, and Outlook) or to <strong>JSON</strong> format.
            </p>
        </app-docsectiontext>
        <div class="card">
            <!-- Export / Import Control Toolbar -->
            <div class="flex flex-wrap items-center gap-3 mb-4 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <button type="button" class="p-button p-button-sm p-button-primary" (click)="onExportIcs()">📥 Export to iCal (.ics)</button>
                <button type="button" class="p-button p-button-sm p-button-outlined" (click)="onExportJson()">📋 Export to JSON</button>
                <button type="button" class="p-button p-button-sm p-button-success" (click)="onImportSample()">➕ Import Sample Events</button>
            </div>

            @if (exportedJson()) {
                <div class="mb-4 p-3 bg-surface-100 dark:bg-surface-900 rounded-md">
                    <div class="text-xs font-bold text-surface-600 dark:text-surface-400 mb-1">Exported JSON Data:</div>
                    <pre class="text-xs overflow-x-auto max-h-40 m-0 text-surface-800 dark:text-surface-200">{{ exportedJson() }}</pre>
                </div>
            }

            <p-scheduler-root #scheduler="pScheduler" [events]="events()" [view]="'month'">
                <p-scheduler-header>
                    <p-scheduler-navigation></p-scheduler-navigation>
                    <p-scheduler-title></p-scheduler-title>
                    <p-scheduler-view-selector></p-scheduler-view-selector>
                </p-scheduler-header>
                <p-scheduler-content>
                    <p-scheduler-month></p-scheduler-month>
                    <p-scheduler-week></p-scheduler-week>
                    <p-scheduler-agenda></p-scheduler-agenda>
                </p-scheduler-content>
                <p-scheduler-quick-info></p-scheduler-quick-info>
            </p-scheduler-root>
        </div>
        <app-code [code]="code"></app-code>
    `
})
export class ImportExportDoc {
    @ViewChild('scheduler') scheduler!: SchedulerRoot;

    readonly now = new Date();
    readonly y = this.now.getFullYear();
    readonly m = this.now.getMonth();
    readonly d = this.now.getDate();

    exportedJson = signal<string | null>(null);

    events = signal<SchedulerEvent[]>([
        {
            id: 801,
            title: 'Global Tech Keynote',
            start: new Date(this.y, this.m, this.d, 10, 0),
            end: new Date(this.y, this.m, this.d, 12, 0),
            description: 'Keynote livestream covering next-generation frontend frameworks.',
            location: 'Main Auditorium / YouTube Live',
            color: '#3b82f6'
        },
        {
            id: 802,
            title: 'Cloud Security Roundtable',
            start: new Date(this.y, this.m, this.d + 1, 14, 0),
            end: new Date(this.y, this.m, this.d + 1, 16, 0),
            description: 'Zero-trust architecture discussions.',
            location: 'Conference Room 402',
            color: '#10b981'
        }
    ]);

    onExportIcs(): void {
        const icsContent = this.scheduler.exportToIcs();
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'schedule-events.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    onExportJson(): void {
        const json = this.scheduler.exportToJson();
        this.exportedJson.set(json);
    }

    onImportSample(): void {
        const sample: SchedulerEvent[] = [
            {
                id: Date.now() + 1,
                title: 'Imported Partner Workshop',
                start: new Date(this.y, this.m, this.d + 3, 11, 0),
                end: new Date(this.y, this.m, this.d + 3, 13, 0),
                color: '#8b5cf6',
                description: 'Collaborative integration session.'
            }
        ];
        this.scheduler.importEvents(sample);
    }

    code = {
        typescript: `import { Component, signal, ViewChild } from '@angular/core';
import { SchedulerModule, SchedulerRoot } from '@bdspark/sparkng/scheduler';
import type { SchedulerEvent } from '@bdspark/sparkng/types/scheduler';

@Component({
    standalone: true,
    imports: [SchedulerModule],
    template: \`
        <button (click)="exportIcs()">Download .ics</button>
        <button (click)="exportJson()">Export JSON</button>

        <p-scheduler-root #scheduler="pScheduler" [events]="events()" [view]="'month'">
            <p-scheduler-header>
                <p-scheduler-navigation></p-scheduler-navigation>
                <p-scheduler-title></p-scheduler-title>
            </p-scheduler-header>
            <p-scheduler-content>
                <p-scheduler-month></p-scheduler-month>
            </p-scheduler-content>
        </p-scheduler-root>
    \`
})
export class ImportExportSchedulerDemo {
    @ViewChild('scheduler') scheduler!: SchedulerRoot;
    events = signal<SchedulerEvent[]>([]);

    exportIcs(): void {
        const ics = this.scheduler.exportToIcs();
        // Trigger browser file download
    }

    exportJson(): void {
        const json = this.scheduler.exportToJson();
    }
}`
    };
}
