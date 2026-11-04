/**
 * @file
 * Overlay Components: Quick Info, More Popover, Event Popover, and Context Menu
 */

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { injectSchedulerRoot, SCHEDULER_MORE_POPOVER_CONTEXT_TOKEN, SCHEDULER_QUICK_INFO_CONTEXT_TOKEN } from '../../context/scheduler.context';
import { formatDate, formatTime } from '../../engine/date-utils';
import type { ProcessedEvent, SchedulerEvent } from '../../types/scheduler.types';

/* =========================================================================
 * 1. Quick Info Overlay: <p-scheduler-quick-info>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-quick-info',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        @if (state().visible && state().event) {
            <div class="p-scheduler-overlay-backdrop" (click)="root.hideQuickInfo()"></div>
            <div class="p-scheduler-quick-info-dialog" role="dialog" aria-modal="true" aria-label="Event Details">
                <div class="p-scheduler-quick-info-header">
                    <span class="p-scheduler-quick-info-color-bar" [style.backgroundColor]="state().event?.color || 'var(--p-primary-500, #3b82f6)'"></span>
                    <h3 class="p-scheduler-quick-info-title">{{ state().event?.title }}</h3>
                    <button type="button" class="p-scheduler-btn-close" (click)="root.hideQuickInfo()" aria-label="Close">✕</button>
                </div>

                <div class="p-scheduler-quick-info-body">
                    <div class="p-scheduler-quick-info-row">
                        <span class="p-scheduler-meta-icon">🕒</span>
                        <span>{{ formatEventDate(state().event!) }}</span>
                    </div>

                    @if (state().event?.location) {
                        <div class="p-scheduler-quick-info-row">
                            <span class="p-scheduler-meta-icon">📍</span>
                            <span>{{ state().event?.location }}</span>
                        </div>
                    }

                    @if (state().event?.description) {
                        <div class="p-scheduler-quick-info-desc">
                            {{ state().event?.description }}
                        </div>
                    }

                    <ng-content></ng-content>
                </div>

                <div class="p-scheduler-quick-info-footer">
                    <button type="button" class="p-scheduler-btn p-scheduler-btn-danger" (click)="onDelete()">Delete</button>
                    <button type="button" class="p-scheduler-btn p-scheduler-btn-primary" (click)="root.hideQuickInfo()">Close</button>
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: SCHEDULER_QUICK_INFO_CONTEXT_TOKEN,
            useFactory: () => injectSchedulerRoot().quickInfoState
        }
    ],
    host: {
        class: 'p-scheduler-quick-info-host',
        '[attr.data-slot]': '"scheduler-quick-info"'
    }
})
export class SchedulerQuickInfo {
    readonly root = injectSchedulerRoot();
    readonly state = this.root.quickInfoState;

    formatEventDate(event: SchedulerEvent): string {
        const s = new Date(event.start);
        const e = event.end ? new Date(event.end) : s;
        const dateStr = formatDate(s, this.root.locale());
        if (event.allDay) return `${dateStr} (All Day)`;
        return `${dateStr}, ${formatTime(s, this.root.locale())} – ${formatTime(e, this.root.locale())}`;
    }

    onDelete(): void {
        const evt = this.state().event;
        if (evt) {
            this.root.removeEvent(evt.id);
            this.root.hideQuickInfo();
        }
    }
}

/* =========================================================================
 * 2. More Popover: <p-scheduler-more-popover>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-more-popover',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (state().visible) {
            <div class="p-scheduler-overlay-backdrop" (click)="root.hideMorePopover()"></div>
            <div class="p-scheduler-more-popover-card" role="dialog" aria-modal="true">
                <div class="p-scheduler-more-header">
                    <span class="p-scheduler-more-date">{{ formattedDate() }}</span>
                    <button type="button" class="p-scheduler-btn-close" (click)="root.hideMorePopover()">✕</button>
                </div>

                <div class="p-scheduler-more-event-list">
                    @for (event of state().events; track event.id) {
                        <div class="p-scheduler-event-pill" [style.backgroundColor]="event.color || 'var(--p-primary-500, #3b82f6)'" [style.color]="event.textColor || '#fff'" (click)="onEventClick(event, $event)">
                            <span class="p-scheduler-event-pill-time">{{ formatTime(event.startDate) }}</span>
                            <span class="p-scheduler-event-pill-title">{{ event.title }}</span>
                        </div>
                    }
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: SCHEDULER_MORE_POPOVER_CONTEXT_TOKEN,
            useFactory: () => injectSchedulerRoot().morePopoverState
        }
    ],
    host: {
        class: 'p-scheduler-more-popover-host',
        '[attr.data-slot]': '"scheduler-more-popover"'
    }
})
export class SchedulerMorePopover {
    readonly root = injectSchedulerRoot();
    readonly state = this.root.morePopoverState;

    readonly formattedDate = computed(() => {
        const d = this.state().date;
        if (!d) return '';
        return formatDate(d, this.root.locale(), { weekday: 'short', month: 'short', day: 'numeric' });
    });

    formatTime(d: Date): string {
        return formatTime(d, this.root.locale());
    }

    onEventClick(event: ProcessedEvent, jsEvent: MouseEvent): void {
        jsEvent.stopPropagation();
        this.root.hideMorePopover();
        this.root.eventClick.emit({ event, jsEvent });
        if (this.root.quickInfo()) {
            this.root.showQuickInfo(event, jsEvent.currentTarget as HTMLElement);
        }
    }
}

/* =========================================================================
 * 3. Popover: <p-scheduler-popover>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-popover',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (state().visible && state().event) {
            <div class="p-scheduler-popover-card">
                <div class="p-scheduler-popover-title">{{ state().event?.title }}</div>
                <div class="p-scheduler-popover-body">
                    <ng-content></ng-content>
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-popover-host',
        '[attr.data-slot]': '"scheduler-popover"'
    }
})
export class SchedulerPopover {
    readonly root = injectSchedulerRoot();
    readonly state = this.root.eventPopoverState;
}

/* =========================================================================
 * 4. Context Menu: <p-scheduler-context-menu>
 * ========================================================================= */
