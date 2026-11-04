/**
 * @file
 * Core Type Definitions for Scheduler
 */

export type SchedulerViewType = 'month' | 'week' | 'day' | 'agenda' | 'year' | 'timeline' | 'resourceTimeline' | 'resourceDay' | 'resourceWeek' | 'resourceMonth' | 'dateDay' | 'dateWeek' | 'dateMonth';

export type DensityMode = 'minimal' | 'compact' | 'standard' | 'comfortable';

export type SelectionMode = 'single' | 'multiple' | 'range' | 'checkbox';

export interface RRuleOptions {
    freq: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
    interval?: number;
    count?: number;
    until?: Date | string;
    byweekday?: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

export interface BusinessHours {
    daysOfWeek?: number[]; // [0..6], default [1, 2, 3, 4, 5] (Mon-Fri)
    startTime?: string; // '09:00' or '09:00:00'
    endTime?: string; // '17:00' or '17:00:00'
    resourceId?: string | number;
}

export interface SchedulerResource {
    id: string | number;
    title: string;
    color?: string;
    eventColor?: string;
    eventBackgroundColor?: string;
    eventBorderColor?: string;
    eventTextColor?: string;
    avatar?: string;
    order?: number;
    parentId?: string | number;
    children?: SchedulerResource[];
    isExpanded?: boolean;
    businessHours?: BusinessHours | BusinessHours[];
    metadata?: Record<string, any>;
}

export interface SchedulerEvent {
    id: string | number;
    title: string;
    start: Date | string;
    end?: Date | string;
    allDay?: boolean;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    classNames?: string | string[];
    categoryId?: string | number;
    resourceId?: string | number;
    resourceIds?: (string | number)[];
    description?: string;
    location?: string;
    rrule?: string;
    exdate?: (Date | string)[];
    editable?: boolean;
    durationEditable?: boolean;
    startEditable?: boolean;
    resizable?: boolean;
    deletable?: boolean;
    extendedProps?: Record<string, any>;
    metadata?: Record<string, any>;
}

export interface EventCategory {
    id: string | number;
    name: string;
    color: string;
    textColor?: string;
}

export interface BlockedInterval {
    id?: string | number;
    start: Date | string;
    end: Date | string;
    resourceId?: string | number;
    title?: string;
    reason?: string;
}

export interface AppointmentSlot {
    id: string | number;
    start: Date | string;
    end: Date | string;
    resourceId?: string | number;
    status: 'available' | 'booked' | 'blocked' | 'tentative';
    capacity?: number;
    bookedCount?: number;
    price?: number | string;
    title?: string;
}

export interface DateRange {
    start: Date;
    end: Date;
}

export interface ProcessedEvent extends SchedulerEvent {
    startDate: Date;
    endDate: Date;
    isRecurring?: boolean;
    originalEvent?: SchedulerEvent;
    // Layout calculation fields
    colIndex?: number;
    totalCols?: number;
    topPercent?: number;
    heightPercent?: number;
    leftPercent?: number;
    widthPercent?: number;
    isSpanning?: boolean;
    isSpanningStart?: boolean;
    isSpanningEnd?: boolean;
}

export interface EventDropPayload {
    event: SchedulerEvent;
    oldEvent: SchedulerEvent;
    deltaMinutes: number;
    newStart: Date;
    newEnd: Date;
    newResourceId?: string | number;
    revert: () => void;
}

export interface EventResizePayload {
    event: SchedulerEvent;
    oldEvent: SchedulerEvent;
    deltaMinutes: number;
    newStart: Date;
    newEnd: Date;
    revert: () => void;
}

export interface DateClickPayload {
    date: Date;
    allDay: boolean;
    resourceId?: string | number;
    jsEvent: MouseEvent;
}

export interface DateSelectPayload {
    start: Date;
    end: Date;
    allDay: boolean;
    resourceId?: string | number;
    jsEvent?: MouseEvent;
}

export interface EventClickPayload {
    event: SchedulerEvent;
    jsEvent: MouseEvent;
}

export interface QuickInfoState {
    visible: boolean;
    event?: SchedulerEvent;
    date?: Date;
    allDay?: boolean;
    resourceId?: string | number;
    targetElement?: HTMLElement;
    isNew?: boolean;
}

export interface MorePopoverState {
    visible: boolean;
    date?: Date;
    events: ProcessedEvent[];
    targetElement?: HTMLElement;
}

export interface EventPopoverState {
    visible: boolean;
    event?: ProcessedEvent;
    targetElement?: HTMLElement;
}

export interface ContextMenuState {
    visible: boolean;
    event?: SchedulerEvent;
    date?: Date;
    resourceId?: string | number;
    x: number;
    y: number;
}

export interface SlotBookPayload {
    slot: AppointmentSlot;
    date: Date;
    resourceId?: string | number;
}

export interface BulkEventsPayload {
    eventIds: (string | number)[];
    action: 'delete' | 'move' | 'category';
    targetDate?: Date;
    targetCategoryId?: string | number;
    targetResourceId?: string | number;
}

export interface RecurrenceEditPayload {
    mode: 'occurrence' | 'series';
    event: SchedulerEvent;
}
