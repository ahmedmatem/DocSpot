import { Component, computed, DestroyRef, effect, ElementRef, inject, model, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Slot, TimeSlotComponent } from "../../../../../shared/ui/time-slot/time-slot.component";
import { formatDate } from '@angular/common';
import { AppointmentService } from '../../../../../core/data-access/services/appointment.service';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VisitType } from '../../../../../core/data-access/models/appointment.model';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-appointment',
  imports: [
    MatCardModule, 
    MatDatepickerModule, 
    TimeSlotComponent,
    FormsModule
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {
  @ViewChild('appointmentForm') appointmentFormRef!: ElementRef<HTMLFormElement>;

  private appointmentService = inject(AppointmentService);
  private destroyRef = inject(DestroyRef);
  private toastr = inject(ToastrService);
  
  readonly today = new Date();
  selectedDate = signal<Date | null>(null);
  selectedTime = signal<string | null>(null);
  
  minDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()); // start of today
  maxDate = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate()); // +1 years, same month/day

  timeSlots: Slot[] = []; // e.g. [{ time: "08:00", available: bool }, { time: "08:20", available: bool }, ...]
  selectedSlot: Slot | null = null;

  // UI state
  loading = signal(false);
  sent = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    // initial load (today)
    const today = new Date();
    this.selectedDate.set(today);
    this.loadTimeSlotsForDate(today);
  }

  // MatCalendar two-way binding helper
  onDateSelected(date: Date){
    this.selectedDate.set(date);
    this.selectedSlot = null; // reset previous choice, if any
    this.loadTimeSlotsForDate(date);
  }

  // Hook up <app-time-slot> output to this
  onTimeSelected(time: string){
    this.selectedTime.set(time);
  }

  submit(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if(this.loading()) return; // prevent multiple submits

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

        this.toastr.success('Запазихте час успешно!', 'Успех');
        // // reset form + selection
        // this.appointmentFormRef.nativeElement.reset();
        // this.selectedTime.set(null);
        // // this.selectedSlot = null;
        // this.selectedDate.set(this.today);

        this.resetBookingUi();
      },
      error: (err) => {
        console.error('appointment submission error:', err);
        this.error.set(err?.error?.message ?? 'Неуспешна заявка. Моля, опитайте отново по-късно.');

        this.toastr.error(this.error()!, 'Грешка');
      }
    });    
  }
  
  private loadTimeSlotsForDate(date: Date): void {
    // const dateStr = date.toISOString().split('T')[0]; // 'yyyy-MM-dd'
    const dateStr = this.formatDateLocal(date);
    console.log('Selected date:', date, 'Sending:', dateStr);

    this.appointmentService.getTimeSlotsBy(dateStr).subscribe({
      next: (slots) => (this.timeSlots = slots),
      error: (err) => {
        console.error('Error loading slots', err);
        this.timeSlots = [];
      }
    });
  }

  private formatDateLocal(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private resetBookingUi() {
    // reset native form fields
    this.appointmentFormRef.nativeElement.reset();

    // reset custom UI state
    this.selectedTime.set(null);
    this.selectedSlot = null;

    // Reset calendar selection:
    this.selectedDate.set(this.today);
    this.loadTimeSlotsForDate(this.today);
  }

}
