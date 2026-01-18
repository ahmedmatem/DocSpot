import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiBaseUrl + '/holidays';

  getAllFor(year: number): Observable<Set<string>> {
    return this.http.get<string[]>(`${this.apiUrl}/year/${year}`).pipe(
      map(list => new Set(list)) // ISO strings yyyy-MM-dd
    );
  }

  getInRange(from: string, to: string): Observable<Set<string>> {
    return this.http.get<string[]>(`${this.apiUrl}?from=${from}&to=${to}`).pipe(
      map(list => new Set(list))
    );
  }

  getUpcoming(months: number = 12): Observable<Set<string>> {
    const url = months == null
      ? `${this.apiUrl}/upcoming?months=12`
      : `${this.apiUrl}/upcoming`;

    return this.http.get<string[]>(url).pipe(
      map(list => new Set(list))
    );
  }
}
