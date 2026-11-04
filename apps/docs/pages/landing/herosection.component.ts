import { AppConfigService } from '@/service/appconfigservice';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem, SelectItem } from '@bdspark/sparkng/api';
import { AvatarModule } from '@bdspark/sparkng/avatar';
import { BadgeModule } from '@bdspark/sparkng/badge';
import { ButtonModule } from '@bdspark/sparkng/button';
import { ChartModule } from '@bdspark/sparkng/chart';
import { DividerModule } from '@bdspark/sparkng/divider';
import { DrawerModule } from '@bdspark/sparkng/drawer';
import { KnobModule } from '@bdspark/sparkng/knob';
import { OverlayBadgeModule } from '@bdspark/sparkng/overlaybadge';
import { SelectButton } from '@bdspark/sparkng/selectbutton';
import { TagModule } from '@bdspark/sparkng/tag';
import { ToggleSwitchModule } from '@bdspark/sparkng/toggleswitch';
import { TooltipModule } from '@bdspark/sparkng/tooltip';
import { Subscription } from 'rxjs';
import { CardsApp } from './samples/cardsapp.component';
import { ChatApp } from './samples/chatapp.component';
import { CustomersApp } from './samples/customersapp.component';
import { InboxApp } from './samples/inboxapp.component';
import { MoviesApp } from './samples/moviesapp.component';
import { OverviewApp } from './samples/overviewapp.component';

