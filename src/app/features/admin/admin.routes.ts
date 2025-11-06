import { Routes } from "@angular/router";
import { authGuard } from "../../core/auth/auth.gard";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { adminGuard } from "../../core/auth/admin.gard";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";

export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [adminGuard],
        children: [
            { path: '', component: AdminDashboardComponent },
            // { path: 'users', loadComponent: () => import('./pages/users.component').then(m => m.UsersComponent) },
            // add more children here
        ],
    },
];