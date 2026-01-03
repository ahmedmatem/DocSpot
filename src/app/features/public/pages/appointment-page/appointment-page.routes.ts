import { AppointmentLayoutComponent } from '../../layout/appointment-layout/appointment-layout.component';

export const APPOINTMENT_PAGE_ROUTES = [
    {
        path: '', 
        match: 'full',
        component: AppointmentLayoutComponent,
        children: [
            { 
                path: 'confirmed', 
                loadComponent: () => import('./appointment-confirmed/appointment-confirmed.component')
                    .then(m => m.AppointmentConfirmedComponent)
            },
            { 
                path: 'cancelled', 
                loadComponent: () => import('./appointment-cancelled/appointment-cancelled.component')
                    .then(m => m.AppointmentCancelledComponent)
            },
            {
                path: 'public',
                loadComponent: () => import('./appointment-public/appointment-public.component')
                    .then(m => m.AppointmentPublicComponent)
            }
        ]
    }
];