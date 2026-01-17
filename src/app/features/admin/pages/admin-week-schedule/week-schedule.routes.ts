import { AdminWeekScheduleComponent } from './admin-week-schedule.component';

export const WEEK_SCHEDULE_ROUTES = [
    {
        path: 'active',
        component: AdminWeekScheduleComponent
    },
    {
        path: 'create',
        loadComponent: () => import('./tabs/create-week-schedule/create-week-schedule.component')
            .then(m => m.CreateWeekScheduleComponent)
    },
    {
        path: 'exclude',
        loadComponent: () => import('./exclude/schedule-exclude/schedule-exclude.component')
            .then(m => m.ScheduleExcludeComponent)
    },
    {
        path: ':start',
        loadComponent: () => import('./admin-week-schedule.component')
            .then(m => m.AdminWeekScheduleComponent)
    }
];