/**
 * @file
 * Core Scheduler Root Component: <p-scheduler-root>
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, HostBinding, inject, input, model, OnInit, output, signal, ViewEncapsulation } from '@angular/core';
import { SchedulerStyle } from '../../style/schedulerstyle';
import { SCHEDULER_ROOT_TOKEN, SchedulerRootInstance } from '../../context/scheduler.context';
import { addDays, addMonths, addYears, endOfDay, endOfWeek, getViewTitle, startOfDay, startOfWeek, toDate } from '../../engine/date-utils';
import { expandRecurringEvents } from '../../engine/rrule-engine';
import type {
    AppointmentSlot,
    BlockedInterval,
    BulkEventsPayload,
    BusinessHours,
    ContextMenuState,
    DateClickPayload,
    DateRange,
    DateSelectPayload,
    DensityMode,
    EventCategory,
    EventClickPayload,
    EventDropPayload,
    EventPopoverState,
    EventResizePayload,
    MorePopoverState,
    ProcessedEvent,
    QuickInfoState,
    RecurrenceEditPayload,
    SchedulerEvent,
    SchedulerResource,
    SchedulerViewType,
    SlotBookPayload
} from '../../types/scheduler.types';

@Component({
    selector: 'p-scheduler-root',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="p-scheduler-wrapper" [class.p-scheduler-disabled]="disabled()" [class.p-scheduler-readonly]="readonly()">
            <ng-content select="p-scheduler-header"></ng-content>
            <ng-content select="p-scheduler-selection-toolbar"></ng-content>
            <ng-content select="p-scheduler-category-legend"></ng-content>
            <ng-content select="p-scheduler-content"></ng-content>
            <ng-content select="p-scheduler-footer"></ng-content>
            <ng-content select="p-scheduler-quick-info"></ng-content>
            <ng-content select="p-scheduler-more-popover"></ng-content>
            <ng-content select="p-scheduler-popover"></ng-content>
            <ng-content select="p-scheduler-context-menu"></ng-content>
            <ng-content select="p-scheduler-loading"></ng-content>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        SchedulerStyle,
        {
            provide: SCHEDULER_ROOT_TOKEN,
            useExisting: SchedulerRoot
        }
    ],
    host: {
        class: 'p-scheduler',
        '[attr.data-scope]': '"scheduler"',
        '[attr.data-part]': '"root"',
        '[attr.data-slot]': '"scheduler-root"',
        '[attr.data-view]': 'view()',
        '[attr.data-disabled]': 'disabled() ? "" : null',
        '[attr.dir]': 'rtl() ? "rtl" : null',
        role: 'application',
        tabindex: '0'
    },
    exportAs: 'pScheduler'
})
export class SchedulerRoot implements SchedulerRootInstance, OnInit {
    readonly hostElement = inject(ElementRef).nativeElement as HTMLElement;
    readonly _componentStyle = inject(SchedulerStyle);

    constructor() {
        this._componentStyle.loadStyle();
    }

    ngOnInit(): void {
        this._componentStyle.loadStyle();
    }

    /******************** Inputs ********************/
    readonly view = model<SchedulerViewType>('month');
    readonly date = model<Date>(new Date());
    readonly events = input<SchedulerEvent[]>([]);
    readonly resources = input<SchedulerResource[]>([]);
    readonly categories = input<EventCategory[]>([]);
    readonly categoryField = input<string>('categoryId');
    readonly activeCategoryIds = model<(string | number)[]>([]);
    readonly firstDayOfWeek = input<number>(0);
    readonly slotMinTime = input<string>('00:00:00');
    readonly slotMaxTime = input<string>('24:00:00');
    readonly slotDuration = input<string>('00:30:00');
    readonly snapDuration = input<string>('00:15:00');
    readonly businessHours = input<any>({
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: '09:00',
        endTime: '17:00'
    });
    readonly workingDays = input<number[]>([1, 2, 3, 4, 5]);
    readonly blockedIntervals = input<BlockedInterval[]>([]);
    readonly appointmentSlots = input<AppointmentSlot[]>([]);
    readonly adaptiveBreakpoint = input<number>(768);
    readonly editable = input<boolean>(true);
    readonly eventStartEditable = input<boolean>(true);
    readonly eventDurationEditable = input<boolean>(true);
    readonly selectable = input<boolean>(true);
    readonly density = input<DensityMode>('standard');
    readonly locale = input<string>('en-US');
    readonly timezone = input<string>('local');
    readonly rtl = input<boolean>(false);
    readonly height = input<string | number>('auto');
    readonly nowIndicator = input<boolean>(true);
    readonly eventShell = input<'default' | 'none'>('default');
    readonly quickInfo = input<boolean>(true);
    readonly eventPopover = input<boolean>(true);
    readonly showMorePopover = input<boolean>(true);
    readonly contextMenu = input<boolean>(true);
    readonly maxEventsVisible = input<number>(3);
    readonly disabled = input<boolean>(false);
    readonly readonly = input<boolean>(false);

    /******************** Outputs ********************/
    readonly eventClick = output<EventClickPayload>();
    readonly eventDblclick = output<EventClickPayload>();
    readonly dateClick = output<DateClickPayload>();
    readonly dateSelect = output<DateSelectPayload>();
    readonly eventDrop = output<EventDropPayload>();
    readonly eventResize = output<EventResizePayload>();
    readonly eventAdd = output<SchedulerEvent>();
    readonly eventChange = output<SchedulerEvent>();
    readonly eventRemove = output<string | number>();
    readonly resourceClick = output<SchedulerResource>();
    readonly moreClick = output<{ date: Date; events: ProcessedEvent[] }>();
    readonly quickInfoShow = output<QuickInfoState>();
    readonly quickInfoHide = output<void>();
    readonly slotBook = output<SlotBookPayload>();
    readonly bulkUpdate = output<BulkEventsPayload>();
    readonly recurrenceEdit = output<RecurrenceEditPayload>();

    /******************** Internal State Signals ********************/
    readonly localEvents = signal<SchedulerEvent[]>([]);
    readonly localSlots = signal<AppointmentSlot[]>([]);
    readonly selectedEventIds = signal<Set<string | number>>(new Set());

    readonly quickInfoState = signal<QuickInfoState>({ visible: false });
    readonly morePopoverState = signal<MorePopoverState>({ visible: false, events: [] });
    readonly eventPopoverState = signal<EventPopoverState>({ visible: false });
    readonly contextMenuState = signal<ContextMenuState>({ visible: false, x: 0, y: 0 });

    /******************** Computeds ********************/
    readonly currentView = computed(() => this.view());
    readonly currentDate = computed(() => toDate(this.date()));

    readonly headerTitle = computed(() => getViewTitle(this.currentView(), this.currentDate(), this.locale(), this.firstDayOfWeek()));

    readonly visibleRange = computed<DateRange>(() => {
        const v = this.currentView();
        const d = this.currentDate();
        const fdw = this.firstDayOfWeek();

        switch (v) {
            case 'day':
            case 'resourceDay':
            case 'dateDay':
                return { start: startOfDay(d), end: endOfDay(d) };
            case 'week':
            case 'resourceWeek':
            case 'dateWeek':
                return { start: startOfWeek(d, fdw), end: endOfWeek(d, fdw) };
            case 'year': {
                const s = new Date(d.getFullYear(), 0, 1);
                const e = new Date(d.getFullYear(), 11, 31, 23, 59, 59);
                return { start: s, end: e };
            }
            case 'timeline':
            case 'resourceTimeline': {
                const s = startOfWeek(d, fdw);
                return { start: s, end: addDays(s, 14) };
            }
            case 'month':
            case 'resourceMonth':
            case 'dateMonth':
            default: {
                const s = startOfWeek(new Date(d.getFullYear(), d.getMonth(), 1), fdw);
                const e = endOfWeek(new Date(d.getFullYear(), d.getMonth() + 1, 0), fdw);
                return { start: s, end: e };
            }
        }
    });

    readonly processedEvents = computed<ProcessedEvent[]>(() => {
        const rawEvents = [...this.events(), ...this.localEvents()];
        const range = this.visibleRange();
        const activeCats = this.activeCategoryIds();

        // 1. Expand recurring occurrences in visible window
        let expanded = expandRecurringEvents(rawEvents, range.start, range.end);

        // 2. Filter by active categories if any are active
        if (activeCats.length > 0) {
            expanded = expanded.filter((e) => {
                const catId = e.categoryId ?? (e as any)[this.categoryField()];
                return catId != null && activeCats.includes(catId);
            });
        }

        return expanded;
    });

    @HostBinding('style.height')
    get hostHeight(): string | null {
        const h = this.height();
        return typeof h === 'number' ? `${h}px` : h || null;
    }

    /******************** Navigation Methods ********************/
    next(): void {
        const v = this.currentView();
        const curr = this.currentDate();
        let nextDate: Date;

        switch (v) {
            case 'day':
            case 'resourceDay':
            case 'dateDay':
                nextDate = addDays(curr, 1);
                break;
            case 'week':
            case 'resourceWeek':
            case 'dateWeek':
                nextDate = addDays(curr, 7);
                break;
            case 'year':
                nextDate = addYears(curr, 1);
                break;
            case 'timeline':
            case 'resourceTimeline':
                nextDate = addDays(curr, 14);
                break;
            case 'month':
            case 'resourceMonth':
            case 'dateMonth':
            default:
                nextDate = addMonths(curr, 1);
                break;
        }

        this.date.set(nextDate);
    }

    prev(): void {
        const v = this.currentView();
        const curr = this.currentDate();
        let prevDate: Date;

        switch (v) {
            case 'day':
            case 'resourceDay':
            case 'dateDay':
                prevDate = addDays(curr, -1);
                break;
            case 'week':
            case 'resourceWeek':
            case 'dateWeek':
                prevDate = addDays(curr, -7);
                break;
            case 'year':
                prevDate = addYears(curr, -1);
                break;
            case 'timeline':
            case 'resourceTimeline':
                prevDate = addDays(curr, -14);
                break;
            case 'month':
            case 'resourceMonth':
            case 'dateMonth':
            default:
                prevDate = addMonths(curr, -1);
                break;
        }

        this.date.set(prevDate);
    }

    today(): void {
        const todayDate = new Date();
        this.date.set(todayDate);
    }

    gotoDate(target: Date): void {
        this.date.set(target);
    }

    changeView(newView: SchedulerViewType): void {
        this.view.set(newView);
    }

    /******************** Event CRUD ********************/
    addEvent(newEvent: SchedulerEvent): void {
        this.localEvents.update((list) => [...list, newEvent]);
        this.eventAdd.emit(newEvent);
    }

    updateEvent(updated: SchedulerEvent): void {
        this.localEvents.update((list) => list.map((e) => (e.id === updated.id ? updated : e)));
        this.eventChange.emit(updated);
    }

    removeEvent(id: string | number): void {
        this.localEvents.update((list) => list.filter((e) => e.id !== id));
        this.eventRemove.emit(id);
    }

    toggleCategory(categoryId: string | number): void {
        this.activeCategoryIds.update((cats) => {
            if (cats.includes(categoryId)) {
                return cats.filter((c) => c !== categoryId);
            }
            return [...cats, categoryId];
        });
    }

    /******************** Slot Booking & Availability ********************/
    bookSlot(slot: AppointmentSlot, date: Date, resourceId?: string | number): void {
        const updatedSlot: AppointmentSlot = {
            ...slot,
            status: 'booked',
            bookedCount: (slot.bookedCount || 0) + 1
        };
        this.localSlots.update((slots) => slots.map((s) => (s.id === slot.id ? updatedSlot : s)));
        this.slotBook.emit({ slot: updatedSlot, date, resourceId });
    }

    /******************** Overlays & Actions ********************/
    openMorePopover(targetDate: Date, events: ProcessedEvent[], targetEl: HTMLElement): void {
        this.morePopoverState.set({
            visible: true,
            date: targetDate,
            events,
            targetElement: targetEl
        });
        this.moreClick.emit({ date: targetDate, events });
    }

    hideMorePopover(): void {
        this.morePopoverState.set({ visible: false, events: [] });
    }

    showQuickInfo(event: SchedulerEvent, targetEl: HTMLElement, isNew = false): void {
        const state: QuickInfoState = {
            visible: true,
            event,
            date: toDate(event.start),
            allDay: event.allDay,
            resourceId: event.resourceId,
            targetElement: targetEl,
            isNew
        };
        this.quickInfoState.set(state);
        this.quickInfoShow.emit(state);
    }

    hideQuickInfo(): void {
        this.quickInfoState.set({ visible: false });
        this.quickInfoHide.emit();
    }

    showEventPopover(event: ProcessedEvent, targetEl: HTMLElement): void {
        this.eventPopoverState.set({
            visible: true,
            event,
            targetElement: targetEl
        });
    }

    hideEventPopover(): void {
        this.eventPopoverState.set({ visible: false });
    }

    showContextMenu(x: number, y: number, event?: SchedulerEvent, targetDate?: Date, resourceId?: string | number): void {
        this.contextMenuState.set({
            visible: true,
            x,
            y,
            event,
            date: targetDate,
            resourceId
        });
    }

    hideContextMenu(): void {
        this.contextMenuState.set({ visible: false, x: 0, y: 0 });
    }

    selectEvent(event: SchedulerEvent, multi = false): void {
        this.selectedEventIds.update((set) => {
            const next = new Set(multi ? set : []);
            if (next.has(event.id)) {
                next.delete(event.id);
            } else {
                next.add(event.id);
            }
            return next;
        });
    }

    clearSelection(): void {
        this.selectedEventIds.set(new Set());
    }

    deleteSelectedEvents(): void {
        const ids = this.selectedEventIds();
        if (ids.size === 0) return;
        this.localEvents.update((list) => list.filter((e) => !ids.has(e.id)));
        this.bulkUpdate.emit({
            eventIds: Array.from(ids),
            action: 'delete'
        });
        this.clearSelection();
    }

    /******************** Export & Import Subsystems ********************/
    exportToIcs(): string {
        const events = this.processedEvents();
        const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
        const formatIcsDate = (d: Date) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

        let ics = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//SparkNG//Scheduler//EN\r\nCALSCALE:GREGORIAN\r\n';
        for (const ev of events) {
            ics += 'BEGIN:VEVENT\r\n';
            ics += `UID:${ev.id}@sparkng\r\n`;
            ics += `SUMMARY:${ev.title.replace(/\n/g, ' ')}\r\n`;
            ics += `DTSTART:${formatIcsDate(ev.startDate)}\r\n`;
            ics += `DTEND:${formatIcsDate(ev.endDate)}\r\n`;
            if (ev.description) ics += `DESCRIPTION:${ev.description.replace(/\n/g, '\\n')}\r\n`;
            if (ev.location) ics += `LOCATION:${ev.location.replace(/\n/g, ' ')}\r\n`;
            if (ev.rrule) ics += `RRULE:${ev.rrule}\r\n`;
            ics += 'END:VEVENT\r\n';
        }
        ics += 'END:VCALENDAR\r\n';
        return ics;
    }

    exportToJson(): string {
        const events = [...this.events(), ...this.localEvents()];
        return JSON.stringify(events, null, 2);
    }

    importEvents(imported: SchedulerEvent[]): void {
        this.localEvents.update((existing) => [...existing, ...imported]);
    }
}