@Component({
    selector: 'hero-section',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ChartModule,
        SelectButton,
        TagModule,
        ToggleSwitchModule,
        BadgeModule,
        FormsModule,
        DividerModule,
        AvatarModule,
        TooltipModule,
        OverviewApp,
        ChatApp,
        InboxApp,
        CardsApp,
        MoviesApp,
        CustomersApp,
        DrawerModule,
        OverlayBadgeModule,
        KnobModule,
        ButtonModule
    ],
    template: `
        <section class="landing-hero py-20 px-8 lg:px-20">
            <div class="flex flex-col items-center">
                <h1 class="text-5xl font-bold text-center xl:text-left leading-tight">The Open Source UI Suite for <span class="font-bold text-primary">Angular</span></h1>
                <p class="text-center mt-0 mb-8 text-surface-500 dark:text-surface-400 font-medium text-xl leading-relaxed lg:px-56">
                    80+ accessible, customizable Angular components under the MIT license. A community-maintained continuation of SparkNG v22, built to stay open.
                </p>
                <div class="flex flex-col items-center gap-4 mt-6">
                    <a routerLink="/installation" class="linkbox linkbox-primary">
                        <span>Get Started</span>
                        <i class="pi pi-arrow-right ms-4"></i>
                    </a>
                    <div class="flex items-center gap-3 bg-surface-100 dark:bg-surface-800 border border-black/10 dark:border-white/10 rounded-full py-2 pl-5 pr-2">
                        <code class="font-mono text-sm text-surface-700 dark:text-surface-300">{{ installCommand }}</code>
                        <p-button
                            [icon]="commandCopied ? 'pi pi-check' : 'pi pi-copy'"
                            (onClick)="copyInstallCommand()"
                            [pTooltip]="commandCopied ? 'Copied!' : 'Copy to Clipboard'"
                            tooltipPosition="bottom"
                            aria-label="Copy install command"
                            text
                            rounded
                            severity="secondary"
                            styleClass="w-8 h-8"
                        />
                    </div>
                </div>
                <div class="w-full flex lg:hidden items-center justify-center mt-16 mb-4">
                    <p-selectbutton [(ngModel)]="selectedSampleOption" [options]="sampleOptions" optionLabel="title" styleClass="dark:border dark:border-white/20">
                        <ng-template let-item pTemplate="item">
                            <i [class]="item.icon"></i>
                            <div class="hidden sm:flex flex-1 text-sm font-medium leading-5">{{ item.title }}</div>
                        </ng-template>
                    </p-selectbutton>
                </div>
                <div class="bg-surface-0 border border-black/10 dark:border-white/20 dark:bg-surface-950 w-full rounded-3xl p-0 flex lg:hidden items-start gap-6 overflow-hidden">
                    <ng-container *ngFor="let sampleOption of sampleOptions">
                        <img *ngIf="selectedSampleOption.title === sampleOption.title" [src]="sampleOption.src + (isDarkMode ? '-dark.jpg' : '.jpg')" class="w-full" />
                    </ng-container>
                </div>
                <div class="bg-surface-0 border border-black/10 dark:border-white/20 dark:bg-surface-950 w-full h-[85vh] max-h-[1040px] rounded-3xl p-6 hidden lg:flex lg:mt-20 items-start gap-6 overflow-hidden">
                    <div
                        [ngClass]="{
                            'w-auto': isSlimMenu,
                            'w-72': !isSlimMenu
                        }"
                        class="rounded-2xl p-5 bg-surface-50 dark:bg-surface-900 h-full flex flex-col justify-between"
                    >
                        <div
                            [ngClass]="{
                                'w-12 flex flex-col items-center': isSlimMenu,
                                'w-auto': !isSlimMenu
                            }"
                        >
                            <div class="flex items-center gap-3">
                                <div
                                    [ngClass]="{
                                        hidden: isSlimMenu,
                                        block: !isSlimMenu
                                    }"
                                    class="text-surface-950 dark:text-surface-0 font-medium text-3xl"
                                >
                                    Spark
                                </div>
                            </div>
                            <div class="mt-10 flex flex-col gap-2">
                                <div
                                    *ngFor="let navItem of sampleAppsSidebarNavs"
                                    [pTooltip]="isSlimMenu ? navItem.title : null"
                                    (click)="setSelectedSampleAppsSidebarNav(navItem.title)"
                                    class="px-4 py-1 flex items-center gap-1 cursor-pointer text-base rounded-lg transition-all select-none"
                                    [ngClass]="{
                                        'w-12 justify-center py-4': isSlimMenu,
                                        'w-full': !isSlimMenu,
                                        'text-muted-color hover:bg-emphasis bg-transparent': selectedSampleAppsSidebarNav !== navItem.title,
                                        'text-primary-contrast bg-primary hover:bg-primary-emphasis': selectedSampleAppsSidebarNav === navItem.title
                                    }"
                                >
                                    <i [class]="navItem.icon"></i>
                                    <span
                                        [ngClass]="{
                                            hidden: isSlimMenu,
                                            'font-medium leading-8': !isSlimMenu
                                        }"
                                        >・</span
                                    >
                                    <span
                                        [ngClass]="{
                                            hidden: isSlimMenu,
                                            'font-medium leading-none': !isSlimMenu
                                        }"
                                        >{{ navItem.title }}</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div
                            [ngClass]="{
                                'w-12 flex flex-col items-center': isSlimMenu,
                                'w-auto': !isSlimMenu
                            }"
                        >
                            <div class="mt-10 flex flex-col gap-2">
                                <div
                                    *ngIf="false"
                                    [pTooltip]="isSlimMenu ? 'Expanded Mode' : null"
                                    class="px-4 py-1 flex items-center gap-1 cursor-pointer text-base rounded-lg transition-all select-none text-muted-color hover:bg-emphasis"
                                    [ngClass]="{
                                        'w-12 justify-center py-4': isSlimMenu,
                                        'w-full': !isSlimMenu
                                    }"
                                >
                                    <a class="cursor-pointer block p-0 m-0 leading-none">
                                        <a class="cursor-pointer block p-0 m-0 leading-none">
                                            <i [class]="isSlimMenu ? 'pi pi-window-maximize' : 'pi pi-window-minimize'"></i>
                                            <span [class]="isSlimMenu ? 'hidden' : 'font-medium leading-8'">・</span>
                                            <span [class]="isSlimMenu ? 'hidden' : 'font-medium leading-none'"> Slim Mode</span>
                                        </a>
                                    </a>
                                </div>
                                <div
                                    *ngFor="let navItem of sampleAppsSidebarNavsMore"
                                    [pTooltip]="isSlimMenu ? navItem.title : null"
                                    (click)="dashboardSidebarVisible = true"
                                    class="px-4 py-1 flex items-center gap-1 cursor-pointer text-base rounded-lg transition-all select-none"
                                    [ngClass]="{
                                        'w-12 justify-center py-4': isSlimMenu,
                                        'w-full': !isSlimMenu,
                                        'text-muted-color hover:bg-emphasis bg-transparent': selectedSampleAppsSidebarNav !== navItem.title,
                                        'text-primary-contrast bg-primary hover:bg-primary-emphasis': selectedSampleAppsSidebarNav === navItem.title
                                    }"
                                >
                                    <i [class]="navItem.icon"></i>
                                    <span [class]="isSlimMenu ? 'hidden' : 'font-medium leading-8'">・</span>
                                    <span [class]="isSlimMenu ? 'hidden' : 'font-medium leading-none'">{{ navItem.title }}</span>
                                </div>
                            </div>
                            <p-divider />
                            <div [class]="isSlimMenu ? 'justify-center' : ' gap-3'" class="flex items-center">
                                <p-avatar image="/demo/landing/apps/main-avatar.png" size="large" shape="circle" class="shrink-0" />
                                <div>
                                    <div [class]="isSlimMenu ? 'hidden' : 'text-base font-medium text-color leading-5'">Robin Jonas</div>
                                    <div [class]="isSlimMenu ? 'hidden' : 'text-sm text-muted-color mt-1'">hi&#64;robin.xyz</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <overview-app *ngIf="selectedSampleAppsSidebarNav === 'Overview'" />
                    <chat-app *ngIf="selectedSampleAppsSidebarNav === 'Chat'" />
                    <inbox-app *ngIf="selectedSampleAppsSidebarNav === 'Inbox'" />
                    <cards-app *ngIf="selectedSampleAppsSidebarNav === 'Cards'" />
                    <movies-app *ngIf="selectedSampleAppsSidebarNav === 'Movies'" />
                    <customers-app *ngIf="selectedSampleAppsSidebarNav === 'Customers'" />
                </div>
            </div>
            <p-drawer [(visible)]="dashboardSidebarVisible" position="right" closeIcon="pi pi-sign-out" styleClass="!max-w-2xl !w-full !h-screen rounded-l-2xl">
                <ng-template #headless>
                    <div class="flex flex-col h-screen overflow-auto">
                        <div class="">
                            <div class="flex align-items-center gap-3 p-6">
                                <p-avatar image="/demo/landing/apps/avatar11.jpg" size="large" class="rounded-xl overflow-hidden" />
                                <div class="flex-1">
                                    <div class="leading-6 text-color font-medium">Brook Simmons</div>
                                    <div class="mt-1 leading-5 text-muted-color text-sm">Sales Executive</div>
                                </div>
                                <p-button (onClick)="dashboardSidebarVisible = false" icon="pi pi-sign-out" text rounded severity="secondary" />
                            </div>
                            <p-selectbutton [(ngModel)]="selectedSidebarOption" [options]="sidebarOptions" class="w-full px-6 py-3" styleClass="flex-1 w-full py-2.5">
                                <ng-template pTemplate="item" let-item>
                                    <span class="text-sm">{{ item }}</span>
                                </ng-template>
                            </p-selectbutton>
                        </div>
                        <div *ngIf="selectedSidebarOption === 'Interaction Logs'" class="h-[calc(100%-172px)] flex flex-col gap-4 p-6">
                            <div class="h-1/3 flex flex-col p-3 rounded-xl bg-emphasis">
                                <div class="flex items-start justify-between">
                                    <div class="leading-6 font-medium text-color">Call Logs</div>
                                    <p-button icon="pi pi-download text-sm" styleClass="w-8 h-8 !border-surface !bg-surface-0 dark:!bg-surface-900 hover:opacity-75 transition-all" severity="secondary" text />
                                </div>
                                <div class="overflow-y-auto flex-1 bg-surface-0 dark:bg-surface-900 mt-2 flex flex-col rounded-lg overflow-hidden divide-y divide-surface-200 dark:divide-surface-800">
                                    <div *ngFor="let data of callLogs" class="flex items-center gap-3 p-2">
                                        <p-overlayBadge severity="success" styleClass="w-fit">
                                            <p-avatar [image]="data.image" size="normal" styleClass="rounded-md w-10 h-10 overflow-hidden flex" />
                                        </p-overlayBadge>

                                        <div class="flex-1">
                                            <div class="text-sm leading-5 font-medium text-color">{{ data.name }}</div>
                                            <div class="mt-1 text-sm leading-5 text-muted-color">{{ data.time }}</div>
                                        </div>
                                        <p-button icon="pi pi-phone text-sm" text styleClass="bg-primary/10 dark:bg-primary/20 w-8 h-8" />
                                    </div>
                                </div>
                            </div>
                            <div class="h-1/3 flex flex-col p-3 rounded-xl bg-emphasis">
                                <div class="flex items-start justify-between">
                                    <div class="leading-6 font-medium text-color">Email Records</div>
                                    <p-button icon="pi pi-download text-sm" styleClass="w-8 h-8 !border-surface !bg-surface-0 dark:!bg-surface-900 hover:opacity-75 transition-all" severity="secondary" text />
                                </div>
                                <div class="overflow-y-auto flex-1 bg-surface-0 dark:bg-surface-900 mt-2 flex flex-col rounded-lg overflow-hidden divide-y divide-surface-200 dark:divide-surface-800">
                                    <div *ngFor="let data of emailRecords" class="flex items-center gap-3 p-2">
                                        <p-overlayBadge severity="danger" styleClass="w-fit">
                                            <p-avatar [image]="data.image" size="normal" styleClass="rounded-md overflow-hidden w-10 h-10 flex" />
                                        </p-overlayBadge>

                                        <div class="w-1/5 text-sm leading-5 font-medium text-color">{{ data.name }}</div>
                                        <div class="flex-1">
                                            <div class="text-sm leading-5 font-medium text-color line-clamp-2">
                                                {{ data.title }}
                                                <span class="text-muted-color">
                                                    {{ data.text }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="w-1/6 text-sm leading-5 text-muted-color text-right">
                                            {{ data.time }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="h-1/3 flex flex-col p-3 rounded-xl bg-emphasis">
                                <div class="flex items-start justify-between">
                                    <div class="leading-6 font-medium text-color">Meeting Notes</div>
                                    <p-button icon="pi pi-download text-sm" styleClass="w-8 h-8 !border-surface !bg-surface-0 dark:!bg-surface-900 hover:opacity-75 transition-all leading-none" severity="secondary" text />
                                </div>
                                <div class="overflow-y-auto flex-1 bg-surface-0 dark:bg-surface-900 mt-2 p-4 flex flex-col rounded-lg overflow-hidden">
                                    <div class="flex items-start justify-between gap-1">
                                        <div class="text-sm text-color font-medium max-w-60">Subject: Meeting Wrap-up & Action Items: Jacob Jones</div>
                                        <div class="text-sm text-muted-color">February 14, 2024 / 2:00 PM</div>
                                    </div>
                                    <div class="text-sm text-muted-color mt-6">
                                        Here's a quick review of our meeting with Brook Simmons and next steps. Summary:
                                        <br />
                                        <br />
                                        <ul class="list-disc pl-5">
                                            <li>Reviewed our SaaS solution and its features.</li>
                                            <li>Arlene McCoy intrigued by user experience potential.</li>
                                            <li>Voiced concerns on integration with current system.Action Items:</li>
                                        </ul>
                                        <br />
                                        Demo: Schedule product demo with Arlene McCoy. (Assigned to: Jerome Bell)<br /><br />
                                        Integration Blueprint: Draft and deliver technical blueprint. (Assigned to: Cameron Williamson)<br /><br />
                                        Follow-up Meeting: Arrange to discuss any queries post-demo. (Assigned to: Dianne Russell)
                                        <br /><br />
                                        Please act on these items promptly.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div *ngIf="selectedSidebarOption === 'Preferences'" class="h-[calc(100%-72px)] flex flex-col gap-4 p-6">
                            <div *ngFor="let data of preferences" class="h-1/4 flex flex-col p-3 rounded-xl bg-emphasis">
                                <div class="leading-6 font-medium text-color p-2">{{ data.title }}</div>
                                <div class="overflow-y-auto flex-1 bg-surface-0 dark:bg-surface-900 mt-2 p-4 flex flex-col gap-3 rounded-lg">
                                    <div *ngFor="let pref of data.prefs" class="flex items-center gap-2">
                                        <i class="text-lg text-color" [class]="pref.icon"></i>
                                        <div class="font-medium text-color flex-1">{{ pref.title }}</div>
                                        <p-toggleswitch [(ngModel)]="pref.checked" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div *ngIf="selectedSidebarOption === 'Opportunities'" class="grid grid-cols-2 gap-6 p-6">
                            <div *ngFor="let data of opportunities" class="flex flex-col p-3 rounded-xl bg-emphasis">
                                <div class="flex items-start justify-between gap-2">
                                    <div class="font-medium text-color mt-0.5">{{ data.title }}</div>
                                    <p-tag [value]="data.stage" [severity]="data.severity" />
                                </div>
                                <div class="w-full rounded-lg mt-2 p-4 bg-surface-0 dark:bg-surface-900 flex items-baseline gap-2">
                                    <span class="text-2xl font-semibold text-color">{{ data.value }}</span>
                                    <span class="text-xs text-muted-color">{{ data.owner }}</span>
                                </div>
                                <div class="flex-1 mt-2 p-2 rounded-lg bg-surface-0 dark:bg-surface-900 text-xs text-color">
                                    {{ data.text }}
                                </div>
                            </div>
                        </div>
                        <div *ngIf="selectedSidebarOption === 'Statistics'" class="h-[calc(100%-160px)] p-6">
                            <div class="grid grid-cols-2 gap-4">
                                <div class="w-full h-full flex flex-col p-3 rounded-xl bg-emphasis">
                                    <div class="flex items-center justify-between gap-2">
                                        <div class="font-medium text-color p-2">Customer Satisfaction Score</div>
                                    </div>
                                    <div class="flex-1 py-4 mt-2 flex items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-900 shadow-sm">
                                        <p-knob [(ngModel)]="customerSatisfaction" [size]="150" [strokeWidth]="8" valueTemplate="{value}%" styleClass="pointer-events-none" />
                                    </div>
                                </div>
                                <div class="w-full h-full flex flex-col p-3 rounded-xl bg-emphasis">
                                    <div class="flex items-center justify-between gap-2">
                                        <div class="font-medium text-color p-2">Estimated Lifetime Value</div>
                                    </div>
                                    <div class="flex-1 flex items-center gap-2 justify-center mt-2 p-2 rounded-lg bg-surface-0 dark:bg-surface-900 shadow-sm">
                                        <div class="font-semibold text-lg leading-none text-color border border-surface py-3.5 px-2 rounded-lg">$</div>
                                        <div class="font-semibold text-lg leading-none text-color border border-surface py-3.5 px-2 rounded-lg">272</div>
                                        <div class="font-semibold text-lg leading-none text-color border border-surface py-3.5 px-2 rounded-lg">123</div>
                                        <div class="font-semibold text-lg leading-none text-color border border-surface py-3.5 px-2 rounded-lg">000</div>
                                    </div>
                                </div>
                                <div class="w-full h-full flex flex-col p-3 rounded-xl bg-emphasis">
                                    <div class="flex items-center justify-between gap-2">
                                        <div class="font-medium text-color p-2">Product Usage</div>
                                    </div>
                                    <div class="flex-1 mt-2 py-4 rounded-lg bg-surface-0 dark:bg-surface-900 shadow-sm">
                                        <p-chart [options]="lineChartOptions" class="min-h-44 w-full" height="11rem" />
                                    </div>
                                </div>
                                <div class="w-full h-full flex flex-col p-3 rounded-xl bg-emphasis">
                                    <div class="font-medium text-color p-2">Churn Risk</div>
                                    <div class="flex-1 py-4 mt-2 flex items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-900 shadow-sm">
                                        <p-knob [(ngModel)]="churnRisk" [size]="150" [strokeWidth]="8" valueTemplate="{value}%" class="pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                            <div class="mt-4 w-full flex flex-col p-3 rounded-xl bg-emphasis">
                                <div class="font-medium text-color p-2">Total Purchases</div>
                                <div class="flex-1 py-4 px-2 w-full mt-2 flex items-center justify-center rounded-lg bg-surface-0 dark:bg-surface-900 shadow-sm">
                                    <p-chart [options]="chartOptions2" height="15rem" class="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </ng-template>
            </p-drawer>
        </section>
    `
})
export class HeroSectionComponent implements OnInit, OnDestroy {
    readonly installCommand = 'ng add @bdspark/sparkng';

