import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

type PayloadUpdate = { day: string, intervals: string[] }

@Component({
  selector: 'app-dayly-schedule',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dayly-schedule.component.html',
  styleUrl: './dayly-schedule.component.css'
})
export class DaylyScheduleComponent {
  private fb = inject(FormBuilder);

  // Identify the day: 'mon' | 'tue' | ...
  dayKey = input<string>('mon');

  // Notify parent which day changed and all current intervals for that day
  intervalChange = output<PayloadUpdate>();

  form = this.fb.group({
    intervals: this.fb.array([])
  });
  
  get intervalsFA() { 
    return this.form.get('intervals') as FormArray; 
  }

  addInterval() {
    this.intervalsFA.push(this.fb.group({ id: crypto.randomUUID(), interval: ''} ));
  }

  deleteInterval(i: number) {
    this.intervalsFA.removeAt(i);
    this.intervalChange.emit({ day: this.dayKey(), intervals: this.currentIntervals() });
  }

  onIntervalChange() {
    console.log('Current intervals', this.currentIntervals());
    this.intervalChange.emit({ day: this.dayKey(), intervals: this.currentIntervals() });
  }  

  private currentIntervals(): string[] {
    return (this.intervalsFA.getRawValue() as { interval: string }[])
      .map(r => (r.interval || '').trim())
      .filter(v => v.length > 0);
  }

  // helper for template trackBy
  trackById = (_: number, g: any) => g.get('id')?.value;
}
