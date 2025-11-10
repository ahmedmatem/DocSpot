import { Component, signal } from '@angular/core';
import { DaylyScheduleComponent } from "./dayly-schedule/dayly-schedule.component";
import { DaylySchedulePreviewComponent, TimeInterval } from "./dayly-schedule-preview/dayly-schedule-preview.component";

type WeekModel = Record<string, string[]>; // {mon: [...], tue: [...], ...}

@Component({
  selector: 'app-admin-week-schedule',
  imports: [DaylyScheduleComponent, DaylySchedulePreviewComponent],
  templateUrl: './admin-week-schedule.component.html',
  styleUrl: './admin-week-schedule.component.css'
})
export class AdminWeekScheduleComponent {
  week = signal<WeekModel>({ mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] });
  interval = signal<string>('');

  onIntervalChange(payload: { day: string, intervals: string[] }) {
    this.week.update(wm => ({ ...wm, [payload.day]: payload.intervals }));
    // console.log('Updated', payload.day, '→', this.week()[payload.day]);
  }

  dayIntervals(arr: string[]): TimeInterval[] {
    return arr.map(s => {
      const [start, end] = s.split('-').map(t => t.trim());
      return { start, end };
    });
  }
}
