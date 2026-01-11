import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminAppointmentModel } from '../../../data-access/models/admin-appointment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-drawer',
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-drawer.component.css',
  styleUrl: './appointment-drawer.component.css'
})
export class AppointmentDrawerComponent {
  @Input() appointment: AdminAppointmentModel | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<{ appointment: AdminAppointmentModel; reason?: string }>();
  @Output() reschedule = new EventEmitter<AdminAppointmentModel>();
  @Output() delete = new EventEmitter<AdminAppointmentModel>();

  cancelReason = '';

  cancelClicked() {
    if (!this.appointment) return;
    this.cancel.emit({ appointment: this.appointment, reason: this.cancelReason?.trim() || undefined });
  }
}
