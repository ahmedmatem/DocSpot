import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { WeekModel } from '../models/week-schedule.model';

export type weekSchedulePayload = { startDate: Date, week: WeekModel }

@Injectable({
  providedIn: 'root'
})
export class WeekScheduleService {

  constructor(private http: HttpClient) { }

  save(dto: weekSchedulePayload){
    const url = `${environment.apiAdminBaseUrl}/week-schedule/`;
    return this.http.post(url, dto); // returns Observable<any>
  }

  handleSave(success: boolean) {

  }
}
