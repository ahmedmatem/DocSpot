import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.gard';
import { LoginComponent } from './features/auth/login/login.component';
import { PublicLayoutComponent } from './features/public/layout/public-layout/public-layout.component';

export const routes: Routes = [
    { path: '', component: PublicLayoutComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin',
        canActivate: [authGuard],
        loadChildren: () => import('./features/admin/admin.routes')
            .then(m => m.ADMIN_ROUTES),
    },
    {
        path: 'appointment',
        // component: AppointmentLayoutComponent,
        loadChildren: () => import('./features/public/pages/appointment-page/appointment-page.routes')
            .then(m => m.APPOINTMENT_PAGE_ROUTES),
    },
    
    { path: '**', redirectTo: '' }
]