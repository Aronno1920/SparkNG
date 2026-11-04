import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import { SchedulerModule } from '@bdspark/sparkng/scheduler';
import type { SchedulerEvent, SchedulerResource, SchedulerViewType } from '@bdspark/sparkng/types/scheduler';

@Component({
    selector: 'views-doc',
    standalone: true,
    imports: [AppDocSectionText, SchedulerModule, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                Scheduler supports standard view modes: <code>Month</code>, <code>Week</code>, <code>Day</code>, <code>Agenda</code>, and <code>Timeline</code>. Switch views in real time using the right-hand view switcher buttons in the single-line
                header toolbar or programmatically with <code>[(view)]</code>.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-scheduler-root [events]="events()" [resources]="resources()" [(view)]="activeView" [height]="650">
                <p-scheduler-header>
                    <p-scheduler-navigation></p-scheduler-navigation>
                    <p-scheduler-title></p-scheduler-title>
                    <p-scheduler-view-selector></p-scheduler-view-selector>
                </p-scheduler-header>
                <p-scheduler-content>
                    <p-scheduler-month></p-scheduler-month>
                    <p-scheduler-week></p-scheduler-week>
                    <p-scheduler-day></p-scheduler-day>
                    <p-scheduler-agenda></p-scheduler-agenda>
                    <p-scheduler-timeline></p-scheduler-timeline>
                </p-scheduler-content>
                <p-scheduler-quick-info></p-scheduler-quick-info>
                <p-scheduler-more-popover></p-scheduler-more-popover>
            </p-scheduler-root>
        </div>
        <app-code [code]="code"></app-code>
    `
})
export class ViewsDoc {
    activeView = signal<SchedulerViewType>('week');
    readonly now = new Date();
    readonly y = this.now.getFullYear();
    readonly m = this.now.getMonth();
    readonly d = this.now.getDate();

    resources = signal<SchedulerResource[]>([
        { id: '1', title: 'Frontend Team', eventColor: '#3b82f6' },
        { id: '2', title: 'Backend Services', eventColor: '#10b981' },
        { id: '3', title: 'Cloud Infrastructure', eventColor: '#8b5cf6' }
    ]);

    events = signal<SchedulerEvent[]>([
        {
            id: 101,
            title: 'Design Critique',
            start: new Date(this.y, this.m, this.d, 10, 0),
            end: new Date(this.y, this.m, this.d, 11, 30),
            resourceId: '1',
            color: '#3b82f6'
        },
        {
            id: 102,
            title: 'Infrastructure Deployment',
            start: new Date(this.y, this.m, this.d + 1, 14, 0),
            end: new Date(this.y, this.m, this.d + 1, 16, 0),
            resourceId: '3',
            color: '#8b5cf6'
        },
        {
            id: 103,
            title: 'Security Compliance Audit',
            start: new Date(this.y, this.m, this.d + 2, 9, 0),
            end: new Date(this.y, this.m, this.d + 2, 12, 0),
            resourceId: '2',
            color: '#10b981'
        }
    ]);

    code = {
        typescript: `import { Component, signal } from '@angular/core';
import { SchedulerModule } from '@bdspark/sparkng/scheduler';
import type { SchedulerResource, SchedulerEvent, SchedulerViewType } from '@bdspark/sparkng/types/scheduler';

@Component({
    standalone: true,
    imports: [SchedulerModule],
    template: \`
        <p-scheduler-root [events]="events()" [resources]="resources()" [(view)]="activeView" [height]="650">
            <p-scheduler-header>
                <p-scheduler-navigation></p-scheduler-navigation>
                <p-scheduler-title></p-scheduler-title>
                <p-scheduler-view-selector></p-scheduler-view-selector>
            </p-scheduler-header>
            <p-scheduler-content>
                <p-scheduler-month></p-scheduler-month>
                <p-scheduler-week></p-scheduler-week>
                <p-scheduler-day></p-scheduler-day>
                <p-scheduler-agenda></p-scheduler-agenda>
                <p-scheduler-timeline></p-scheduler-timeline>
            </p-scheduler-content>
            <p-scheduler-quick-info></p-scheduler-quick-info>
            <p-scheduler-more-popover></p-scheduler-more-popover>
        </p-scheduler-root>
    \`
})
export class ViewsSchedulerDemo {
    activeView = signal<SchedulerViewType>('week');
    resources = signal<SchedulerResource[]>([
        { id: '1', title: 'Frontend Team', eventColor: '#3b82f6' }
    ]);
    events = signal<SchedulerEvent[]>([
        { id: 101, title: 'Design Critique', start: new Date(), end: new Date() }
    ]);
}`
    };
}
