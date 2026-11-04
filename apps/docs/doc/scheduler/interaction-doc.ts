import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import { SchedulerModule } from '@bdspark/sparkng/scheduler';
import type { EventDropPayload, EventResizePayload, SchedulerEvent } from '@bdspark/sparkng/types/scheduler';

@Component({
    selector: 'interaction-doc',
    standalone: true,
    imports: [AppDocSectionText, SchedulerModule, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                Experience interactive desktop & touch workflows: <strong>Drag and Drop</strong> (relocate events between time slots or days), <strong>Event Resizing</strong> (drag top/bottom handles to adjust duration),
                <strong>Multi-Event Selection</strong> (hold <code>Ctrl</code>/<code>Cmd</code> to select multiple items), <strong>Keyboard Navigation</strong>, and <strong>Context Menu</strong> (right-click on events or open slots for quick
                operations).
            </p>
        </app-docsectiontext>
        <div class="card">
            @if (interactionNotice()) {
                <div class="p-3 mb-4 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-medium">
                    {{ interactionNotice() }}
                </div>
            }

            <p-scheduler-root [events]="events()" [editable]="true" [eventDurationEditable]="true" [view]="'week'" (eventDrop)="onEventDrop($event)" (eventResize)="onEventResize($event)">
                <p-scheduler-header>
                    <p-scheduler-navigation></p-scheduler-navigation>
                    <p-scheduler-title></p-scheduler-title>
                    <p-scheduler-view-selector></p-scheduler-view-selector>
                </p-scheduler-header>
                <!-- Selection Toolbar for Bulk Actions -->
                <p-scheduler-selection-toolbar></p-scheduler-selection-toolbar>
                <p-scheduler-content>
                    <p-scheduler-week></p-scheduler-week>
                    <p-scheduler-day></p-scheduler-day>
                    <p-scheduler-month></p-scheduler-month>
                </p-scheduler-content>
                <p-scheduler-quick-info></p-scheduler-quick-info>
                <p-scheduler-context-menu></p-scheduler-context-menu>
            </p-scheduler-root>
        </div>
        <app-code [code]="code"></app-code>
    `
})
export class InteractionDoc {
    readonly now = new Date();
    readonly y = this.now.getFullYear();
    readonly m = this.now.getMonth();
    readonly d = this.now.getDate();

    interactionNotice = signal<string | null>(null);

    events = signal<SchedulerEvent[]>([
        {
            id: 701,
            title: 'Drag me to another slot or day!',
            start: new Date(this.y, this.m, this.d, 9, 0),
            end: new Date(this.y, this.m, this.d, 10, 30),
            color: '#3b82f6'
        },
        {
            id: 702,
            title: 'Resize me with top/bottom handles!',
            start: new Date(this.y, this.m, this.d, 11, 0),
            end: new Date(this.y, this.m, this.d, 13, 0),
            color: '#10b981'
        },
        {
            id: 703,
            title: 'Ctrl + Click me to select multiple!',
            start: new Date(this.y, this.m, this.d + 1, 14, 0),
            end: new Date(this.y, this.m, this.d + 1, 16, 0),
            color: '#8b5cf6'
        }
    ]);

    onEventDrop(payload: EventDropPayload): void {
        this.interactionNotice.set(`Moved "${payload.event.title}" to ${payload.newStart.toLocaleDateString()} at ${payload.newStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);
        setTimeout(() => this.interactionNotice.set(null), 5000);
    }

    onEventResize(payload: EventResizePayload): void {
        this.interactionNotice.set(`Resized "${payload.event.title}" duration to ${payload.deltaMinutes} mins delta`);
        setTimeout(() => this.interactionNotice.set(null), 5000);
    }

    code = {
        typescript: `import { Component, signal } from '@angular/core';
import { SchedulerModule } from '@bdspark/sparkng/scheduler';
import type { EventDropPayload, EventResizePayload, SchedulerEvent } from '@bdspark/sparkng/types/scheduler';

@Component({
    standalone: true,
    imports: [SchedulerModule],
    template: \`
        <p-scheduler-root
            [events]="events()"
            [editable]="true"
            [eventDurationEditable]="true"
            [view]="'week'"
            (eventDrop)="onEventDrop($event)"
            (eventResize)="onEventResize($event)"
        >
            <p-scheduler-header>
                <p-scheduler-navigation></p-scheduler-navigation>
                <p-scheduler-title></p-scheduler-title>
                <p-scheduler-view-selector></p-scheduler-view-selector>
            </p-scheduler-header>
            <p-scheduler-selection-toolbar></p-scheduler-selection-toolbar>
            <p-scheduler-content>
                <p-scheduler-week></p-scheduler-week>
                <p-scheduler-day></p-scheduler-day>
            </p-scheduler-content>
            <p-scheduler-quick-info></p-scheduler-quick-info>
            <p-scheduler-context-menu></p-scheduler-context-menu>
        </p-scheduler-root>
    \`
})
export class InteractionSchedulerDemo {
    events = signal<SchedulerEvent[]>([
        { id: 1, title: 'Draggable Event', start: new Date(), end: new Date() }
    ]);

    onEventDrop(e: EventDropPayload): void {}
    onEventResize(e: EventResizePayload): void {}
}`
    };
}
