import { VisitType } from "../../../../core/data-access/models/appointment.model";

export interface AdminAppointmentModel {
  id: string;

  patientName: string;
  patientPhone: string;
  patientEmail: string;
  visitType: VisitType;

  appointmentDate: Date; // yyyy-MM-dd
  appointmentTime: string; // HH:mm
  message?: string;

  appointmentStatus: string;

  cancelledAtUtc?: string | null; // ISO string
}