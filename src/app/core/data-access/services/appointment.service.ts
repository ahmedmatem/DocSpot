import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CreateAppointmentPayload } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = environment.apiUrl + '/appointments/';

  constructor(private http: HttpClient) { }

  create(payload: CreateAppointmentPayload ) {
    return this.http.post<void>(this.baseUrl + "book", payload);
  }
}
