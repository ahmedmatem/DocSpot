import { WeekScheduleComponent } from './tabs/week-schedule/week-schedule.component';
import { AdminWeekScheduleComponent } from './admin-week-schedule.component';

export const WEEK_SCHEDULE_ROUTES = [
    {
        path: '',
        loadComponent: () => import('./admin-week-schedule.component').then(m => m.AdminWeekScheduleComponent)
    },
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