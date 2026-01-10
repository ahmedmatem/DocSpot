import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl + '/holidays';

  getHolidaysForYear(year: number): Observable<Set<string>> {
    return this.http.get<string[]>(`${this.baseUrl}/${year}`).pipe(
      map(list => new Set(list)) // ISO strings yyyy-MM-dd
    );
  }

  getHolidaysRange(from: string, to: string): Observable<Set<string>> {
    return this.http.get<string[]>(`${this.baseUrl}?from=${from}&to=${to}`).pipe(
      map(list => new Set(list))
    );
  }

  getUpcomingHolidaysOneYearAhead(): Observable<Set<string>> {
    return this.http.get<string[]>(`${this.baseUrl}/upcoming`).pipe(
      map(list => new Set(list))
    );
  }
}
