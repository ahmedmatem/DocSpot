import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CancelPreviewModel, CreateAppointmentPayload } from '../models/appointment.model';
import { Observable } from 'rxjs';
import { Slot } from '../../../shared/ui/time-slot/time-slot.component';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = environment.apiBaseUrl + '/appointments/';

  constructor(private http: HttpClient) { }

  create(payload: CreateAppointmentPayload ) {
    return this.http.post(this.baseUrl + "book", payload, { responseType: 'text' });
  }

  getTimeSlotsBy(date: string): Observable<Slot[]> {
    let params = new HttpParams().set('date', date); // date in "yyyy-mm-dd"

     // Backend should return something like ["09:00", "09:20", "09:40", ...]
     return this.http.get<Slot[]>(this.baseUrl + "time-slots", { params });
  }

  // Get public appointment details by its public token and Id
  getCancelPreview(id: string, token:string) : Observable<CancelPreviewModel> {
    return this.http.get<CancelPreviewModel>(`${this.baseUrl}cancel-preview`, {params: {id, token}});
  }

  // Confirm public appointment by its public token and Id
  confirmPublic(id: string, token: string) {
    return this.http.get(`${this.baseUrl}public/confirm`, {params: {id, token}});
  }

  // Cancel public appointment by its public token and Id
  cancelPublic(id: string, token: string) {
    return this.http.get(`${this.baseUrl}public/cancel`, {params: {id, token}});
  }
}
