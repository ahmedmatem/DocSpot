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
  private apiUrl = environment.apiBaseUrl + '/appointments';

  constructor(private http: HttpClient) { }

  create(payload: CreateAppointmentPayload ) {
    return this.http.post(this.apiUrl, payload, { responseType: 'text' });
  }

  getSlots(date: string): Observable<Slot[]> {
     return this.http.get<Slot[]>(`${this.apiUrl}/${date}/slots`);
  }

  cancellationPreview(id: string, token:string) : Observable<CancelPreviewModel> {
    return this.http.get<CancelPreviewModel>(`${this.apiUrl}/cancellation/preview`, {params: {id, token}});
  }

  confirmPublic(id: string, token: string) {
    return this.http.get(`${this.apiUrl}/confirm`, {params: {id, token}});
  }

  cancelPublic(id: string, token: string) {
    // POST /api/appointments/cancellation/preview?id=...&token=...
    return this.http.post(`${this.apiUrl}/cancellation`, null, {params: {id, token}, responseType: 'text'});
  }
}
