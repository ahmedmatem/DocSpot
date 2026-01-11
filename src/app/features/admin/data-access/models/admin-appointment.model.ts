import { VisitType } from "../../../../core/data-access/models/appointment.model";

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED | DONE';

export interface AdminAppointmentModel {
  id: string;

  patientName: string;
  patientPhone: string;
  patientEmail: string;
  visitType: VisitType;

  appointmentDate: string; // yyyy-MM-dd
  appointmentTime: string; // HH:mm
  message?: string;

  appointmentStatus: AppointmentStatus;

  cancelledAtUtc?: string | null; // ISO string
}