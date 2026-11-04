import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal, ViewChild } from '@angular/core';
import { SchedulerModule, SchedulerRoot } from '@bdspark/sparkng/scheduler';
import type { DateClickPayload, DateSelectPayload, SchedulerEvent } from '@bdspark/sparkng/types/scheduler';

@Component({
    selector: 'scheduling-doc',
    standalone: true,
    imports: [AppDocSectionText, SchedulerModule, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                Scheduling features include <strong>Date Selection</strong> (click-and-drag cell selection emitting <code>(dateSelect)</code>), <strong>Add & Edit Events</strong> (fast event generation and updating), and
                <strong>Controlled State</strong> with two-way binding on <code>[(date)]</code> and <code>[(view)]</code> alongside programmatic methods like <code>next()</code>, <code>prev()</code>, and <code>today()</code>.
            </p>
        </app-docsectiontext>
        <div class="card">
            <!-- Programmatic Navigation Toolbar -->
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4 p-3 bg-surface-50 dark:bg-surface-800 rounded-lg">
                <div class="flex items-center gap-2">
                    <button type="button" class="p-button p-button-sm p-button-outlined" (click)="scheduler.prev()">‹ Prev</button>
                    <button type="button" class="p-button p-button-sm" (click)="scheduler.today()">Today</button>
                    <button type="button" class="p-button p-button-sm p-button-outlined" (click)="scheduler.next()">Next ›</button>
                </div>
                <div class="font-semibold text-surface-900 dark:text-surface-0">
                    Selected Range: <span class="text-primary-500">{{ selectionInfo() }}</span>
                </div>
                <button type="button" class="p-button p-button-sm p-button-success" (click)="onAddNewEvent()">+ Add Quick Event</button>
            </div>

            <p-scheduler-root #scheduler="pScheduler" [events]="events()" [(view)]="activeView" [(date)]="activeDate" (dateClick)="onDateClick($event)" (dateSelect)="onDateSelect($event)">
                <p-scheduler-header>
                    <p-scheduler-navigation></p-scheduler-navigation>
                    <p-scheduler-title></p-scheduler-title>
                    <p-scheduler-view-selector></p-scheduler-view-selector>
                </p-scheduler-header>
                <p-scheduler-content>
                    <p-scheduler-month></p-scheduler-month>
                    <p-scheduler-week></p-scheduler-week>
                    <p-scheduler-day></p-scheduler-day>
                </p-scheduler-content>
                <p-scheduler-quick-info></p-scheduler-quick-info>
            </p-scheduler-root>
        </div>
        <app-code [code]="code"></app-code>
    `
})
export class SchedulingDoc {
    activeView = signal<'month' | 'week' | 'day'>('week');
    activeDate = signal<Date>(new Date());
    selectionInfo = signal<string>('Click or drag on any slot');

    readonly now = new Date();
    readonly y = this.now.getFullYear();
    readonly m = this.now.getMonth();
    readonly d = this.now.getDate();

    events = signal<SchedulerEvent[]>([
        {
            id: 401,
            title: 'Executive Sync',
            start: new Date(this.y, this.m, this.d, 10, 0),
            end: new Date(this.y, this.m, this.d, 11, 0),
            color: '#3b82f6'
        },
        {
            id: 402,
            title: 'Release Deployment Window',
            start: new Date(this.y, this.m, this.d + 1, 14, 0),
            end: new Date(this.y, this.m, this.d + 1, 16, 0),
            color: '#10b981'
        }
    ]);

    onDateClick(event: DateClickPayload): void {
        this.selectionInfo.set(`Clicked on: ${event.date.toLocaleDateString()} ${event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    }

    onDateSelect(event: DateSelectPayload): void {
        this.selectionInfo.set(`Selected from ${event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to ${event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
    }

    onAddNewEvent(): void {
        const nextId = Date.now();
        const start = new Date(this.y, this.m, this.d, 12, 0);
        const end = new Date(this.y, this.m, this.d, 13, 0);
        this.events.update((list) => [
            ...list,
            {
                id: nextId,
                title: 'New Scheduled Sync',
                start,
                end,
                color: '#f59e0b'
            }
        ]);
        this.selectionInfo.set('Added New Scheduled Sync at 12:00 PM');
    }

    code = {
        typescript: `import { Component, signal } from '@angular/core';
import { SchedulerModule } from '@bdspark/sparkng/scheduler';
import type { DateClickPayload, DateSelectPayload, SchedulerEvent } from '@bdspark/sparkng/types/scheduler';

@Component({
    standalone: true,
    imports: [SchedulerModule],
    template: \`
        <p-scheduler-root
            #scheduler="pScheduler"
            [events]="events()"
            [(view)]="activeView"
            [(date)]="activeDate"
            (dateClick)="onDateClick($event)"
            (dateSelect)="onDateSelect($event)"
        >
            <p-scheduler-header>
                <p-scheduler-navigation></p-scheduler-navigation>
                <p-scheduler-title></p-scheduler-title>
                <p-scheduler-view-selector></p-scheduler-view-selector>
            </p-scheduler-header>
            <p-scheduler-content>
                <p-scheduler-month></p-scheduler-month>
                <p-scheduler-week></p-scheduler-week>
                <p-scheduler-day></p-scheduler-day>
            </p-scheduler-content>
            <p-scheduler-quick-info></p-scheduler-quick-info>
        </p-scheduler-root>
    \`
})
export class SchedulingSchedulerDemo {
    activeView = signal('week');
    activeDate = signal(new Date());
    events = signal<SchedulerEvent[]>([]);

    onDateClick(e: DateClickPayload): void {}
    onDateSelect(e: DateSelectPayload): void {}
}`
    };
}
