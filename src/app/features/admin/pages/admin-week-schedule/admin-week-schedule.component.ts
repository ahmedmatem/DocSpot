import { Component, inject, signal } from '@angular/core';
import { weekSchedulePayload, WeekScheduleService } from '../../data-access/services/week-schedule.service';
import { DaylySchedulePreviewComponent, TimeInterval } from './tabs/create-week-schedule/dayly-schedule-preview/dayly-schedule-preview.component';
import { WeekScheduleTableComponent } from "../../../../shared/ui/week-schedule-table/week-schedule-table.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-week-schedule',
  standalone: true,
  imports: [WeekScheduleTableComponent],
  templateUrl: './admin-week-schedule.component.html',
  styleUrl: './admin-week-schedule.component.css'
})
export class AdminWeekScheduleComponent {
  // dayKeys: string[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  weekScheduleService = inject(WeekScheduleService);
  private route = inject(ActivatedRoute);

  // observable – useful for list somewhere
  // weeks$ = this.weekScheduleService.weeks$;

  // local cache for synchronous access
  private weeks: weekSchedulePayload[] = [];

  selectedWeek: weekSchedulePayload | undefined = undefined;

  ngOnInit() {
    // 1) Ensure weeks are loaded
    this.weekScheduleService.loadAll().subscribe(weeks => {
      this.weeks = weeks ?? [];

      // pick an initial week - active one
      // let activeWeek = this.weekScheduleService.getActiveWeekSchedule();
      // this.selectedWeek = activeWeek;

      // 2) React to route param :start (active, 2025-11-17, etc.)
      this.route.paramMap.subscribe(params => {
        const start = params.get('start'); // 'active' or '2025-11-17'

        if (!start || start === 'active') {
          // “Актуално” tab → closest previous week
          this.selectedWeek = this.weekScheduleService.getActiveWeekSchedule();
        } else {
          // specific date tab
          this.selectedWeek =
            this.weekScheduleService.getWeekByStartDate(start) ??
            this.weekScheduleService.getActiveWeekSchedule(); // fallback if not found
        }
      });
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
