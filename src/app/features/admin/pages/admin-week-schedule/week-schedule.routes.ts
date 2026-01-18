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
        path: 'exclusions',
        loadComponent: () => import('./schedule-exclusions/schedule-exclusions.component')
            .then(m => m.ScheduleExclusionsComponent)
    },
    {
        path: ':start',
        loadComponent: () => import('./admin-week-schedule.component')
            .then(m => m.AdminWeekScheduleComponent)
    }
];