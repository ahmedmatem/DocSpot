import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminAppointmentModel } from '../../../data-access/models/admin-appointment.model';
import { CommonModule } from '@angular/common';
import { VisitTypeBgPipe } from '../../../../../shared/pipes/visittype-bg.pipe';

@Component({
  selector: 'app-appointments-table',
  imports: [CommonModule, VisitTypeBgPipe],
  templateUrl: './appointments-table.component.html',
  styleUrl: './appointments-table.component.css'
})
export class AppointmentsTableComponent {
  @Input() items: AdminAppointmentModel[] = [];
  @Output() select = new EventEmitter<AdminAppointmentModel>();

  onOpen(e: MouseEvent, a: AdminAppointmentModel) {
    e.stopPropagation();
    this.select.emit(a);
  }
}