    commandCopied: boolean = false;

    selectedSampleOption;

    sampleOptions;

    sampleAppsSidebarNavs;

    sampleAppsSidebarNavsMore;

    selectedSampleAppsSidebarNav;

    isSlimMenu: boolean = true;

    value1: number = 24;

    radioValue: string = 'S';

    dateValue: Date;

    switchValue: boolean = true;

    dashboardSidebarVisible: boolean = false;

    selectButtonValue: SelectItem;

    selectButtonOptions: SelectItem[];

    user: any = null;

    users: any[];

    items: MenuItem[];

    rangeValues = [20, 80];

    subscription!: Subscription;

    selectedSidebarOption: string = 'Statistics';

    sidebarOptions: string[] = ['Interaction Logs', 'Preferences', 'Statistics', 'Opportunities'];

    churnRisk: number = 24;

    lineChartOptions: any = {};

    customerSatisfaction: number = 56;

    chartOptions2: any = {};

    preferences: any;

    opportunities: any;

    callLogs: any;

    emailRecords: any;

    get isDarkMode(): boolean {
        return this.configService.appState().darkTheme;
    }

    constructor(
        private configService: AppConfigService,
        @Inject(PLATFORM_ID) private platformId: any,
        private cd: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.sampleOptions = [
            {
                icon: 'pi pi-home',
                title: 'Overview',
                src: '/demo/landing/apps/sampleshots/overview'
            },
            {
                icon: 'pi pi-comment',
                title: 'Chat',
                src: '/demo/landing/apps/sampleshots/chat'
            },
            {
                icon: 'pi pi-inbox',
                title: 'Inbox',
                src: '/demo/landing/apps/sampleshots/mail'
            },
            {
                icon: 'pi pi-th-large',
                title: 'Cards',
                src: '/demo/landing/apps/sampleshots/cards'
            },
            {
                icon: 'pi pi-user',
                title: 'Customers',
                src: '/demo/landing/apps/sampleshots/customers'
            },
            {
                icon: 'pi pi-video',
                title: 'Movies',
                src: '/demo/landing/apps/sampleshots/movies'
            }
        ];
        this.selectedSampleOption = this.sampleOptions[0];

        this.sampleAppsSidebarNavs = [
            { icon: 'pi pi-home', title: 'Overview' },
            { icon: 'pi pi-comment', title: 'Chat' },
            { icon: 'pi pi-inbox', title: 'Inbox' },
            { icon: 'pi pi-th-large', title: 'Cards' },
            { icon: 'pi pi-user', title: 'Customers' },
            { icon: 'pi pi-video', title: 'Movies' }
        ];
        this.sampleAppsSidebarNavsMore = [{ icon: 'pi pi-cog', title: 'Settings' }];

        this.selectedSampleAppsSidebarNav = 'Overview';
        this.selectButtonValue = { label: 'Styled', value: 1 };

        this.selectButtonOptions = [
            { label: 'Styled', value: 1 },
            { label: 'Unstyled', value: 2 }
        ];

        this.items = [
            { label: 'Home', icon: 'pi pi-fw pi-home' },
            { label: 'Calendar', icon: 'pi pi-fw pi-calendar' }
        ];

        this.users = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' }
        ];

