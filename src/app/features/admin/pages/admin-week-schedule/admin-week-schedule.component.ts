import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { DaylyScheduleComponent } from "./dayly-schedule/dayly-schedule.component";

@Component({
  selector: 'app-admin-week-schedule',
  imports: [DaylyScheduleComponent],
  templateUrl: './admin-week-schedule.component.html',
  styleUrl: './admin-week-schedule.component.css'
})
export class AdminWeekScheduleComponent {
  
}
