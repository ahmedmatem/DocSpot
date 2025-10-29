export type VisitType = 'PAID' | 'NHI_FIRST'| 'NHI_FOLLOWUP';

export interface CreateAppointmentPayload{
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  visitType: VisitType;
  appointmentDate: string; // in 'yyyy-MM-dd', 'bg' format
  appointmentTime: string; // in HH:mm format
  message?: string; // optional string
}