@Component({
    selector: 'p-scheduler-context-menu',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (state().visible) {
            <div class="p-scheduler-overlay-backdrop transparent" (click)="root.hideContextMenu()"></div>
            <div class="p-scheduler-context-menu-panel" [style.top.px]="state().y" [style.left.px]="state().x">
                <div class="p-scheduler-context-menu-list">
                    <ng-content></ng-content>
                    @if (state().event) {
                        <button type="button" class="p-scheduler-menu-item" (click)="onEditEvent()"><span>✏️</span> <span>Edit Event</span></button>
                        <button type="button" class="p-scheduler-menu-item" (click)="onDuplicateEvent()"><span>📋</span> <span>Duplicate</span></button>
                        <button type="button" class="p-scheduler-menu-item p-scheduler-menu-item-danger" (click)="onDeleteEvent()"><span>🗑️</span> <span>Delete</span></button>
                    } @else {
                        <button type="button" class="p-scheduler-menu-item" (click)="onAddEvent()"><span>➕</span> <span>New Event Here</span></button>
                    }
                </div>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-scheduler-context-menu-host',
        '[attr.data-slot]': '"scheduler-context-menu"'
    }
})
export class SchedulerContextMenu {
    readonly root = injectSchedulerRoot();
    readonly state = this.root.contextMenuState;

    onEditEvent(): void {
        const ev = this.state().event;
        this.root.hideContextMenu();
        if (ev) {
            this.root.showQuickInfo(ev, this.root.hostElement);
        }
    }

    onDuplicateEvent(): void {
        const ev = this.state().event;
        this.root.hideContextMenu();
        if (ev) {
            const copy: SchedulerEvent = {
                ...ev,
                id: Date.now().toString(),
                title: `${ev.title} (Copy)`
            };
            this.root.addEvent(copy);
        }
    }

    onDeleteEvent(): void {
        const ev = this.state().event;
        this.root.hideContextMenu();
        if (ev) {
            this.root.removeEvent(ev.id);
        }
    }

    onAddEvent(): void {
        const d = this.state().date || new Date();
        const resId = this.state().resourceId;
        this.root.hideContextMenu();
        const newEv: SchedulerEvent = {
            id: Date.now().toString(),
            title: 'New Event',
            start: d,
            end: new Date(d.getTime() + 3600000),
            resourceId: resId
        };
        this.root.addEvent(newEv);
        this.root.showQuickInfo(newEv, this.root.hostElement, true);
    }
}
