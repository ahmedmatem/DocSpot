import { Component } from '@angular/core';
import { DaylySchedulePreviewComponent } from "../create-week-schedule/dayly-schedule-preview/dayly-schedule-preview.component";

@Component({
  selector: 'app-week-schedule',
  imports: [DaylySchedulePreviewComponent],
  templateUrl: './week-schedule.component.html',
  styleUrl: './week-schedule.component.css'
})
export class WeekScheduleComponent {

}
