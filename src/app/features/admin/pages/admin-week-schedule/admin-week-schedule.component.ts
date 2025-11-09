import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { DaylyScheduleComponent } from "./dayly-schedule/dayly-schedule.component";
import { DaylySchedulePreviewComponent } from "./dayly-schedule-preview/dayly-schedule-preview.component";

@Component({
  selector: 'app-admin-week-schedule',
  imports: [DaylyScheduleComponent, DaylySchedulePreviewComponent],
  templateUrl: './admin-week-schedule.component.html',
  styleUrl: './admin-week-schedule.component.css'
})
export class AdminWeekScheduleComponent {
  
}