        this.preferences = [
            {
                title: 'Email',
                prefs: [
                    { icon: 'pi pi-bell', title: 'Notification', checked: true },
                    { icon: 'pi pi-inbox', title: 'Newsletter', checked: false },
                    { icon: 'pi pi-sync', title: 'Product Updates', checked: false }
                ]
            },
            {
                title: 'Telephone',
                prefs: [
                    { icon: 'pi pi-mobile', title: 'Phone Call', checked: true },
                    { icon: 'pi pi-volume-down', title: 'Voicemail', checked: false },
                    { icon: 'pi pi-comments', title: 'SMS text', checked: false }
                ]
            },
            {
                title: 'Social Media',
                prefs: [
                    { icon: 'pi pi-clock', title: 'Automated Post', checked: true },
                    { icon: 'pi pi-user', title: 'Direct Message', checked: false }
                ]
            },
            {
                title: 'Data Privacy',
                prefs: [
                    { icon: 'pi pi-box', title: 'Share Data with 3rd Parties', checked: true },
                    { icon: 'pi pi-file', title: 'Cookies', checked: false }
                ]
            }
        ];

        this.opportunities = [
            {
                title: 'Northwind Retail',
                stage: 'Proposal',
                severity: 'info',
                value: '$48,200',
                owner: 'Amy Elsner',
                text: 'Migrating three storefronts onto a shared design system. Waiting on security review.'
            },
            {
                title: 'Atlas Manufacturing',
                stage: 'Negotiation',
                severity: 'warn',
                value: '$126,000',
                owner: 'Onyama Limba',
                text: 'Multi-year platform contract. Legal has the redlines, close expected next quarter.'
            },
            {
                title: 'Cedar Health',
                stage: 'Won',
                severity: 'success',
                value: '$71,500',
                owner: 'Ioni Bowcher',
                text: 'Accessibility audit passed on the first pass. Rollout starts with the patient portal.'
            },
            {
                title: 'Blue Harbor Logistics',
                stage: 'Discovery',
                severity: 'secondary',
                value: '$19,800',
                owner: 'Asiya Javayant',
                text: 'Evaluating a replacement for an in-house component library built in 2017.'
            },
            {
                title: 'Meridian Bank',
                stage: 'Proposal',
                severity: 'info',
                value: '$204,000',
                owner: 'Xuxue Feng',
                text: 'Regulated environment, needs an on-premise build pipeline and long-term support.'
            },
            {
                title: 'Fairlane Studios',
                stage: 'Lost',
                severity: 'danger',
                value: '$12,400',
                owner: 'Stephen Shaw',
                text: 'Went with an internal solution. Worth revisiting when their team grows.'
            }
        ];

