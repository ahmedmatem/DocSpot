import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreateAppointmentPayload } from '../models/appointment.model';
import { Observable } from 'rxjs';
import { Slot } from '../../../shared/ui/time-slot/time-slot.component';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = environment.apiBaseUrl + '/appointments/';

  constructor(private http: HttpClient) { }

  create(payload: CreateAppointmentPayload ) {
    return this.http.post<void>(this.baseUrl + "book", payload);
  }

  getTimeSlotsBy(date: string): Observable<Slot[]> {
    let params = new HttpParams().set('date', date); // date in "yyyy-mm-dd"

     // Backend should return something like ["09:00", "09:20", "09:40", ...]
     return this.http.get<Slot[]>(this.baseUrl + "time-slots", { params });
  }
}
