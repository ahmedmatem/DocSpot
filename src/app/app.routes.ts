import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.gard';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {
        path: 'admin',
        canActivate: [authGuard],
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    }
];