        this.callLogs = [
            {
                image: '/demo/landing/apps/avatar6.png',
                name: 'Brook Simmons',
                time: '02.02.2024 | 45 min'
            },
            {
                image: '/demo/landing/apps/avatar12.jpg',
                name: 'Jacob Jones',
                time: '02.02.2024 | 45 min'
            },
            {
                image: '/demo/landing/apps/avatar13.jpg',
                name: 'Annette Black',
                time: '02.03.2024 | 13 min'
            },
            {
                image: '/demo/landing/apps/avatar9.jpg',
                name: 'Arlene McCoy',
                time: '02.03.2024 | 14 min'
            },
            {
                image: '/demo/landing/apps/avatar10.jpg',
                name: 'Arlene Simmons',
                time: '02.03.2024 | 14 min'
            },
            {
                image: '/demo/landing/apps/avatar11.jpg',
                name: 'Michael Brown',
                time: '02.04.2024 | 20 min'
            }
        ];

        this.emailRecords = [
            {
                image: '/demo/landing/apps/avatar2.png',
                name: 'Brook Simmons',
                time: '3:24 PM',
                title: 'Unleash Business Potential',
                text: 'Automate, analyze, and accelerate with our SaaS platform. Unshackle from mundane tasks and focus on scaling your business. Contact us for a demo today!'
            },
            {
                image: '/demo/landing/apps/avatar7.png',
                name: 'Jacob Jones',
                time: '12.23.2023',
                title: 'Optimized Workflow Revolution  ',
                text: "Experience a workflow revolution with our intuitive SaaS tool. With enhanced features and optimized processes, it's efficiency like never before. Let's get in touch for a brief demo!"
            },
            {
                image: '/demo/landing/apps/avatar8.png',
                name: 'Annette Black',
                time: '12.17.2023',
                title: 'Innovation at Fingertips',
                text: 'With our SaaS solution, innovation is only a click away. Shape your future with pioneering features and minimalist design. Join us for your solution walk-through today!'
            },
            {
                image: '/demo/landing/apps/avatar11.jpg',
                name: 'Arlene McCoy',
                time: '06.17.2023',
                title: 'Seamless Integration',
                text: 'Integrate effortlessly with our user-friendly SaaS tools. Streamline your operations and boost productivity. Discover more in our demo session.'
            },
            {
                image: '/demo/landing/apps/avatar13.jpg',
                name: 'Arlene Simmons',
                time: '04.17.2023',
                title: 'Transform Your Business',
                text: 'Empower your team with our innovative SaaS solutions. Achieve unparalleled efficiency and drive growth. Book a demo to explore the possibilities.'
            },
            {
                image: '/demo/landing/apps/avatar2.png',
                name: 'Michael Brown',
                time: '01.05.2024',
                title: 'Next-Gen Collaboration',
                text: 'Experience the future of collaboration with our cutting-edge SaaS platform. Enhance teamwork and streamline communication. Contact us for a demo today!'
            }
        ];

