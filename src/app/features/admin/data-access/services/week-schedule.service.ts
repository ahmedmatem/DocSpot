import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { WeekModel } from '../models/week-schedule.model';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

export type weekSchedulePayload = { startDate: string /**yyyy-mm-dd */, slotLength: number, weekSchedule: WeekModel }

@Injectable({ providedIn: 'root' })
export class WeekScheduleService {
  private readonly weeksSubject = new BehaviorSubject<weekSchedulePayload[] | null>(null);
  readonly weeks$ = this.weeksSubject.asObservable();

  private weeksCache: weekSchedulePayload[] = [];

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

  /** Get closest previous weekSchedule for current date/today */
  getActiveWeekSchedule() : weekSchedulePayload | undefined {
    const now = new Date();
    // normalize "today" to midnight
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let activeWeek: weekSchedulePayload | undefined;
    let closestTime = -Infinity;

    for(const startDateKey of this.weeksByStartDate.keys()) {
      const startDate = this.parseYyyyMmDd(startDateKey);
      const time = startDate.getTime();

      // only consider weeks that start in the past or today
      if (time <= today.getTime() && time > closestTime) {
        activeWeek = this.weeksByStartDate.get(startDateKey);
        closestTime = time;
      }
    }

    return activeWeek;

  }

  save(dto: weekSchedulePayload){
    const url = `${environment.apiAdminBaseUrl}/week-schedule/`;
    return this.http.post<weekSchedulePayload>(url, dto).pipe(
      tap(saved => {
        // update cache
        const others = this.weeksCache.filter(w => w.startDate !== saved.startDate);
        this.weeksCache = [...others, saved].sort((a, b) =>
          a.startDate.localeCompare(b.startDate)
        );
        // notify subscribers (layout)
        this.weeksSubject.next(this.weeksCache);
      })
    );
  }

  handleSave(success: boolean) {

  }

  /** Optional: clear cache (e.g. on logout) */
  clear() {
    this.weeksLoaded = false;
    this.weeksSubject.next(null);
    this.weeksByStartDate.clear();
  }

  private parseYyyyMmDd(dateStr: string): Date {
    const [yearStr, monthStr, dayStr] = dateStr.split('-');
    const day = Number(dayStr);
    const month = Number(monthStr) - 1; // JS months are 0-based
    const year = Number(yearStr);

    return new Date(year, month, day);
  }
}
