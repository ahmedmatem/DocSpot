import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdminAppointmentModel } from "../models/admin-appointment.model";
import { AdminAppointmentsQuery } from "../models/admin-appointments.query";
import { environment } from "../../../../../environments/environment";

[Injectable({ providedIn: 'root' })]
export class AdminAppointmentsService {
    private http = inject(HttpClient);
    private url = `${environment.apiAdminBaseUrl}/appointments`;

    getList(query: AdminAppointmentsQuery): Observable<AdminAppointmentModel[]> {
        let params = new HttpParams;

        if (query.from) params.set('from', query.from);
        if (query.to) params.set('to', query.to);
        if (query.q) params.set('q', query.q);
        if (query.status && query.status !== 'ALL') params.set('status', query.status);

        return this.http.get<AdminAppointmentModel[]>(this.url, { params });
    }

    cancel(id: string, reason: string | null) {
        return this.http.post(`${this.url}/${id}/cancel`, { reason: reason ?? null })
    }

    // reschedule(id: string, payload: { newDate: string; newTime: string; reason?: string }) { ... }
}