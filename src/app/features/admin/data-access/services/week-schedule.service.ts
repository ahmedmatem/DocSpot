import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { WeekModel } from '../models/week-schedule.model';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

export type weekSchedulePayload = { startDate: string /**yyyy-mm-dd */, slotLength: number, weekSchedule: WeekModel }

@Injectable({ providedIn: 'root' })
export class WeekScheduleService {
  private readonly weeksSubject = new BehaviorSubject<weekSchedulePayload[] | null>(null);
  readonly weeks$ = this.weeksSubject.asObservable;

  // quick lookup by startDate
  private readonly weeksByStartDate = new Map<string, weekSchedulePayload>();
  
  private weeksLoaded = false;

  constructor(private http: HttpClient) { }

  /** Load ALL week schedules from API (only once) */
  loadAll(): Observable<weekSchedulePayload[]> {
    if(this.weeksLoaded && this.weeksSubject.value){
      // already loaded -> reuse
      return of(this.weeksSubject.value);
    }

    const url = `${environment.apiAdminBaseUrl}/all-week-schedule/`;
    return this.http
      .get<weekSchedulePayload[]>(url)
      .pipe(
        tap(weeks => {
          this.weeksLoaded = true;
          this.weeksSubject.next(weeks);
          this.weeksByStartDate.clear();
          for (const w of weeks) {
            this.weeksByStartDate.set(w.startDate, w);
          }
        })
      );
  }

  /** Get a week schedule by exact startDate (yyyy-mm-dd) after loadAll() */
  getWeekByStartDate(startDate: string): weekSchedulePayload | undefined {
    return this.weeksByStartDate.get(startDate);
  }

  save(dto: weekSchedulePayload){
    const url = `${environment.apiAdminBaseUrl}/week-schedule/`;
    return this.http.post(url, dto); // returns Observable<any>
  }

  handleSave(success: boolean) {

  }

  /** Optional: clear cache (e.g. on logout) */
  clear() {
    this.weeksLoaded = false;
    this.weeksSubject.next(null);
    this.weeksByStartDate.clear();
  }
}
