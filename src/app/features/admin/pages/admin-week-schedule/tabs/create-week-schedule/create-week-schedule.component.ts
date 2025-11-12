import { Component, signal } from '@angular/core';
import { DaylyScheduleComponent } from "../../dayly-schedule/dayly-schedule.component";
import { DaylySchedulePreviewComponent, TimeInterval } from "../../dayly-schedule-preview/dayly-schedule-preview.component";
import { MatDatepickerModule, MatCalendar } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { _MatInternalFormField, MatNativeDateModule } from '@angular/material/core';
import { WeekScheduleService } from '../../../../data-access/services/week-schedule.service';
import { WeekModel } from '../../../../data-access/models/week-schedule.model';

@Component({
  selector: 'app-admin-week-schedule',
  imports: [
    DaylyScheduleComponent,
    DaylySchedulePreviewComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule
],
  templateUrl: './create-week-schedule.component.html',
  styleUrl: './create-week-schedule.component.css'
})
export class CreateWeekScheduleComponent {
  week = signal<WeekModel>({ mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] });
  interval = signal<string>('');
  slotLen = signal<number>(20);

  readonly today = new Date();
  selectedDate = signal<Date | null>(this.today);

  minDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()); // start of today
  maxDate = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate()); // +1 years, same month/day

  saving = false;
  saved = false;
  error = '';

  constructor(private weekScheduleService: WeekScheduleService) {}

  onSlotLenChanged(e: Event) {
    const len = Number((e.target as HTMLInputElement).value);
    this.slotLen.set(len);
  }

  // MatCalendar two-way binding helper
  onDateSelected(d: Date){
    this.selectedDate.set(d);
  }

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

  saveWeekSchedule(){
    this.error = '';
    this.saved = false;

    this.saving = true;
    const dto = { 
      startDate: this.toYMD(this.selectedDate()!),
      slotLength: this.slotLen(),
      weekSchedule: this.week() 
    };
    this.weekScheduleService.save(dto).subscribe({
      next: _ => { this.saved = true; this.saving = false; },
      error: e => { this.error = e?.error ?? 'Неуспешен запис'; this.saving = false; }
    });
  }  

  private toYMD(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`; // "2025-11-11"
  }
}
