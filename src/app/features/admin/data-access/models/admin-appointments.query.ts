export interface AdminAppointmentsQuery {
  from?: string;  // yyyy-MM-dd
  to?: string;    // yyyy-MM-dd
  status?: string | 'ALL';
  q?: string;
}