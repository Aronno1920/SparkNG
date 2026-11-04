/**
 * @file
 * Resource and Date Grouping View Scopes for @bdspark/sparkng-scheduler
 * Includes:
 * - <p-scheduler-resource-timeline>
 * - <p-scheduler-resource-day>
 * - <p-scheduler-resource-week>
 * - <p-scheduler-resource-month>
 * - <p-scheduler-date-day>
 * - <p-scheduler-date-week>
 * - <p-scheduler-date-month>
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ContentChild, inject, signal, ViewEncapsulation } from '@angular/core';
import { injectSchedulerRoot, SCHEDULER_EVENT_CONTEXT_TOKEN, SchedulerEventContext, SchedulerResourceContext } from '../../context/scheduler.context';
import { diffInMinutes, formatDate, formatTime, generateMonthGrid, generateTimeSlots, generateWeekDays, isSameDay, MonthGridDay } from '../../engine/date-utils';
import { computeTimeGridEventPositions } from '../../engine/event-layout';
import type { ProcessedEvent, SchedulerEvent, SchedulerResource } from '../../types/scheduler.types';
import {
    SchedulerEventDef,
    SchedulerResourceAreaHeaderDef,
    SchedulerResourceColumnHeaderDef,
    SchedulerResourceDef,
    SchedulerResourceGroupDef,
    SchedulerResourceHeaderDef,
    SchedulerResourceRowDef,
    SchedulerTimelineCellDef,
    SchedulerTimelineEventDef
} from '../definitions/scheduler-definitions';

/* =========================================================================
 * 1. Resource Timeline Scope: <p-scheduler-resource-timeline>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-resource-timeline',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-resource-timeline-view">
                <!-- Timeline Header Bar -->
                <div class="p-scheduler-resource-timeline-header">
                    <div class="p-scheduler-resource-header-cell" [style.width.px]="resourceAreaWidth()">
                        @if (areaHeaderDef?.template) {
                            <ng-container *ngTemplateOutlet="areaHeaderDef?.template"></ng-container>
                        } @else {
                            <span class="p-scheduler-resource-header-title">Resources</span>
                        }
                    </div>

                    <div class="p-scheduler-timeline-days-header">
                        @for (day of timelineDays(); track day.getTime()) {
                            <div class="p-scheduler-timeline-day-cell">
                                <span class="p-scheduler-timeline-day-name">{{ formatDayName(day) }}</span>
                                <span class="p-scheduler-timeline-day-num" [class.p-scheduler-today]="isToday(day)">
                                    {{ day.getDate() }}
                                </span>
                            </div>
                        }
                    </div>
                </div>

                <!-- Timeline Body with Resource Lanes -->
                <div class="p-scheduler-resource-timeline-body">
                    @for (res of flatResources(); track res.id) {
                        <div class="p-scheduler-resource-timeline-row">
                            <!-- Left Resource Label Cell -->
                            <div class="p-scheduler-resource-cell" [style.width.px]="resourceAreaWidth()" [style.paddingLeft.px]="(res.depth || 0) * 16 + 12">
                                @if (res.children && res.children.length > 0) {
                                    <button type="button" class="p-scheduler-tree-toggle" (click)="toggleResource(res.id)">
                                        {{ isExpanded(res.id) ? '▼' : '▶' }}
                                    </button>
                                }
                                @if (res.avatar) {
                                    <img [src]="res.avatar" class="p-scheduler-resource-avatar" alt="" />
                                } @else {
                                    <span class="p-scheduler-resource-dot" [style.backgroundColor]="res.eventColor || res.color || '#3b82f6'"></span>
                                }
                                <span class="p-scheduler-resource-title">{{ res.title }}</span>
                                <span class="p-scheduler-resource-badge">
                                    {{ getEventsForResource(res.id).length }}
                                </span>
                            </div>

                            <!-- Right Event Track -->
                            <div class="p-scheduler-timeline-track">
                                @for (day of timelineDays(); track day.getTime()) {
                                    <div class="p-scheduler-timeline-slot" (click)="onSlotClick(day, res.id, $event)"></div>
                                }

                                @for (event of getEventsForResource(res.id); track event.id) {
                                    <div
                                        class="p-scheduler-timeline-event-bar"
                                        [style.left.%]="calcEventLeft(event)"
                                        [style.width.%]="calcEventWidth(event)"
                                        [style.backgroundColor]="event.color || res.eventColor || '#3b82f6'"
                                        (click)="onEventClick(event, $event)"
                                    >
                                        <span class="p-scheduler-timeline-event-title">{{ event.title }}</span>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-resource-timeline-scope',
        '[attr.data-view]': '"resourceTimeline"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerResourceTimelineScope {
    readonly root = injectSchedulerRoot();

    @ContentChild(SchedulerTimelineEventDef) timelineEventDef?: SchedulerTimelineEventDef;
    @ContentChild(SchedulerResourceAreaHeaderDef) areaHeaderDef?: SchedulerResourceAreaHeaderDef;
    @ContentChild(SchedulerResourceDef) resourceDef?: SchedulerResourceDef;

    readonly isActive = computed(() => this.root.currentView() === 'resourceTimeline');
    readonly resourceAreaWidth = signal<number>(220);
    readonly expandedIds = signal<Set<string | number>>(new Set());

    readonly timelineDays = computed(() => generateWeekDays(this.root.currentDate(), this.root.firstDayOfWeek(), 14));

    readonly flatResources = computed(() => {
        const resList = this.root.resources();
        if (resList.length === 0) {
            return [{ id: 'all', title: 'Default Resource', eventColor: '#3b82f6', depth: 0 }];
        }
        const flat: Array<SchedulerResource & { depth: number }> = [];
        const traverse = (items: SchedulerResource[], depth = 0) => {
            for (const item of items) {
                flat.push({ ...item, depth });
                if (item.children && item.children.length > 0 && this.isExpanded(item.id)) {
                    traverse(item.children, depth + 1);
                }
            }
        };
        traverse(resList, 0);
        return flat;
    });

    isExpanded(id: string | number): boolean {
        return this.expandedIds().has(id);
    }

    toggleResource(id: string | number): void {
        this.expandedIds.update((set) => {
            const next = new Set(set);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    }

    formatDayName(d: Date): string {
        return new Intl.DateTimeFormat(this.root.locale(), { weekday: 'short' }).format(d);
    }

    isToday(d: Date): boolean {
        return isSameDay(d, new Date());
    }

    getEventsForResource(resId: string | number): ProcessedEvent[] {
        if (resId === 'all') return this.root.processedEvents();
        return this.root.processedEvents().filter((e) => e.resourceId === resId || (e.resourceIds && e.resourceIds.includes(resId)));
    }

    calcEventLeft(event: ProcessedEvent): number {
        const days = this.timelineDays();
        if (days.length === 0) return 0;
        const start = days[0].getTime();
        const end = days[days.length - 1].getTime() + 86400000;
        const total = end - start;
        const offset = Math.max(0, event.startDate.getTime() - start);
        return Math.min(100, (offset / total) * 100);
    }

    calcEventWidth(event: ProcessedEvent): number {
        const days = this.timelineDays();
        if (days.length === 0) return 10;
        const total = days[days.length - 1].getTime() + 86400000 - days[0].getTime();
        const duration = Math.max(3600000 * 4, event.endDate.getTime() - event.startDate.getTime());
        return Math.max(4, Math.min(100, (duration / total) * 100));
    }

    onSlotClick(date: Date, resourceId: string | number, jsEvent: MouseEvent): void {
        this.root.dateClick.emit({ date, allDay: true, resourceId, jsEvent });
    }

    onEventClick(event: ProcessedEvent, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        this.root.eventClick.emit({ event, jsEvent });
        if (this.root.quickInfo()) {
            this.root.showQuickInfo(event, jsEvent.currentTarget as HTMLElement);
        }
    }
}

/* =========================================================================
 * 2. Resource Day Scope: <p-scheduler-resource-day> (with Adaptive Grouping)
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-resource-day',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-resource-day-view">
                <!-- Adaptive Mobile Resource Switcher -->
                @if (isMobileAdaptive()) {
                    <div class="p-scheduler-adaptive-bar">
                        <label class="p-scheduler-adaptive-label">Resource:</label>
                        <select class="p-scheduler-adaptive-select" [value]="activeResourceId()" (change)="onAdaptiveSelect($any($event.target).value)">
                            @for (res of resources(); track res.id) {
                                <option [value]="res.id">{{ res.title }}</option>
                            }
                        </select>
                    </div>
                }

                <div class="p-scheduler-time-grid-view">
                    <!-- Header with Resource Columns -->
                    <div class="p-scheduler-time-grid-header">
                        <div class="p-scheduler-time-gutter-header"></div>
                        <div class="p-scheduler-time-grid-header-days">
                            @for (res of visibleResources(); track res.id) {
                                <div class="p-scheduler-time-grid-header-day p-scheduler-resource-col-header">
                                    <div class="p-scheduler-resource-col-title">
                                        <span class="p-scheduler-resource-dot" [style.backgroundColor]="res.eventColor || '#3b82f6'"></span>
                                        <span>{{ res.title }}</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <!-- Scrollable Timed Grid Body -->
                    <div class="p-scheduler-time-grid-body">
                        <!-- Time Gutter -->
                        <div class="p-scheduler-time-gutter">
                            @for (slot of timeSlots(); track slot.timeString) {
                                <div class="p-scheduler-gutter-slot">
                                    <span>{{ slot.timeString }}</span>
                                </div>
                            }
                        </div>

                        <!-- Columns per Resource -->
                        <div class="p-scheduler-columns-container">
                            @for (res of visibleResources(); track res.id) {
                                <div class="p-scheduler-day-column" (click)="onColumnClick(currentDate(), res.id, $event)">
                                    @for (slot of timeSlots(); track slot.timeString) {
                                        <div class="p-scheduler-grid-slot"></div>
                                    }

                                    <!-- Events for this Resource -->
                                    @for (event of getTimedEventsForResource(res.id); track event.id) {
                                        <div
                                            class="p-scheduler-timed-event-wrapper"
                                            [style.top.%]="event.topPercent"
                                            [style.height.%]="event.heightPercent"
                                            [style.left.%]="event.leftPercent"
                                            [style.width.%]="event.widthPercent"
                                            (click)="onEventClick(event, $event)"
                                        >
                                            <div class="p-scheduler-timed-event-card" [style.backgroundColor]="event.color || res.eventColor || '#3b82f6'">
                                                <div class="p-scheduler-timed-event-title">{{ event.title }}</div>
                                                <div class="p-scheduler-timed-event-time">{{ formatEventTime(event) }}</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-resource-day-scope',
        '[attr.data-view]': '"resourceDay"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerResourceDayScope {
    readonly root = injectSchedulerRoot();

    readonly isActive = computed(() => this.root.currentView() === 'resourceDay');
    readonly currentDate = computed(() => this.root.currentDate());
    readonly timeSlots = computed(() => generateTimeSlots(0, 24, 60));

    readonly resources = computed(() => {
        const list = this.root.resources();
        if (list.length > 0) return list;
        return [
            { id: '1', title: 'Room A', eventColor: '#3b82f6' },
            { id: '2', title: 'Room B', eventColor: '#10b981' }
        ];
    });

    readonly activeResourceId = signal<string | number>('1');
    readonly isMobileAdaptive = signal<boolean>(false);

    readonly visibleResources = computed(() => {
        if (this.isMobileAdaptive()) {
            const active = this.resources().find((r) => String(r.id) === String(this.activeResourceId()));
            return active ? [active] : [this.resources()[0]];
        }
        return this.resources();
    });

    onAdaptiveSelect(resId: string): void {
        this.activeResourceId.set(resId);
    }

    getTimedEventsForResource(resId: string | number): ProcessedEvent[] {
        const events = this.root.processedEvents().filter((e) => isSameDay(e.startDate, this.currentDate()) && !e.allDay && (e.resourceId === resId || (e.resourceIds && e.resourceIds.includes(resId))));
        return computeTimeGridEventPositions(events, 0, 24);
    }

    formatEventTime(event: ProcessedEvent): string {
        return `${formatTime(event.startDate, this.root.locale())} – ${formatTime(event.endDate, this.root.locale())}`;
    }

    onColumnClick(date: Date, resourceId: string | number, jsEvent: MouseEvent): void {
        this.root.dateClick.emit({ date, allDay: false, resourceId, jsEvent });
    }

    onEventClick(event: ProcessedEvent, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        this.root.eventClick.emit({ event, jsEvent });
        if (this.root.quickInfo()) {
            this.root.showQuickInfo(event, jsEvent.currentTarget as HTMLElement);
        }
    }
}

/* =========================================================================
 * 3. Resource Week Scope: <p-scheduler-resource-week>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-resource-week',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-resource-week-view">
                <div class="p-scheduler-time-grid-view">
                    <!-- Top header with Days & Resources -->
                    <div class="p-scheduler-time-grid-header">
                        <div class="p-scheduler-time-gutter-header"></div>
                        <div class="p-scheduler-time-grid-header-days">
                            @for (day of weekDays(); track day.getTime()) {
                                <div class="p-scheduler-time-grid-header-day">
                                    <span class="p-scheduler-weekday-name">{{ formatWeekday(day) }}</span>
                                    <span class="p-scheduler-day-badge">{{ day.getDate() }}</span>
                                </div>
                            }
                        </div>
                    </div>

                    <!-- Scrollable Timed Grid Body -->
                    <div class="p-scheduler-time-grid-body">
                        <div class="p-scheduler-time-gutter">
                            @for (slot of timeSlots(); track slot.timeString) {
                                <div class="p-scheduler-gutter-slot">
                                    <span>{{ slot.timeString }}</span>
                                </div>
                            }
                        </div>

                        <div class="p-scheduler-columns-container">
                            @for (day of weekDays(); track day.getTime()) {
                                <div class="p-scheduler-day-column" (click)="onColumnClick(day, $event)">
                                    @for (slot of timeSlots(); track slot.timeString) {
                                        <div class="p-scheduler-grid-slot"></div>
                                    }

                                    @for (event of getTimedEventsForDay(day); track event.id) {
                                        <div
                                            class="p-scheduler-timed-event-wrapper"
                                            [style.top.%]="event.topPercent"
                                            [style.height.%]="event.heightPercent"
                                            [style.left.%]="event.leftPercent"
                                            [style.width.%]="event.widthPercent"
                                            (click)="onEventClick(event, $event)"
                                        >
                                            <div class="p-scheduler-timed-event-card" [style.backgroundColor]="event.color || '#3b82f6'">
                                                <div class="p-scheduler-timed-event-title">{{ event.title }}</div>
                                                <div class="p-scheduler-timed-event-time">{{ formatEventTime(event) }}</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-resource-week-scope',
        '[attr.data-view]': '"resourceWeek"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerResourceWeekScope {
    readonly root = injectSchedulerRoot();

    readonly isActive = computed(() => this.root.currentView() === 'resourceWeek');
    readonly weekDays = computed(() => generateWeekDays(this.root.currentDate(), this.root.firstDayOfWeek(), 7));
    readonly timeSlots = computed(() => generateTimeSlots(0, 24, 60));

    formatWeekday(d: Date): string {
        return new Intl.DateTimeFormat(this.root.locale(), { weekday: 'short' }).format(d);
    }

    getTimedEventsForDay(day: Date): ProcessedEvent[] {
        const events = this.root.processedEvents().filter((e) => isSameDay(e.startDate, day) && !e.allDay);
        return computeTimeGridEventPositions(events, 0, 24);
    }

    formatEventTime(event: ProcessedEvent): string {
        return `${formatTime(event.startDate, this.root.locale())} – ${formatTime(event.endDate, this.root.locale())}`;
    }

    onColumnClick(date: Date, jsEvent: MouseEvent): void {
        this.root.dateClick.emit({ date, allDay: false, jsEvent });
    }

    onEventClick(event: ProcessedEvent, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        this.root.eventClick.emit({ event, jsEvent });
        if (this.root.quickInfo()) {
            this.root.showQuickInfo(event, jsEvent.currentTarget as HTMLElement);
        }
    }
}

/* =========================================================================
 * 4. Resource Month Scope: <p-scheduler-resource-month>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-resource-month',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-resource-month-view">
                <div class="p-scheduler-month-weekdays">
                    @for (w of weekdays(); track $index) {
                        <div class="p-scheduler-weekday-cell">{{ w }}</div>
                    }
                </div>

                <div class="p-scheduler-month-grid">
                    @for (day of gridDays(); track day.date.getTime()) {
                        <div class="p-scheduler-month-day" [class.p-scheduler-today]="day.isToday" [class.p-scheduler-other-month]="!day.isCurrentMonth" (click)="onDateClick(day.date, $event)">
                            <div class="p-scheduler-day-top">
                                <span class="p-scheduler-day-number">{{ day.dayNumber }}</span>
                            </div>

                            <div class="p-scheduler-day-events">
                                @for (event of getEventsForDay(day.date).slice(0, root.maxEventsVisible()); track event.id) {
                                    <div class="p-scheduler-event-container" (click)="onEventClick(event, $event)">
                                        <div class="p-scheduler-event-pill" [style.backgroundColor]="event.color || '#3b82f6'">
                                            <span class="p-scheduler-event-pill-title">{{ event.title }}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-resource-month-scope',
        '[attr.data-view]': '"resourceMonth"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerResourceMonthScope {
    readonly root = injectSchedulerRoot();

    readonly isActive = computed(() => this.root.currentView() === 'resourceMonth');

    readonly weekdays = computed(() => {
        const fdw = this.root.firstDayOfWeek();
        const base = new Date(2026, 4, 10 + fdw);
        const arr: string[] = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(base.getTime() + i * 86400000);
            arr.push(new Intl.DateTimeFormat(this.root.locale(), { weekday: 'short' }).format(d));
        }
        return arr;
    });

    readonly gridDays = computed<MonthGridDay[]>(() => generateMonthGrid(this.root.currentDate(), this.root.firstDayOfWeek()));

    getEventsForDay(date: Date): ProcessedEvent[] {
        return this.root.processedEvents().filter((e) => isSameDay(e.startDate, date));
    }

    onDateClick(date: Date, jsEvent: MouseEvent): void {
        this.root.dateClick.emit({ date, allDay: true, jsEvent });
    }

    onEventClick(event: ProcessedEvent, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        this.root.eventClick.emit({ event, jsEvent });
        if (this.root.quickInfo()) {
            this.root.showQuickInfo(event, jsEvent.currentTarget as HTMLElement);
        }
    }
}

/* =========================================================================
 * 5. Date Grouping Scopes: <p-scheduler-date-day>, <p-scheduler-date-week>, <p-scheduler-date-month>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-date-day',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-date-day-view">
                <div class="p-scheduler-time-grid-view">
                    <div class="p-scheduler-time-grid-header">
                        <div class="p-scheduler-time-gutter-header"></div>
                        <div class="p-scheduler-time-grid-header-days">
                            <div class="p-scheduler-time-grid-header-day">
                                <span>{{ formatDay(currentDate()) }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="p-scheduler-time-grid-body">
                        <div class="p-scheduler-time-gutter">
                            @for (slot of timeSlots(); track slot.timeString) {
                                <div class="p-scheduler-gutter-slot">
                                    <span>{{ slot.timeString }}</span>
                                </div>
                            }
                        </div>
                        <div class="p-scheduler-columns-container">
                            <div class="p-scheduler-day-column">
                                @for (slot of timeSlots(); track slot.timeString) {
                                    <div class="p-scheduler-grid-slot"></div>
                                }
                                @for (event of timedEvents(); track event.id) {
                                    <div
                                        class="p-scheduler-timed-event-wrapper"
                                        [style.top.%]="event.topPercent"
                                        [style.height.%]="event.heightPercent"
                                        [style.left.%]="event.leftPercent"
                                        [style.width.%]="event.widthPercent"
                                        (click)="onEventClick(event, $event)"
                                    >
                                        <div class="p-scheduler-timed-event-card" [style.backgroundColor]="event.color || '#3b82f6'">
                                            <div class="p-scheduler-timed-event-title">{{ event.title }}</div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-date-day-scope',
        '[attr.data-view]': '"dateDay"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerDateDayScope {
    readonly root = injectSchedulerRoot();
    readonly isActive = computed(() => this.root.currentView() === 'dateDay');
    readonly currentDate = computed(() => this.root.currentDate());
    readonly timeSlots = computed(() => generateTimeSlots(0, 24, 60));

    readonly timedEvents = computed(() => {
        const events = this.root.processedEvents().filter((e) => isSameDay(e.startDate, this.currentDate()) && !e.allDay);
        return computeTimeGridEventPositions(events, 0, 24);
    });

    formatDay(d: Date): string {
        return new Intl.DateTimeFormat(this.root.locale(), { dateStyle: 'full' }).format(d);
    }

    onEventClick(event: ProcessedEvent, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        this.root.eventClick.emit({ event, jsEvent });
        if (this.root.quickInfo()) {
            this.root.showQuickInfo(event, jsEvent.currentTarget as HTMLElement);
        }
    }
}

@Component({
    selector: 'p-scheduler-date-week',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-date-week-view">
                <div class="p-scheduler-time-grid-view">
                    <div class="p-scheduler-time-grid-header">
                        <div class="p-scheduler-time-gutter-header"></div>
                        <div class="p-scheduler-time-grid-header-days">
                            @for (day of weekDays(); track day.getTime()) {
                                <div class="p-scheduler-time-grid-header-day">
                                    <span class="p-scheduler-weekday-name">{{ formatWeekday(day) }}</span>
                                    <span class="p-scheduler-day-badge">{{ day.getDate() }}</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div class="p-scheduler-time-grid-body">
                        <div class="p-scheduler-time-gutter">
                            @for (slot of timeSlots(); track slot.timeString) {
                                <div class="p-scheduler-gutter-slot">
                                    <span>{{ slot.timeString }}</span>
                                </div>
                            }
                        </div>
                        <div class="p-scheduler-columns-container">
                            @for (day of weekDays(); track day.getTime()) {
                                <div class="p-scheduler-day-column">
                                    @for (slot of timeSlots(); track slot.timeString) {
                                        <div class="p-scheduler-grid-slot"></div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-date-week-scope',
        '[attr.data-view]': '"dateWeek"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerDateWeekScope {
    readonly root = injectSchedulerRoot();
    readonly isActive = computed(() => this.root.currentView() === 'dateWeek');
    readonly weekDays = computed(() => generateWeekDays(this.root.currentDate(), this.root.firstDayOfWeek(), 7));
    readonly timeSlots = computed(() => generateTimeSlots(0, 24, 60));

    formatWeekday(d: Date): string {
        return new Intl.DateTimeFormat(this.root.locale(), { weekday: 'short' }).format(d);
    }
}

@Component({
    selector: 'p-scheduler-date-month',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-date-month-view">
                <div class="p-scheduler-month-grid">
                    @for (day of gridDays(); track day.date.getTime()) {
                        <div class="p-scheduler-month-day" [class.p-scheduler-today]="day.isToday">
                            <span class="p-scheduler-day-number">{{ day.dayNumber }}</span>
                        </div>
                    }
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-date-month-scope',
        '[attr.data-view]': '"dateMonth"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerDateMonthScope {
    readonly root = injectSchedulerRoot();
    readonly isActive = computed(() => this.root.currentView() === 'dateMonth');
    readonly gridDays = computed<MonthGridDay[]>(() => generateMonthGrid(this.root.currentDate(), this.root.firstDayOfWeek()));
}
