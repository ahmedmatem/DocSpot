import { Component, inject } from '@angular/core';
import { weekSchedulePayload, WeekScheduleService } from '../../data-access/services/week-schedule.service';
import { DaylySchedulePreviewComponent, TimeInterval } from './tabs/create-week-schedule/dayly-schedule-preview/dayly-schedule-preview.component';

@Component({
  selector: 'app-admin-week-schedule',
  standalone: true,
  imports: [DaylySchedulePreviewComponent],
  templateUrl: './admin-week-schedule.component.html',
  styleUrl: './admin-week-schedule.component.css'
})
export class AdminWeekScheduleComponent {
  dayKeys: string[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  weekScheduleService = inject(WeekScheduleService);

  // observable – useful for list somewhere
  weeks$ = this.weekScheduleService.weeks$;

  // local cache for synchronous access
  private weeks: weekSchedulePayload[] = [];

  selectedWeek: weekSchedulePayload | undefined = undefined;

  ngOnInit() {
    this.weekScheduleService.loadAll().subscribe(weeks => {
      this.weeks = weeks ?? [];

      // pick an initial week - active one
      const activeWeek = this.weekScheduleService.getActiveWeekSchedule();
      this.selectedWeek = activeWeek;
    });
  }

  /** Call this to change the displayed week */
  showWeek(startDate: string) {
    this.selectedWeek = this.weekScheduleService.getWeekByStartDate(startDate);
  }

  toTimeIntervals(intervals: string[]): TimeInterval[] {
    return intervals
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(interval => {
        const [start, end] = interval.split('-').map(x => x.trim());
        return { start, end };
      });
  }
}
