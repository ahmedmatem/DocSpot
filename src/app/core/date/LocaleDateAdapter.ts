// custom-weekday-adapter.ts
import { Injectable, inject } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class LocaleDateAdapter extends NativeDateAdapter {
  // keep locale support
  constructor() {
    super(inject(MAT_DATE_LOCALE));
  }

  /**
   * Controls the labels used in the year view tiles and elsewhere.
   * Material asks for 'short' here, so return full names for 'short' too.
   */
  override getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const full = ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'];
    const short = ['яну','фев','мар','апр','май','юни','юли','авг','сеп','окт','ное','дек']; // used in month tiles

    if (style === 'short' || style === 'narrow') return short;
    return full; // header & a11y use long
}

  /**
   * Return weekday names in the order **Sun..Sat** because the calendar
   * uses getFirstDayOfWeek() to rotate them for display.
   */
  override getDayOfWeekNames(
    style: 'long' | 'short' | 'narrow'
  ): string[] {
    // Put your custom labels here:
    // Example (Bulgarian abbreviations):
    return ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  }

  /** Choose which day the week starts on (0=Sunday, 1=Monday, …) */
  override getFirstDayOfWeek(): number {
    return 1; // Monday
  }
}
