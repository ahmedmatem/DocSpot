import { Component, Input } from '@angular/core';
import { weekSchedulePayload } from '../../../features/admin/data-access/services/week-schedule.service';
import { DaylySchedulePreviewComponent, TimeInterval } from '../../../features/admin/pages/admin-week-schedule/tabs/create-week-schedule/dayly-schedule-preview/dayly-schedule-preview.component';

@Component({
  selector: 'app-week-schedule-table',
  imports: [DaylySchedulePreviewComponent],
  templateUrl: './week-schedule-table.component.html',
  styleUrl: './week-schedule-table.component.css'
})
export class WeekScheduleTableComponent {
  dayKeys: string[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  @Input() payload: weekSchedulePayload | undefined = undefined;

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
