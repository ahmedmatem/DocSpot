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
  private url = environment.apiBaseUrl + '/appointments';
  private siteBaseUrl = environment.siteBaseUrl + '/appointment';

  constructor(private http: HttpClient) { }

  create(payload: CreateAppointmentPayload ) {
    return this.http.post(this.url, payload, { responseType: 'text' });
  }

  getSlots(date: string): Observable<Slot[]> {
     return this.http.get<Slot[]>(`${this.url}/${date}/slots`);
  }

  cancellationPreview(id: string, token:string) : Observable<CancelPreviewModel> {
    return this.http.get<CancelPreviewModel>(`${this.url}/cancellation/preview`, {params: {id, token}});
  }

  confirmPublic(id: string, token: string) {
    return this.http.get(`${this.siteBaseUrl}/public/confirm`, {params: {id, token}});
  }

  cancelPublic(id: string, token: string) {
    return this.http.get(`${this.siteBaseUrl}/public/cancel`, {params: {id, token}, responseType: 'text'});
  }
}
