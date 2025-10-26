export interface Appointment {
  id: string;
  date: Date;
  timeSlot: string;
  patientName: string;
  doctorName: string;
  status: 'booked' | 'cancelled' | 'completed';
}