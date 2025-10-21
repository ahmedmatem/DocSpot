import { Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TimeSlotComponent } from "../../../../../shared/ui/time-slot/time-slot.component";

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
  today = new Date();
  selectedDate = model<Date>(this.today);
  minDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()); // start of today
  maxDate = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate()); // +1 years, same month/day
}
