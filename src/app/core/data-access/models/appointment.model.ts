export type VisitType = 'PAID' | 'NHI_FIRST'| 'NHI_FOLLOWUP';

export interface CreateAppointmentPayload{
  visitType: VisitType;
  date: string; // in 'yyyy-MM-dd', 'bg' format
  time: string; // in HH:mm format
  message?: string; // optional string
}