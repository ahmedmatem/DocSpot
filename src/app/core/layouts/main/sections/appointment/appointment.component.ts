import { Component, computed, DestroyRef, effect, inject, model, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimeSlotComponent } from "../../../../../shared/ui/time-slot/time-slot.component";
import { formatDate } from '@angular/common';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CreateAppointmentPayload, VisitType } from '../../../../data-access/models/appointment.model';
import { AppointmentService } from '../../../../data-access/services/appointment.service';
import { finalize, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-appointment',
  imports: [
    MatCardModule, 
    MatDatepickerModule, 
    TimeSlotComponent
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  private fb: NonNullableFormBuilder = inject(FormBuilder).nonNullable;
  private appointmentService = inject(AppointmentService);
  private destroyRef = inject(DestroyRef);
  
  readonly today = new Date();
  readonly selectedDate = model<Date | null>(null);
  
  minDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()); // start of today
  maxDate = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate()); // +1 years, same month/day

  // UI state
  loading = signal(false);
  sent = signal(false);
  error = signal<string | null>(null);

  // Typed reactive form
  readonly form = this.fb.group({
    visitType: this.fb.control<VisitType>('PAID', {validators: [Validators.required]}),
    date: this.fb.control<Date | null>(null, {validators: [Validators.required]}),
    time: this.fb.control<string | null>(null, {validators: [Validators.required]}),
    message: this.fb.control<string>('', {validators: []}),
  });

  // MatCalendar two-way binding helper
  onDateSelected(d: Date){
    this.form.patchValue({date: d});
  }

  // Hook up <app-time-slot> output to this
  onTimeSelected(time: string){
    this.form.patchValue({time});
  }

  suybmit(){
    this.error.set(null);
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const {visitType, date, time, message} = this.form.getRawValue();
    console.log('submitting appointment:', {visitType, date, time, message});

    const payload = {
      visitType,
      date: formatDate(date!, 'yyyy-MM-dd', 'bg'),
      time: time!,
      message: message?.trim() || undefined,
    };
    
    this.loading.set(true); // show loading state
    this.appointmentService.create(payload)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.loading.set(false))
    )
    .subscribe({
      next: () => {
        this.sent.set(true);
      },
      error: (err) => {
        console.error('appointment submission error:', err);
        this.error.set(err?.error?.message ?? 'Неуспешна заявка. Моля, опитайте отново по-късно.');
      }
    });
    
  }

  // derive a formatted label (auto-updates when selection changes)
  readonly selectedDateLabel = computed(() => {
    this.selectedDate ? formatDate(this.selectedDate()!, 'fullDate', 'bg') : '--';
  });

  // load slots when data changes
  readonly onDateChanch = effect(() => {
    const date = this.selectedDate();
    if(date){
      // call a service, refetch data, etc.
      // this.appointmentService.loadSlotsFor(d);
      console.log('selected:', date);
    }
  });

}
