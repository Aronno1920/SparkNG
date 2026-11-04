/**
 * @file
 * View Scopes: Month, Week, Day, Agenda, Year, and Timeline for @bdspark/sparkng-scheduler
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ContentChild, inject, signal, ViewEncapsulation } from '@angular/core';
import { injectSchedulerRoot, SCHEDULER_EVENT_CONTEXT_TOKEN, SchedulerEventContext } from '../../context/scheduler.context';
import { diffInMinutes, formatDate, formatTime, generateMonthGrid, generateTimeSlots, generateWeekDays, isSameDay, MonthGridDay } from '../../engine/date-utils';
import { computeTimeGridEventPositions } from '../../engine/event-layout';
import type { AppointmentSlot, BlockedInterval, ProcessedEvent, SchedulerEvent } from '../../types/scheduler.types';
import {
    SchedulerAgendaEventDef,
    SchedulerAllDayEventDef,
    SchedulerEventDef,
    SchedulerMiniMonthCellDef,
    SchedulerMiniMonthHeaderDef,
    SchedulerMonthCellDef,
    SchedulerMonthDayCellDef,
    SchedulerMonthEventDef,
    SchedulerTimeGridEventDef,
    SchedulerTimelineEventDef
} from '../definitions/scheduler-definitions';

/* =========================================================================
 * 1. Month View Scope: <p-scheduler-month>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-month',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-month-view">
                <!-- Weekday Headers -->
                <div class="p-scheduler-month-weekdays">
                    @for (w of weekdays(); track $index) {
                        <div class="p-scheduler-weekday-cell">{{ w }}</div>
                    }
                </div>

                <!-- Calendar Grid -->
                <div class="p-scheduler-month-grid">
                    @for (day of gridDays(); track day.date.getTime()) {
                        <div
                            class="p-scheduler-month-day"
                            [class.p-scheduler-today]="day.isToday"
                            [class.p-scheduler-other-month]="!day.isCurrentMonth"
                            [class.p-scheduler-weekend]="day.isWeekend"
                            [class.p-scheduler-non-working-day]="isNonWorkingDay(day.date)"
                            (click)="onDateClick(day.date, $event)"
                            (dragover)="onDragOver($event)"
                            (drop)="onDayDrop(day.date, $event)"
                        >
                            <div class="p-scheduler-day-top">
                                <span class="p-scheduler-day-number">{{ day.dayNumber }}</span>
                                @if (isNonWorkingDay(day.date)) {
                                    <span class="p-scheduler-off-badge">Off</span>
                                }
                            </div>

                            <div class="p-scheduler-day-events">
                                @for (event of getEventsForDay(day.date).slice(0, root.maxEventsVisible()); track event.id) {
                                    <div
                                        class="p-scheduler-event-container"
                                        [attr.draggable]="root.editable() ? true : null"
                                        (dragstart)="onEventDragStart(event, $event)"
                                        (click)="onEventClick(event, $event)"
                                        (contextmenu)="onEventContextMenu(event, day.date, $event)"
                                    >
                                        @if (monthEventDef?.template || globalEventDef?.template) {
                                            <ng-container *ngTemplateOutlet="monthEventDef?.template || globalEventDef?.template; context: { $implicit: getEventContext(event) }"></ng-container>
                                        } @else {
                                            <div
                                                class="p-scheduler-event-pill"
                                                [class.p-scheduler-event-selected]="isSelected(event.id)"
                                                [style.backgroundColor]="event.color || 'var(--p-primary-500, #3b82f6)'"
                                                [style.color]="event.textColor || '#fff'"
                                            >
                                                <span class="p-scheduler-event-pill-time">{{ formatEventTime(event) }}</span>
                                                <span class="p-scheduler-event-pill-title">{{ event.title }}</span>
                                            </div>
                                        }
                                    </div>
                                }

                                @if (getEventsForDay(day.date).length > root.maxEventsVisible()) {
                                    <button type="button" class="p-scheduler-more-link" (click)="onMoreClick(day.date, getEventsForDay(day.date), $event)">+{{ getEventsForDay(day.date).length - root.maxEventsVisible() }} more</button>
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
        class: 'p-scheduler-month-scope',
        '[attr.data-view]': '"month"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerMonthScope {
    readonly root = injectSchedulerRoot();

    @ContentChild(SchedulerMonthEventDef) monthEventDef?: SchedulerMonthEventDef;
    @ContentChild(SchedulerMonthCellDef) monthCellDef?: SchedulerMonthCellDef;
    @ContentChild(SchedulerEventDef) globalEventDef?: SchedulerEventDef;

    readonly isActive = computed(() => this.root.currentView() === 'month');

    readonly weekdays = computed(() => {
        const fdw = this.root.firstDayOfWeek();
        const base = new Date(2026, 4, 10 + fdw); // Sunday + fdw
        const arr: string[] = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(base.getTime() + i * 86400000);
            arr.push(new Intl.DateTimeFormat(this.root.locale(), { weekday: 'short' }).format(d));
        }
        return arr;
    });

    readonly gridDays = computed<MonthGridDay[]>(() => generateMonthGrid(this.root.currentDate(), this.root.firstDayOfWeek()));

    isNonWorkingDay(d: Date): boolean {
        const working = this.root.workingDays();
        return working.length > 0 && !working.includes(d.getDay());
    }

    isSelected(id: string | number): boolean {
        return this.root.selectedEventIds().has(id);
    }

    getEventsForDay(date: Date): ProcessedEvent[] {
        return this.root.processedEvents().filter((e) => isSameDay(e.startDate, date));
    }

    getEventContext(event: ProcessedEvent): SchedulerEventContext {
        return {
            event,
            title: event.title,
            timeText: this.formatEventTime(event),
            accentColor: event.color || 'var(--p-primary-500, #3b82f6)',
            isSelected: this.isSelected(event.id),
            isDragging: false,
            view: this.root.currentView()
        };
    }

    formatEventTime(event: ProcessedEvent): string {
        if (event.allDay) return 'All Day';
        return formatTime(event.startDate, this.root.locale());
    }

    onDateClick(date: Date, jsEvent: MouseEvent): void {
        this.root.dateClick.emit({ date, allDay: true, jsEvent });
    }

    onEventClick(event: ProcessedEvent, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        if (jsEvent.ctrlKey || jsEvent.metaKey) {
            this.root.selectEvent(event, true);
            return;
        }
        this.root.eventClick.emit({ event, jsEvent });
        if (this.root.quickInfo()) {
            this.root.showQuickInfo(event, jsEvent.currentTarget as HTMLElement);
        }
    }

    onEventContextMenu(event: ProcessedEvent, date: Date, jsEvent: MouseEvent): void {
        jsEvent.preventDefault();
        jsEvent.stopPropagation();
        this.root.showContextMenu(jsEvent.clientX, jsEvent.clientY, event, date);
    }

    onMoreClick(date: Date, events: ProcessedEvent[], jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        this.root.openMorePopover(date, events, jsEvent.currentTarget as HTMLElement);
    }

    onEventDragStart(event: ProcessedEvent, jsEvent: DragEvent): void {
        if (!this.root.editable()) return;
        jsEvent.dataTransfer?.setData('text/plain', JSON.stringify({ id: event.id }));
    }

    onDragOver(jsEvent: DragEvent): void {
        jsEvent.preventDefault();
    }

    onDayDrop(targetDate: Date, jsEvent: DragEvent): void {
        jsEvent.preventDefault();
        const raw = jsEvent.dataTransfer?.getData('text/plain');
        if (!raw) return;
        try {
            const data = JSON.parse(raw);
            const found = this.root.processedEvents().find((e) => e.id === data.id);
            if (!found) return;

            const diffDays = Math.round((targetDate.getTime() - found.startDate.getTime()) / 86400000);
            const newStart = new Date(found.startDate.getTime() + diffDays * 86400000);
            const newEnd = new Date(found.endDate.getTime() + diffDays * 86400000);

            this.root.updateEvent({
                ...found,
                start: newStart,
                end: newEnd
            });
            this.root.eventDrop.emit({
                event: { ...found, start: newStart, end: newEnd },
                oldEvent: found,
                deltaMinutes: diffDays * 1440,
                newStart,
                newEnd,
                revert: () => this.root.updateEvent(found)
            });
        } catch {
            // Ignore parse errors
        }
    }
}

/* =========================================================================
 * 2. Week View Scope: <p-scheduler-week>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-week',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-time-grid-view">
                <!-- Header Days -->
                <div class="p-scheduler-time-grid-header">
                    <div class="p-scheduler-time-gutter-header"></div>
                    <div class="p-scheduler-time-grid-header-days">
                        @for (day of weekDays(); track day.getTime()) {
                            <div class="p-scheduler-time-grid-header-day" [class.p-scheduler-non-working-day]="isNonWorkingDay(day)">
                                <span class="p-scheduler-weekday-name">{{ formatWeekday(day) }}</span>
                                <span class="p-scheduler-day-badge" [class.p-scheduler-today]="isToday(day)">
                                    {{ day.getDate() }}
                                </span>
                            </div>
                        }
                    </div>
                </div>

                <!-- Scrollable Timed Grid -->
                <div class="p-scheduler-time-grid-body">
                    <!-- Gutter -->
                    <div class="p-scheduler-time-gutter">
                        @for (slot of timeSlots(); track slot.timeString) {
                            <div class="p-scheduler-gutter-slot">
                                <span>{{ slot.timeString }}</span>
                            </div>
                        }
                    </div>

                    <!-- Columns -->
                    <div class="p-scheduler-columns-container">
                        @for (day of weekDays(); track day.getTime()) {
                            <div class="p-scheduler-day-column" [class.p-scheduler-non-working-day]="isNonWorkingDay(day)" (click)="onColumnClick(day, $event)" (dragover)="onDragOver($event)" (drop)="onColumnDrop(day, $event)">
                                <!-- Slots with Business Hours styling -->
                                @for (slot of timeSlots(); track slot.timeString) {
                                    <div class="p-scheduler-grid-slot" [class.p-scheduler-business-hour]="isBusinessHour(slot.hour, day)" [class.p-scheduler-off-hour]="!isBusinessHour(slot.hour, day)"></div>
                                }

                                <!-- Blocked Intervals -->
                                @for (blocked of getBlockedIntervalsForDay(day); track $index) {
                                    <div class="p-scheduler-blocked-interval" [style.top.%]="calcBlockedTop(blocked)" [style.height.%]="calcBlockedHeight(blocked)">
                                        <span class="p-scheduler-lock-icon">🔒</span>
                                        <span class="p-scheduler-blocked-title">{{ blocked.title || 'Blocked' }}</span>
                                    </div>
                                }

                                <!-- Appointment Slots -->
                                @for (slot of getAppointmentSlotsForDay(day); track slot.id) {
                                    <div class="p-scheduler-appointment-slot" [class.p-scheduler-slot-booked]="slot.status === 'booked'" [style.top.%]="calcSlotTop(slot)" [style.height.%]="calcSlotHeight(slot)">
                                        <div class="p-scheduler-slot-info">
                                            <span>{{ slot.title || 'Available Slot' }}</span>
                                            @if (slot.price) {
                                                <span class="p-scheduler-slot-price">\${{ slot.price }}</span>
                                            }
                                        </div>
                                        @if (slot.status !== 'booked') {
                                            <button type="button" class="p-scheduler-slot-book-btn" (click)="onBookSlot(slot, day, $event)">Book</button>
                                        }
                                    </div>
                                }

                                <!-- Current Time Indicator (Now Line) -->
                                @if (isToday(day) && root.nowIndicator()) {
                                    <div class="p-scheduler-now-indicator" [style.top.%]="nowPercent()">
                                        <div class="p-scheduler-now-arrow"></div>
                                        <div class="p-scheduler-now-line"></div>
                                    </div>
                                }

                                <!-- Positioned Timed Events -->
                                @for (event of getTimedEventsForDay(day); track event.id) {
                                    <div
                                        class="p-scheduler-timed-event-wrapper"
                                        [style.top.%]="event.topPercent"
                                        [style.height.%]="event.heightPercent"
                                        [style.left.%]="event.leftPercent"
                                        [style.width.%]="event.widthPercent"
                                        [attr.draggable]="root.editable() ? true : null"
                                        (dragstart)="onEventDragStart(event, $event)"
                                        (click)="onEventClick(event, $event)"
                                        (contextmenu)="onEventContextMenu(event, day, $event)"
                                    >
                                        @if (timeGridEventDef?.template || globalEventDef?.template) {
                                            <ng-container *ngTemplateOutlet="timeGridEventDef?.template || globalEventDef?.template; context: { $implicit: getEventContext(event) }"></ng-container>
                                        } @else {
                                            <div
                                                class="p-scheduler-timed-event-card"
                                                [class.p-scheduler-event-selected]="isSelected(event.id)"
                                                [style.backgroundColor]="event.color || 'var(--p-primary-500, #3b82f6)'"
                                                [style.color]="event.textColor || '#fff'"
                                            >
                                                <div class="p-scheduler-timed-event-title">{{ event.title }}</div>
                                                <div class="p-scheduler-timed-event-time">
                                                    {{ formatEventTime(event) }}
                                                </div>
                                                <!-- Top / Bottom Resize Handles -->
                                                @if (root.editable() && root.eventDurationEditable()) {
                                                    <div class="p-scheduler-resize-handle p-scheduler-resize-top"></div>
                                                    <div class="p-scheduler-resize-handle p-scheduler-resize-bottom"></div>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-week-scope',
        '[attr.data-view]': '"week"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerWeekScope {
    readonly root = injectSchedulerRoot();

    @ContentChild(SchedulerTimeGridEventDef) timeGridEventDef?: SchedulerTimeGridEventDef;
    @ContentChild(SchedulerAllDayEventDef) allDayEventDef?: SchedulerAllDayEventDef;
    @ContentChild(SchedulerEventDef) globalEventDef?: SchedulerEventDef;

    readonly isActive = computed(() => this.root.currentView() === 'week');
    readonly weekDays = computed(() => generateWeekDays(this.root.currentDate(), this.root.firstDayOfWeek(), 7));
    readonly timeSlots = computed(() => generateTimeSlots(0, 24, 60));

    readonly nowPercent = computed(() => {
        const now = new Date();
        const mins = now.getHours() * 60 + now.getMinutes();
        return (mins / 1440) * 100;
    });

    isNonWorkingDay(d: Date): boolean {
        const working = this.root.workingDays();
        return working.length > 0 && !working.includes(d.getDay());
    }

    isBusinessHour(hour: number, d: Date): boolean {
        if (this.isNonWorkingDay(d)) return false;
        const bh = this.root.businessHours();
        if (!bh) return hour >= 9 && hour < 17;
        const startH = parseInt(bh.startTime || '09:00', 10);
        const endH = parseInt(bh.endTime || '17:00', 10);
        return hour >= startH && hour < endH;
    }

    isSelected(id: string | number): boolean {
        return this.root.selectedEventIds().has(id);
    }

    formatWeekday(d: Date): string {
        return new Intl.DateTimeFormat(this.root.locale(), { weekday: 'short' }).format(d);
    }

    isToday(d: Date): boolean {
        return isSameDay(d, new Date());
    }

    getTimedEventsForDay(day: Date): ProcessedEvent[] {
        const events = this.root.processedEvents().filter((e) => isSameDay(e.startDate, day) && !e.allDay);
        return computeTimeGridEventPositions(events, 0, 24);
    }

    getBlockedIntervalsForDay(day: Date): BlockedInterval[] {
        return this.root.blockedIntervals().filter((b) => isSameDay(new Date(b.start), day));
    }

    calcBlockedTop(b: BlockedInterval): number {
        const s = new Date(b.start);
        const mins = s.getHours() * 60 + s.getMinutes();
        return (mins / 1440) * 100;
    }

    calcBlockedHeight(b: BlockedInterval): number {
        const s = new Date(b.start);
        const e = new Date(b.end);
        const duration = Math.max(30, (e.getTime() - s.getTime()) / 60000);
        return (duration / 1440) * 100;
    }

    getAppointmentSlotsForDay(day: Date): AppointmentSlot[] {
        return this.root.appointmentSlots().filter((s) => isSameDay(new Date(s.start), day));
    }

    calcSlotTop(s: AppointmentSlot): number {
        const d = new Date(s.start);
        const mins = d.getHours() * 60 + d.getMinutes();
        return (mins / 1440) * 100;
    }

    calcSlotHeight(s: AppointmentSlot): number {
        const start = new Date(s.start);
        const end = new Date(s.end);
        const duration = Math.max(30, (end.getTime() - start.getTime()) / 60000);
        return (duration / 1440) * 100;
    }

    onBookSlot(slot: AppointmentSlot, day: Date, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        this.root.bookSlot(slot, day);
    }

    getEventContext(event: ProcessedEvent): SchedulerEventContext {
        return {
            event,
            title: event.title,
            timeText: this.formatEventTime(event),
            accentColor: event.color || 'var(--p-primary-500, #3b82f6)',
            isSelected: this.isSelected(event.id),
            isDragging: false,
            view: this.root.currentView()
        };
    }

    formatEventTime(event: ProcessedEvent): string {
        return `${formatTime(event.startDate, this.root.locale())} – ${formatTime(event.endDate, this.root.locale())}`;
    }

    onColumnClick(date: Date, jsEvent: MouseEvent): void {
        this.root.dateClick.emit({ date, allDay: false, jsEvent });
    }

    onEventClick(event: ProcessedEvent, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        if (jsEvent.ctrlKey || jsEvent.metaKey) {
            this.root.selectEvent(event, true);
            return;
        }
        this.root.eventClick.emit({ event, jsEvent });
        if (this.root.quickInfo()) {
            this.root.showQuickInfo(event, jsEvent.currentTarget as HTMLElement);
        }
    }

    onEventContextMenu(event: ProcessedEvent, date: Date, jsEvent: MouseEvent): void {
        jsEvent.preventDefault();
        jsEvent.stopPropagation();
        this.root.showContextMenu(jsEvent.clientX, jsEvent.clientY, event, date);
    }

    onEventDragStart(event: ProcessedEvent, jsEvent: DragEvent): void {
        if (!this.root.editable()) return;
        jsEvent.dataTransfer?.setData('text/plain', JSON.stringify({ id: event.id }));
    }

    onDragOver(jsEvent: DragEvent): void {
        jsEvent.preventDefault();
    }

    onColumnDrop(day: Date, jsEvent: DragEvent): void {
        jsEvent.preventDefault();
        const raw = jsEvent.dataTransfer?.getData('text/plain');
        if (!raw) return;
        try {
            const data = JSON.parse(raw);
            const found = this.root.processedEvents().find((e) => e.id === data.id);
            if (!found) return;

            const diffDays = Math.round((day.getTime() - found.startDate.getTime()) / 86400000);
            const newStart = new Date(found.startDate.getTime() + diffDays * 86400000);
            const newEnd = new Date(found.endDate.getTime() + diffDays * 86400000);

            this.root.updateEvent({ ...found, start: newStart, end: newEnd });
            this.root.eventDrop.emit({
                event: { ...found, start: newStart, end: newEnd },
                oldEvent: found,
                deltaMinutes: diffDays * 1440,
                newStart,
                newEnd,
                revert: () => this.root.updateEvent(found)
            });
        } catch {}
    }
}

/* =========================================================================
 * 3. Day View Scope: <p-scheduler-day>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-day',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-time-grid-view p-scheduler-single-day">
                <div class="p-scheduler-time-grid-header">
                    <div class="p-scheduler-time-gutter-header"></div>
                    <div class="p-scheduler-time-grid-header-days">
                        <div class="p-scheduler-time-grid-header-day">
                            <span class="p-scheduler-weekday-name">{{ formatWeekday(currentDate()) }}</span>
                            <span class="p-scheduler-day-badge" [class.p-scheduler-today]="isToday(currentDate())">
                                {{ currentDate().getDate() }}
                            </span>
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
                        <div class="p-scheduler-day-column" (click)="onDayClick($event)">
                            @for (slot of timeSlots(); track slot.timeString) {
                                <div class="p-scheduler-grid-slot" [class.p-scheduler-business-hour]="isBusinessHour(slot.hour)" [class.p-scheduler-off-hour]="!isBusinessHour(slot.hour)"></div>
                            }

                            <!-- Blocked Intervals -->
                            @for (blocked of blockedIntervals(); track $index) {
                                <div class="p-scheduler-blocked-interval" [style.top.%]="calcBlockedTop(blocked)" [style.height.%]="calcBlockedHeight(blocked)">
                                    <span class="p-scheduler-lock-icon">🔒</span>
                                    <span>{{ blocked.title || 'Blocked' }}</span>
                                </div>
                            }

                            <!-- Appointment Slots -->
                            @for (slot of appointmentSlots(); track slot.id) {
                                <div class="p-scheduler-appointment-slot" [class.p-scheduler-slot-booked]="slot.status === 'booked'" [style.top.%]="calcSlotTop(slot)" [style.height.%]="calcSlotHeight(slot)">
                                    <div class="p-scheduler-slot-info">
                                        <span>{{ slot.title || 'Available Slot' }}</span>
                                        @if (slot.price) {
                                            <span class="p-scheduler-slot-price">\${{ slot.price }}</span>
                                        }
                                    </div>
                                    @if (slot.status !== 'booked') {
                                        <button type="button" class="p-scheduler-slot-book-btn" (click)="onBookSlot(slot, currentDate(), $event)">Book</button>
                                    }
                                </div>
                            }

                            <!-- Current Time Indicator -->
                            @if (isToday(currentDate()) && root.nowIndicator()) {
                                <div class="p-scheduler-now-indicator" [style.top.%]="nowPercent()">
                                    <div class="p-scheduler-now-arrow"></div>
                                    <div class="p-scheduler-now-line"></div>
                                </div>
                            }

                            @for (event of timedEvents(); track event.id) {
                                <div
                                    class="p-scheduler-timed-event-wrapper"
                                    [style.top.%]="event.topPercent"
                                    [style.height.%]="event.heightPercent"
                                    [style.left.%]="event.leftPercent"
                                    [style.width.%]="event.widthPercent"
                                    (click)="onEventClick(event, $event)"
                                    (contextmenu)="onEventContextMenu(event, $event)"
                                >
                                    @if (timeGridEventDef?.template || globalEventDef?.template) {
                                        <ng-container *ngTemplateOutlet="timeGridEventDef?.template || globalEventDef?.template; context: { $implicit: getEventContext(event) }"></ng-container>
                                    } @else {
                                        <div
                                            class="p-scheduler-timed-event-card"
                                            [class.p-scheduler-event-selected]="isSelected(event.id)"
                                            [style.backgroundColor]="event.color || 'var(--p-primary-500, #3b82f6)'"
                                            [style.color]="event.textColor || '#fff'"
                                        >
                                            <div class="p-scheduler-timed-event-title">{{ event.title }}</div>
                                            <div class="p-scheduler-timed-event-time">{{ formatEventTime(event) }}</div>
                                            @if (root.editable() && root.eventDurationEditable()) {
                                                <div class="p-scheduler-resize-handle p-scheduler-resize-top"></div>
                                                <div class="p-scheduler-resize-handle p-scheduler-resize-bottom"></div>
                                            }
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
        class: 'p-scheduler-day-scope',
        '[attr.data-view]': '"day"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerDayScope {
    readonly root = injectSchedulerRoot();

    @ContentChild(SchedulerTimeGridEventDef) timeGridEventDef?: SchedulerTimeGridEventDef;
    @ContentChild(SchedulerEventDef) globalEventDef?: SchedulerEventDef;

    readonly isActive = computed(() => this.root.currentView() === 'day');
    readonly currentDate = computed(() => this.root.currentDate());
    readonly timeSlots = computed(() => generateTimeSlots(0, 24, 60));

    readonly nowPercent = computed(() => {
        const now = new Date();
        const mins = now.getHours() * 60 + now.getMinutes();
        return (mins / 1440) * 100;
    });

    isBusinessHour(hour: number): boolean {
        const bh = this.root.businessHours();
        if (!bh) return hour >= 9 && hour < 17;
        const startH = parseInt(bh.startTime || '09:00', 10);
        const endH = parseInt(bh.endTime || '17:00', 10);
        return hour >= startH && hour < endH;
    }

    isSelected(id: string | number): boolean {
        return this.root.selectedEventIds().has(id);
    }

    readonly timedEvents = computed(() => {
        const events = this.root.processedEvents().filter((e) => isSameDay(e.startDate, this.currentDate()) && !e.allDay);
        return computeTimeGridEventPositions(events, 0, 24);
    });

    readonly blockedIntervals = computed(() => {
        return this.root.blockedIntervals().filter((b) => isSameDay(new Date(b.start), this.currentDate()));
    });

    readonly appointmentSlots = computed(() => {
        return this.root.appointmentSlots().filter((s) => isSameDay(new Date(s.start), this.currentDate()));
    });

    calcBlockedTop(b: BlockedInterval): number {
        const s = new Date(b.start);
        const mins = s.getHours() * 60 + s.getMinutes();
        return (mins / 1440) * 100;
    }

    calcBlockedHeight(b: BlockedInterval): number {
        const s = new Date(b.start);
        const e = new Date(b.end);
        const duration = Math.max(30, (e.getTime() - s.getTime()) / 60000);
        return (duration / 1440) * 100;
    }

    calcSlotTop(s: AppointmentSlot): number {
        const d = new Date(s.start);
        const mins = d.getHours() * 60 + d.getMinutes();
        return (mins / 1440) * 100;
    }

    calcSlotHeight(s: AppointmentSlot): number {
        const start = new Date(s.start);
        const end = new Date(s.end);
        const duration = Math.max(30, (end.getTime() - start.getTime()) / 60000);
        return (duration / 1440) * 100;
    }

    onBookSlot(slot: AppointmentSlot, day: Date, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        this.root.bookSlot(slot, day);
    }

    formatWeekday(d: Date): string {
        return new Intl.DateTimeFormat(this.root.locale(), { weekday: 'long', month: 'long', day: 'numeric' }).format(d);
    }

    isToday(d: Date): boolean {
        return isSameDay(d, new Date());
    }

    getEventContext(event: ProcessedEvent): SchedulerEventContext {
        return {
            event,
            title: event.title,
            timeText: this.formatEventTime(event),
            accentColor: event.color || 'var(--p-primary-500, #3b82f6)',
            isSelected: this.isSelected(event.id),
            isDragging: false,
            view: this.root.currentView()
        };
    }

    formatEventTime(event: ProcessedEvent): string {
        return `${formatTime(event.startDate, this.root.locale())} – ${formatTime(event.endDate, this.root.locale())}`;
    }

    onDayClick(jsEvent: MouseEvent): void {
        this.root.dateClick.emit({ date: this.currentDate(), allDay: false, jsEvent });
    }

    onEventClick(event: ProcessedEvent, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        if (jsEvent.ctrlKey || jsEvent.metaKey) {
            this.root.selectEvent(event, true);
            return;
        }
        this.root.eventClick.emit({ event, jsEvent });
        if (this.root.quickInfo()) {
            this.root.showQuickInfo(event, jsEvent.currentTarget as HTMLElement);
        }
    }

    onEventContextMenu(event: ProcessedEvent, jsEvent: MouseEvent): void {
        jsEvent.preventDefault();
        jsEvent.stopPropagation();
        this.root.showContextMenu(jsEvent.clientX, jsEvent.clientY, event, this.currentDate());
    }
}

/* =========================================================================
 * 4. Agenda View Scope: <p-scheduler-agenda>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-agenda',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-agenda-view">
                @if (agendaGroups().length === 0) {
                    <div class="p-scheduler-empty-state">
                        <p>No events scheduled for this period.</p>
                    </div>
                }

                @for (group of agendaGroups(); track group.date.getTime()) {
                    <div class="p-scheduler-agenda-group">
                        <div class="p-scheduler-agenda-header">
                            <span class="p-scheduler-agenda-date">{{ formatDateTitle(group.date) }}</span>
                            <span class="p-scheduler-agenda-count">{{ group.events.length }} events</span>
                        </div>

                        <div class="p-scheduler-agenda-list">
                            @for (event of group.events; track event.id) {
                                <div class="p-scheduler-agenda-item" (click)="onEventClick(event, $event)">
                                    @if (agendaEventDef?.template || globalEventDef?.template) {
                                        <ng-container *ngTemplateOutlet="agendaEventDef?.template || globalEventDef?.template; context: { $implicit: getEventContext(event) }"></ng-container>
                                    } @else {
                                        <div class="p-scheduler-agenda-card" [class.p-scheduler-event-selected]="isSelected(event.id)" [style.borderLeftColor]="event.color || 'var(--p-primary-500, #3b82f6)'">
                                            <div class="p-scheduler-agenda-time">{{ formatEventTime(event) }}</div>
                                            <div class="p-scheduler-agenda-info">
                                                <div class="p-scheduler-agenda-title">{{ event.title }}</div>
                                                @if (event.location) {
                                                    <div class="p-scheduler-agenda-meta">📍 {{ event.location }}</div>
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-agenda-scope',
        '[attr.data-view]': '"agenda"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerAgendaScope {
    readonly root = injectSchedulerRoot();

    @ContentChild(SchedulerAgendaEventDef) agendaEventDef?: SchedulerAgendaEventDef;
    @ContentChild(SchedulerEventDef) globalEventDef?: SchedulerEventDef;

    readonly isActive = computed(() => this.root.currentView() === 'agenda');

    isSelected(id: string | number): boolean {
        return this.root.selectedEventIds().has(id);
    }

    readonly agendaGroups = computed(() => {
        const events = [...this.root.processedEvents()].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        const groups: Map<string, { date: Date; events: ProcessedEvent[] }> = new Map();

        for (const ev of events) {
            const key = `${ev.startDate.getFullYear()}-${ev.startDate.getMonth() + 1}-${ev.startDate.getDate()}`;
            if (!groups.has(key)) {
                groups.set(key, { date: new Date(ev.startDate.getFullYear(), ev.startDate.getMonth(), ev.startDate.getDate()), events: [] });
            }
            groups.get(key)!.events.push(ev);
        }

        return Array.from(groups.values());
    });

    formatDateTitle(d: Date): string {
        return new Intl.DateTimeFormat(this.root.locale(), { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(d);
    }

    formatEventTime(event: ProcessedEvent): string {
        if (event.allDay) return 'All Day';
        return `${formatTime(event.startDate, this.root.locale())} – ${formatTime(event.endDate, this.root.locale())}`;
    }

    getEventContext(event: ProcessedEvent): SchedulerEventContext {
        return {
            event,
            title: event.title,
            timeText: this.formatEventTime(event),
            accentColor: event.color || 'var(--p-primary-500, #3b82f6)',
            isSelected: this.isSelected(event.id),
            isDragging: false,
            view: this.root.currentView()
        };
    }

    onEventClick(event: ProcessedEvent, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        if (jsEvent.ctrlKey || jsEvent.metaKey) {
            this.root.selectEvent(event, true);
            return;
        }
        this.root.eventClick.emit({ event, jsEvent });
        if (this.root.quickInfo()) {
            this.root.showQuickInfo(event, jsEvent.currentTarget as HTMLElement);
        }
    }
}

/* =========================================================================
 * 5. Year View Scope: <p-scheduler-year>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-year',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-year-view">
                @for (m of months(); track m.monthIndex) {
                    <div class="p-scheduler-mini-month-card">
                        <div class="p-scheduler-mini-month-name">{{ m.name }}</div>
                        <div class="p-scheduler-mini-month-grid">
                            @for (day of m.days; track day.date.getTime()) {
                                <div
                                    class="p-scheduler-mini-day"
                                    [class.p-scheduler-mini-today]="day.isToday"
                                    [class.p-scheduler-mini-has-events]="day.eventCount > 0"
                                    (click)="onMiniDayClick(day.date)"
                                    [title]="day.eventCount > 0 ? day.eventCount + ' events' : ''"
                                >
                                    {{ day.dayNumber }}
                                    @if (day.eventCount > 0) {
                                        <span class="p-scheduler-mini-dot"></span>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-year-scope',
        '[attr.data-view]': '"year"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerYearScope {
    readonly root = injectSchedulerRoot();

    @ContentChild(SchedulerMiniMonthCellDef) miniCellDef?: SchedulerMiniMonthCellDef;
    @ContentChild(SchedulerMiniMonthHeaderDef) miniHeaderDef?: SchedulerMiniMonthHeaderDef;

    readonly isActive = computed(() => this.root.currentView() === 'year');

    readonly months = computed(() => {
        const yr = this.root.currentDate().getFullYear();
        const list: Array<{ monthIndex: number; name: string; days: any[] }> = [];
        for (let m = 0; m < 12; m++) {
            const first = new Date(yr, m, 1);
            const grid = generateMonthGrid(first, this.root.firstDayOfWeek());
            const days = grid.map((g) => ({
                ...g,
                eventCount: this.root.processedEvents().filter((e) => isSameDay(e.startDate, g.date)).length
            }));
            list.push({
                monthIndex: m,
                name: new Intl.DateTimeFormat(this.root.locale(), { month: 'long' }).format(first),
                days
            });
        }
        return list;
    });

    onMiniDayClick(date: Date): void {
        this.root.gotoDate(date);
        this.root.changeView('day');
    }
}

/* =========================================================================
 * 6. Timeline View Scope: <p-scheduler-timeline>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-timeline',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (isActive()) {
            <div class="p-scheduler-timeline-view">
                <div class="p-scheduler-timeline-header">
                    <div class="p-scheduler-timeline-resource-col">Resource / Task</div>
                    <div class="p-scheduler-timeline-days-header">
                        @for (day of timelineDays(); track day.getTime()) {
                            <div class="p-scheduler-timeline-day-cell">
                                <span class="p-scheduler-timeline-day-name">{{ formatDayName(day) }}</span>
                                <span class="p-scheduler-timeline-day-num">{{ day.getDate() }}</span>
                            </div>
                        }
                    </div>
                </div>

                <div class="p-scheduler-timeline-body">
                    @for (res of resources(); track res.id) {
                        <div class="p-scheduler-timeline-row">
                            <div class="p-scheduler-timeline-row-label">
                                <span class="p-scheduler-resource-dot" [style.backgroundColor]="res.eventColor || '#3b82f6'"></span>
                                <span>{{ res.title }}</span>
                            </div>
                            <div class="p-scheduler-timeline-row-track">
                                @for (day of timelineDays(); track day.getTime()) {
                                    <div class="p-scheduler-timeline-slot"></div>
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
        class: 'p-scheduler-timeline-scope',
        '[attr.data-view]': '"timeline"',
        '[class.p-scheduler-view-active]': 'isActive()',
        '[style.display]': 'isActive() ? "flex" : "none"'
    }
})
export class SchedulerTimelineScope {
    readonly root = injectSchedulerRoot();

    readonly isActive = computed(() => this.root.currentView() === 'timeline');
    readonly timelineDays = computed(() => generateWeekDays(this.root.currentDate(), this.root.firstDayOfWeek(), 14));

    readonly resources = computed(() => {
        const list = this.root.resources();
        if (list.length > 0) return list;
        return [{ id: 'default', title: 'All Events', eventColor: '#3b82f6' }];
    });

    formatDayName(d: Date): string {
        return new Intl.DateTimeFormat(this.root.locale(), { weekday: 'short' }).format(d);
    }

    getEventsForResource(resId: string | number): ProcessedEvent[] {
        if (resId === 'default') return this.root.processedEvents();
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

    onEventClick(event: ProcessedEvent, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        this.root.eventClick.emit({ event, jsEvent });
        if (this.root.quickInfo()) {
            this.root.showQuickInfo(event, jsEvent.currentTarget as HTMLElement);
        }
    }
}
