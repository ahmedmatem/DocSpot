import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { LocaleDateAdapter } from './core/date/LocaleDateAdapter';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import localeBg from '@angular/common/locales/bg';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TOASTR_OPTIONS } from './core/config/toastr.options';

registerLocaleData(localeBg);

export const BG_MONTH_YEAR_FORMATS = {
  parse: {
    dateInput: 'dd.MM.yyyy', // keep your input format as you like
  },
  display: {
    dateInput: 'dd.MM.yyyy',
    // 👇 This controls the calendar header text
    monthYearLabel: { month: 'long', year: 'numeric' }, // -> "Октомври 2025"
    dateA11yLabel: { day: 'numeric', month: 'short', year: 'numeric' },
    monthYearA11yLabel: { month: 'short', year: 'numeric' },
  },
} as const;

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(TOASTR_OPTIONS),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'bg' }, // 🇧🇬 sets Bulgarian locale globally
    { provide: DateAdapter, useClass: LocaleDateAdapter }, // use custom date adapter
    { provide: MAT_DATE_FORMATS, useValue: BG_MONTH_YEAR_FORMATS },
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
