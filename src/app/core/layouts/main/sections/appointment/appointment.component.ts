import { Component, computed, effect, model, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimeSlotComponent } from "../../../../../shared/ui/time-slot/time-slot.component";
import { formatDate } from '@angular/common';

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
  readonly today = new Date();
  readonly selectedDate = model<Date | null>(null);
  
  minDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()); // start of today
  maxDate = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate()); // +1 years, same month/day

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
