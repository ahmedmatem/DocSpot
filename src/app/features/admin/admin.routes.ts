import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { adminGuard } from "../../core/auth/admin.gard";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
import { WeekScheduleLayoutComponent } from "./layout/week-schedule-layout/week-schedule-layout.component";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [adminGuard],
        children: [
            { 
                path: '',
                 component: AdminDashboardComponent 
            },
            { 
                path: 'schedule', 
                component: WeekScheduleLayoutComponent,
                loadChildren: () => import('./pages/admin-week-schedule/week-schedule.routes')
                    .then(m => m.WEEK_SCHEDULE_ROUTES)
            },
            // { path: 'users', loadComponent: () => import('./pages/users.component').then(m => m.UsersComponent) },
            // add more children here
        ],
    },
];