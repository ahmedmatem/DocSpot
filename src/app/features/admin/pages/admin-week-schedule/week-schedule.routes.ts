import { Component } from '@angular/core';
import { WeekScheduleComponent } from './tabs/week-schedule/week-schedule.component';

export const WEEK_SCHEDULE_ROUTES = [
    {
        path: 'create',
        loadComponent: () => import('./tabs/create-week-schedule/create-week-schedule.component')
            .then(m => m.CreateWeekScheduleComponent)
    },
    {
        path: ':start',
        component: WeekScheduleComponent
    }
];