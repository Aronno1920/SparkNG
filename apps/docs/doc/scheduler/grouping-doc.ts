import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import { SchedulerModule } from '@bdspark/sparkng/scheduler';
import type { SchedulerEvent, SchedulerResource, SchedulerViewType } from '@bdspark/sparkng/types/scheduler';

@Component({
    selector: 'grouping-doc',
    standalone: true,
    imports: [AppDocSectionText, SchedulerModule, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                Scheduler offers multi-dimensional grouping modes: <strong>Resources</strong> (hierarchical tree swimlanes and columns), <strong>Horizontal Resources</strong>, <strong>Date Grouping</strong> (dates as primary columns with resource
                sub-lanes), and <strong>Adaptive Grouping</strong> (automatically switching to a compact dropdown switcher when screen width drops below the <code>[adaptiveBreakpoint]</code>).
            </p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-2 mb-4">
                <button type="button" class="p-button p-button-sm" [class.p-button-outlined]="activeView() !== 'resourceDay'" (click)="activeView.set('resourceDay')">Resource Day (Adaptive)</button>
                <button type="button" class="p-button p-button-sm" [class.p-button-outlined]="activeView() !== 'resourceTimeline'" (click)="activeView.set('resourceTimeline')">Resource Timeline</button>
                <button type="button" class="p-button p-button-sm" [class.p-button-outlined]="activeView() !== 'dateDay'" (click)="activeView.set('dateDay')">Date Grouping</button>
            </div>

            <p-scheduler-root [resources]="resources()" [events]="events()" [(view)]="activeView" [adaptiveBreakpoint]="768">
                <p-scheduler-header>
                    <p-scheduler-navigation></p-scheduler-navigation>
                    <p-scheduler-title></p-scheduler-title>
                </p-scheduler-header>
                <p-scheduler-content>
                    <p-scheduler-resource-day></p-scheduler-resource-day>
                    <p-scheduler-resource-timeline></p-scheduler-resource-timeline>
                    <p-scheduler-date-day></p-scheduler-date-day>
                </p-scheduler-content>
                <p-scheduler-quick-info></p-scheduler-quick-info>
            </p-scheduler-root>
        </div>
        <app-code [code]="code"></app-code>
    `
})
export class GroupingDoc {
    activeView = signal<SchedulerViewType>('resourceDay');
    readonly now = new Date();
    readonly y = this.now.getFullYear();
    readonly m = this.now.getMonth();
    readonly d = this.now.getDate();

    resources = signal<SchedulerResource[]>([
        { id: 'dev-1', title: 'Alex Rivers (Frontend)', eventColor: '#3b82f6' },
        { id: 'dev-2', title: 'Elena Rostova (Backend)', eventColor: '#10b981' },
        { id: 'dev-3', title: 'Marcus Chen (DevOps)', eventColor: '#8b5cf6' }
    ]);

    events = signal<SchedulerEvent[]>([
        {
            id: 301,
            title: 'UI Kit Accessibility Audit',
            start: new Date(this.y, this.m, this.d, 9, 30),
            end: new Date(this.y, this.m, this.d, 11, 30),
            resourceId: 'dev-1',
            color: '#3b82f6'
        },
        {
            id: 302,
            title: 'GraphQL Gateway Optimization',
            start: new Date(this.y, this.m, this.d, 13, 0),
            end: new Date(this.y, this.m, this.d, 15, 0),
            resourceId: 'dev-2',
            color: '#10b981'
        },
        {
            id: 303,
            title: 'Kubernetes Cluster Rolling Upgrade',
            start: new Date(this.y, this.m, this.d, 11, 0),
            end: new Date(this.y, this.m, this.d, 13, 30),
            resourceId: 'dev-3',
            color: '#8b5cf6'
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
        <p-scheduler-root [resources]="resources()" [events]="events()" [(view)]="activeView" [adaptiveBreakpoint]="768">
            <p-scheduler-header>
                <p-scheduler-navigation></p-scheduler-navigation>
                <p-scheduler-title></p-scheduler-title>
            </p-scheduler-header>
            <p-scheduler-content>
                <p-scheduler-resource-day></p-scheduler-resource-day>
                <p-scheduler-resource-timeline></p-scheduler-resource-timeline>
                <p-scheduler-date-day></p-scheduler-date-day>
            </p-scheduler-content>
        </p-scheduler-root>
    \`
})
export class GroupingSchedulerDemo {
    activeView = signal<SchedulerViewType>('resourceDay');
    resources = signal<SchedulerResource[]>([
        { id: 'dev-1', title: 'Alex Rivers', eventColor: '#3b82f6' },
        { id: 'dev-2', title: 'Elena Rostova', eventColor: '#10b981' }
    ]);
}`
    };
}
