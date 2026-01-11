import { AppointmentStatus } from "./admin-appointment.model";

export interface AdminAppointmentsQuery {
  from?: string;  // yyyy-MM-dd
  to?: string;    // yyyy-MM-dd
  status?: AppointmentStatus | 'ALL';
  q?: string;
}