        if (isPlatformBrowser(this.platformId)) {
            this.setChartData();
            this.setLineChartData();
        }
    }

    setChartData() {
        const documentStyle = getComputedStyle(document.documentElement);
        const borderColor = documentStyle.getPropertyValue('--p-content-border-color');
        const hoverBackgroundColor = documentStyle.getPropertyValue('--p-primary-color');

        this.chartOptions2 = {
            grid: { left: 8, right: 8, top: 24, bottom: 0, containLabel: true },
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisTick: { show: false },
                axisLine: { show: false }
            },
            yAxis: { type: 'value', splitLine: { show: false } },
            series: [
                {
                    type: 'bar',
                    name: 'Investment Wallet',
                    itemStyle: { color: borderColor, borderRadius: [4, 4, 0, 0] },
                    emphasis: { itemStyle: { color: hoverBackgroundColor } },
                    barWidth: 20,
                    data: [100, 201, 404, 300, 140, 220, 314, 520, 145, 234, 325, 147]
                }
            ]
        };
    }

    setChartOptions() {
        // Chart theming is derived from the active SparkNG preset automatically.
    }

    setLineChartData() {
        const { darkTheme } = this.configService.appState();

        this.lineChartOptions = {
            grid: { left: 8, right: 8, top: 8, bottom: 0, containLabel: true },
            tooltip: { trigger: 'axis' },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['31', '1', '2', '3', '4', '5', '6', '7', '8'],
                axisTick: { show: false },
                axisLine: { show: false }
            },
            yAxis: { type: 'value', splitLine: { show: false } },
            series: [
                {
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 8,
                    showSymbol: false,
                    lineStyle: { width: 1.5, color: '#16A34A' },
                    itemStyle: { color: '#16A34A', borderColor: darkTheme ? '#09090B' : '#FFF', borderWidth: 3 },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(22,163,74,0.16)' },
                                { offset: 1, color: 'rgba(22,163,74,0)' }
                            ]
                        }
                    },
                    data: [60, 64, 57, 52, 58, 70, 75, 70, 60]
                }
            ]
        };
    }

    setLineChartOptions() {
        // Chart theming is derived from the active SparkNG preset automatically.
    }

    setSelectedSampleAppsSidebarNav(title) {
        this.selectedSampleAppsSidebarNav = title;
    }

    copyInstallCommand(): void {
        if (!isPlatformBrowser(this.platformId) || !navigator?.clipboard?.writeText) {
            return;
        }

        navigator.clipboard
            .writeText(this.installCommand)
            .then(() => {
                this.commandCopied = true;
                setTimeout(() => (this.commandCopied = false), 2000);
            })
            .catch(() => {
                // Clipboard may be blocked (permissions/insecure context). Ignore to avoid unhandled rejections.
            });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }
}
