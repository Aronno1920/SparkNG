/**
 * @file
 * Header, Navigation, Title, and ViewSelector components for @bdspark/sparkng-scheduler
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { injectSchedulerRoot, SCHEDULER_HEADER_CONTEXT_TOKEN, SchedulerHeaderContext } from '../../context/scheduler.context';
import type { SchedulerViewType } from '../../types/scheduler.types';

@Component({
    selector: 'p-scheduler-header',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="p-scheduler-header-content">
            <div class="p-scheduler-header-left">
                <ng-content select="p-scheduler-navigation"></ng-content>
            </div>
            <div class="p-scheduler-header-center">
                <ng-content select="p-scheduler-title"></ng-content>
            </div>
            <div class="p-scheduler-header-right">
                <ng-content select="p-scheduler-view-selector"></ng-content>
                <ng-content></ng-content>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: SCHEDULER_HEADER_CONTEXT_TOKEN,
            useFactory: () => {
                const root = injectSchedulerRoot();
                return computed<SchedulerHeaderContext>(() => ({
                    title: root.headerTitle(),
                    currentView: root.currentView(),
                    views: ['month', 'week', 'day', 'agenda', 'timeline'],
                    next: () => root.next(),
                    prev: () => root.prev(),
                    today: () => root.today(),
                    changeView: (v: SchedulerViewType) => root.changeView(v)
                }));
            }
        }
    ],
    host: {
        class: 'p-scheduler-header',
        '[attr.data-slot]': '"scheduler-header"'
    }
})
export class SchedulerHeader {}

@Component({
    selector: 'p-scheduler-navigation',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="p-scheduler-nav-buttons">
            <button type="button" class="p-scheduler-btn p-scheduler-btn-prev" (click)="root.prev()" aria-label="Previous">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <button type="button" class="p-scheduler-btn p-scheduler-btn-today" (click)="root.today()">Today</button>
            <button type="button" class="p-scheduler-btn p-scheduler-btn-next" (click)="root.next()" aria-label="Next">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-navigation',
        '[attr.data-slot]': '"scheduler-navigation"'
    }
})
export class SchedulerNavigation {
    readonly root = injectSchedulerRoot();
}

@Component({
    selector: 'p-scheduler-title',
    standalone: true,
    imports: [CommonModule],
    template: ` <h2 class="p-scheduler-title-text">{{ root.headerTitle() }}</h2> `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-title',
        '[attr.data-slot]': '"scheduler-title"'
    }
})
export class SchedulerTitle {
    readonly root = injectSchedulerRoot();
}

@Component({
    selector: 'p-scheduler-view-selector',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="p-scheduler-view-buttons">
            @for (v of availableViews(); track v) {
                <button type="button" class="p-scheduler-btn p-scheduler-view-btn" [class.p-scheduler-btn-active]="root.currentView() === v" (click)="root.changeView(v)">
                    {{ getViewLabel(v) }}
                </button>
            }
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-view-selector',
        '[attr.data-slot]': '"scheduler-view-selector"'
    }
})
export class SchedulerViewSelector {
    readonly root = injectSchedulerRoot();
    readonly views = input<SchedulerViewType[]>(['month', 'week', 'day', 'agenda', 'timeline']);

    readonly availableViews = computed(() => this.views());

    getViewLabel(v: SchedulerViewType): string {
        switch (v) {
            case 'month':
                return 'Month';
            case 'week':
                return 'Week';
            case 'day':
                return 'Day';
            case 'agenda':
                return 'Agenda';
            case 'year':
                return 'Year';
            case 'timeline':
                return 'Timeline';
            case 'resourceTimeline':
                return 'Resources';
            default:
                return v.charAt(0).toUpperCase() + v.slice(1);
        }
    }
}
