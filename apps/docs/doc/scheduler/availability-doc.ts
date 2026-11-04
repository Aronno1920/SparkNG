import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import { SchedulerModule } from '@bdspark/sparkng/scheduler';
import type { AppointmentSlot, BlockedInterval, SchedulerEvent, SlotBookPayload } from '@bdspark/sparkng/types/scheduler';

@Component({
    selector: 'availability-doc',
    standalone: true,
    imports: [AppDocSectionText, SchedulerModule, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                Manage schedule constraints with availability rules: <strong>Business Hours</strong> (highlighting operational windows), <strong>Working Days</strong> (dimming weekends or days off with hatched patterns),
                <strong>Blocked Intervals</strong> (locking out reservations with lock badges), and <strong>Appointment Slots</strong> (interactive bookable slots with capacity indicators).
            </p>
        </app-docsectiontext>
        <div class="card">
            @if (bookingMessage()) {
                <div class="p-3 mb-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-medium">
                    {{ bookingMessage() }}
                </div>
            }

            <p-scheduler-root [events]="events()" [businessHours]="businessHours" [workingDays]="workingDays" [blockedIntervals]="blockedIntervals()" [appointmentSlots]="appointmentSlots()" [view]="'week'" (slotBook)="onSlotBook($event)">
                <p-scheduler-header>
                    <p-scheduler-navigation></p-scheduler-navigation>
                    <p-scheduler-title></p-scheduler-title>
                    <p-scheduler-view-selector></p-scheduler-view-selector>
                </p-scheduler-header>
                <p-scheduler-content>
                    <p-scheduler-week></p-scheduler-week>
                    <p-scheduler-day></p-scheduler-day>
                    <p-scheduler-month></p-scheduler-month>
                </p-scheduler-content>
                <p-scheduler-quick-info></p-scheduler-quick-info>
            </p-scheduler-root>
        </div>
        <app-code [code]="code"></app-code>
    `
})
export class AvailabilityDoc {
    readonly now = new Date();
    readonly y = this.now.getFullYear();
    readonly m = this.now.getMonth();
    readonly d = this.now.getDate();

    bookingMessage = signal<string | null>(null);

    businessHours = {
        daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
        startTime: '09:00',
        endTime: '17:00'
    };

    workingDays = [1, 2, 3, 4, 5];

    events = signal<SchedulerEvent[]>([
        {
            id: 501,
            title: 'Consultation Session',
            start: new Date(this.y, this.m, this.d, 10, 0),
            end: new Date(this.y, this.m, this.d, 11, 0),
            color: '#3b82f6'
        }
    ]);

    blockedIntervals = signal<BlockedInterval[]>([
        {
            id: 'block-1',
            start: new Date(this.y, this.m, this.d, 12, 0),
            end: new Date(this.y, this.m, this.d, 13, 0),
            title: 'Lunch Break & Maintenance'
        },
        {
            id: 'block-2',
            start: new Date(this.y, this.m, this.d + 1, 15, 0),
            end: new Date(this.y, this.m, this.d + 1, 17, 0),
            title: 'Facility Sanitization'
        }
    ]);

    appointmentSlots = signal<AppointmentSlot[]>([
        {
            id: 'slot-1',
            start: new Date(this.y, this.m, this.d, 14, 0),
            end: new Date(this.y, this.m, this.d, 15, 0),
            status: 'available',
            title: 'Free Strategy Call',
            price: 'Free'
        },
        {
            id: 'slot-2',
            start: new Date(this.y, this.m, this.d + 1, 10, 0),
            end: new Date(this.y, this.m, this.d + 1, 11, 0),
            status: 'available',
            title: '1-on-1 Architecture Review',
            price: 150
        }
    ]);

    onSlotBook(payload: SlotBookPayload): void {
        this.bookingMessage.set(`Successfully booked "${payload.slot.title}" on ${payload.date.toLocaleDateString()}!`);
        setTimeout(() => this.bookingMessage.set(null), 5000);
    }

    code = {
        typescript: `import { Component, signal } from '@angular/core';
import { SchedulerModule } from '@bdspark/sparkng/scheduler';
import type { AppointmentSlot, BlockedInterval, SlotBookPayload } from '@bdspark/sparkng/types/scheduler';

@Component({
    standalone: true,
    imports: [SchedulerModule],
    template: \`
        <p-scheduler-root
            [businessHours]="businessHours"
            [workingDays]="workingDays"
            [blockedIntervals]="blockedIntervals()"
            [appointmentSlots]="appointmentSlots()"
            [view]="'week'"
            (slotBook)="onSlotBook($event)"
        >
            <p-scheduler-header>
                <p-scheduler-navigation></p-scheduler-navigation>
                <p-scheduler-title></p-scheduler-title>
                <p-scheduler-view-selector></p-scheduler-view-selector>
            </p-scheduler-header>
            <p-scheduler-content>
                <p-scheduler-week></p-scheduler-week>
                <p-scheduler-day></p-scheduler-day>
            </p-scheduler-content>
        </p-scheduler-root>
    \`
})
export class AvailabilitySchedulerDemo {
    businessHours = { daysOfWeek: [1,2,3,4,5], startTime: '09:00', endTime: '17:00' };
    workingDays = [1, 2, 3, 4, 5];

    blockedIntervals = signal<BlockedInterval[]>([
        { start: new Date(...), end: new Date(...), title: 'Lunch Break' }
    ]);

    appointmentSlots = signal<AppointmentSlot[]>([
        { id: '1', start: new Date(...), end: new Date(...), status: 'available', title: 'Consultation', price: 150 }
    ]);

    onSlotBook(e: SlotBookPayload): void {}
}`
    };
}
