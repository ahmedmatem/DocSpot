import { Component, inject } from '@angular/core';
import { WeekScheduleService } from '../../data-access/services/week-schedule.service';

@Component({
  selector: 'app-admin-week-schedule',
  standalone: true,
  imports: [],
  templateUrl: './admin-week-schedule.component.html',
  styleUrl: './admin-week-schedule.component.css'
})
export class AdminWeekScheduleComponent {
  weekScheduleService = inject(WeekScheduleService);
  weeks$ = this.weekScheduleService.weeks$;

  ngOnInit() {
    this.weekScheduleService.loadAll().subscribe();
  }
}
