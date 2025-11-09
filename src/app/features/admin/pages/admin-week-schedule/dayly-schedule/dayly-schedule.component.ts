import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dayly-schedule',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dayly-schedule.component.html',
  styleUrl: './dayly-schedule.component.css'
})
export class DaylyScheduleComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    intervals: this.fb.array([])
  });
  
  get intervalsFA() { 
    return this.form.get('intervals') as FormArray; 
  }

  addInterval() {
    this.intervalsFA.push(this.fb.group({ interval: ''} ));
  }

  deleteInterval(i: number) {
    this.intervalsFA.removeAt(i);
  }
}
