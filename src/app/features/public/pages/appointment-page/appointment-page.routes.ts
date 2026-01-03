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
                path: 'manage',
                loadComponent: () => import('./appointment-manage/appointment-manage.component')
                    .then(m => m.AppointmentManageComponent)
            }
        ]
    }
];