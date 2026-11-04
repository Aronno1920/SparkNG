import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import { SchedulerModule } from '@bdspark/sparkng/scheduler';
import type { EventCategory, SchedulerEvent } from '@bdspark/sparkng/types/scheduler';

@Component({
    selector: 'events-doc',
    standalone: true,
    imports: [AppDocSectionText, SchedulerModule, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                Configure rich event planning capabilities: <strong>Metadata & Categories</strong>, <strong>All-Day & Multi-Day Spanning Events</strong>, <strong>Recurring Events</strong> (using RFC 5545 RRULE syntax),
                <strong>Custom Styling & Color Badges</strong>, <strong>Quick Info</strong> dialogs, and <strong>More Popover</strong> overlays for high-density dates.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-scheduler-root [events]="events()" [categories]="categories()" [(activeCategoryIds)]="activeCategoryIds" [view]="'month'" [maxEventsVisible]="2">
                <p-scheduler-header>
                    <p-scheduler-navigation></p-scheduler-navigation>
                    <p-scheduler-title></p-scheduler-title>
                    <p-scheduler-view-selector></p-scheduler-view-selector>
                </p-scheduler-header>
                <!-- Category Filter Pills -->
                <p-scheduler-category-legend></p-scheduler-category-legend>
                <p-scheduler-content>
                    <p-scheduler-month></p-scheduler-month>
                    <p-scheduler-week></p-scheduler-week>
                    <p-scheduler-agenda></p-scheduler-agenda>
                </p-scheduler-content>
                <p-scheduler-quick-info></p-scheduler-quick-info>
                <p-scheduler-more-popover></p-scheduler-more-popover>
            </p-scheduler-root>
        </div>
        <app-code [code]="code"></app-code>
    `
})
export class EventsDoc {
    readonly now = new Date();
    readonly y = this.now.getFullYear();
    readonly m = this.now.getMonth();
    readonly d = this.now.getDate();

    categories = signal<EventCategory[]>([
        { id: 'cat-eng', name: 'Engineering', color: '#3b82f6' },
        { id: 'cat-des', name: 'Design & UX', color: '#ec4899' },
        { id: 'cat-ops', name: 'Operations', color: '#10b981' },
        { id: 'cat-mkt', name: 'Marketing', color: '#f59e0b' }
    ]);

    activeCategoryIds = signal<(string | number)[]>([]);

    events = signal<SchedulerEvent[]>([
        // Spanning Multi-Day Event
        {
            id: 601,
            title: 'Annual Developer Summit (Spanning 4 Days)',
            start: new Date(this.y, this.m, Math.max(1, this.d - 1)),
            end: new Date(this.y, this.m, Math.max(1, this.d + 2)),
            allDay: true,
            categoryId: 'cat-eng',
            color: '#3b82f6',
            description: 'Keynotes, breakout sessions, and hackathons.'
        },
        // Recurring Daily Standup
        {
            id: 602,
            title: 'Daily Core Standup',
            start: new Date(this.y, this.m, 1, 9, 0),
            end: new Date(this.y, this.m, 1, 9, 30),
            rrule: 'FREQ=DAILY;INTERVAL=1',
            categoryId: 'cat-ops',
            color: '#10b981',
            description: 'Daily team alignment on sprint goals.'
        },
        // Design Review
        {
            id: 603,
            title: 'Design System Typography Refresh',
            start: new Date(this.y, this.m, this.d, 14, 0),
            end: new Date(this.y, this.m, this.d, 15, 30),
            categoryId: 'cat-des',
            color: '#ec4899',
            description: 'Refining font weights, contrast tokens, and line heights.'
        },
        // Marketing Campaign Launch
        {
            id: 604,
            title: 'Q4 Product Launch Announcement',
            start: new Date(this.y, this.m, this.d, 16, 0),
            end: new Date(this.y, this.m, this.d, 17, 0),
            categoryId: 'cat-mkt',
            color: '#f59e0b',
            description: 'Press release distribution and social blast.'
        }
    ]);

    code = {
        typescript: `import { Component, signal } from '@angular/core';
import { SchedulerModule } from '@bdspark/sparkng/scheduler';
import type { EventCategory, SchedulerEvent } from '@bdspark/sparkng/types/scheduler';

@Component({
    standalone: true,
    imports: [SchedulerModule],
    template: \`
        <p-scheduler-root
            [events]="events()"
            [categories]="categories()"
            [(activeCategoryIds)]="activeCategoryIds"
            [view]="'month'"
            [maxEventsVisible]="2"
        >
            <p-scheduler-header>
                <p-scheduler-navigation></p-scheduler-navigation>
                <p-scheduler-title></p-scheduler-title>
                <p-scheduler-view-selector></p-scheduler-view-selector>
            </p-scheduler-header>
            <p-scheduler-category-legend></p-scheduler-category-legend>
            <p-scheduler-content>
                <p-scheduler-month></p-scheduler-month>
                <p-scheduler-week></p-scheduler-week>
                <p-scheduler-agenda></p-scheduler-agenda>
            </p-scheduler-content>
            <p-scheduler-quick-info></p-scheduler-quick-info>
            <p-scheduler-more-popover></p-scheduler-more-popover>
        </p-scheduler-root>
    \`
})
export class EventsSchedulerDemo {
    categories = signal<EventCategory[]>([
        { id: 'cat-eng', name: 'Engineering', color: '#3b82f6' },
        { id: 'cat-des', name: 'Design & UX', color: '#ec4899' }
    ]);
    activeCategoryIds = signal<(string | number)[]>([]);
    events = signal<SchedulerEvent[]>([
        { id: 1, title: 'Multi-Day Summit', start: new Date(), end: new Date(), allDay: true },
        { id: 2, title: 'Daily Standup', start: new Date(), rrule: 'FREQ=DAILY;INTERVAL=1' }
    ]);
}`
    };
}
