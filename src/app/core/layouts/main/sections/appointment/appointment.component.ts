import { Component, computed, DestroyRef, effect, ElementRef, inject, model, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimeSlotComponent } from "../../../../../shared/ui/time-slot/time-slot.component";
import { formatDate } from '@angular/common';
import { AppointmentService } from '../../../../data-access/services/appointment.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VisitType } from '../../../../data-access/models/appointment.model';

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
  @ViewChild('appointmentForm') appointmentFormRef!: ElementRef<HTMLFormElement>;

  private appointmentService = inject(AppointmentService);
  private destroyRef = inject(DestroyRef);
  
  readonly today = new Date();
  selectedDate = signal<Date | null>(null);
  selectedTime = signal<string | null>(null);
  
  minDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()); // start of today
  maxDate = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate()); // +1 years, same month/day

  // UI state
  loading = signal(false);
  sent = signal(false);
  error = signal<string | null>(null);

  private submitHandler = (e: Event) => {
    e.preventDefault();
    this.submit();
  }

  ngAfterViewInit(): void {
    this.appointmentFormRef.nativeElement.addEventListener('submit', this.submitHandler);
  }

  // MatCalendar two-way binding helper
  onDateSelected(d: Date){
    this.selectedDate.set(d);
  }

  // Hook up <app-time-slot> output to this
  onTimeSelected(time: string){
    this.selectedTime.set(time);
  }

  submit(){
    this.error.set(null);

    if(!this.selectedTime()) {
      console.log('no time selected');
      this.error.set('Моля, изберете час за вашето посещение.');
      return;
    };

    // Collect native inputs with FormData
    const fd = new FormData(this.appointmentFormRef.nativeElement);

    // Read values (FormData.get returns FormDataEntryValue | null)
    const name = (fd.get('name') || '').toString().trim();
    const phone = (fd.get('phone') || '').toString().trim();
    const email = (fd.get('email') || '').toString().trim();
    const visitType = (fd.get('visitType') || '').toString().trim() as VisitType;
    const message = (fd.get('message') || '').toString().trim();

    const payload = {
      patientName: name!,
      patientEmail: email!,
      patientPhone: phone!,
      visitType: visitType!,
      appointmentDate: formatDate(this.selectedDate()!, 'yyyy-MM-dd', 'bg'),
      appointmentTime: this.selectedTime()!,
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
}
