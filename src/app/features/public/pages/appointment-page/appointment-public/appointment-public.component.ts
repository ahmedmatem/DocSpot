import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CancelPreviewModel } from '../../../../../core/data-access/models/appointment.model';
import { AppointmentService } from '../../../../../core/data-access/services/appointment.service';
import { VisitTypeBgPipe } from '../../../../../shared/pipes/visittype-bg.pipe';
import { DatePipe, SlicePipe } from '@angular/common';
import { finalize } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-appointment-manage',
  imports: [VisitTypeBgPipe, DatePipe, SlicePipe],
  templateUrl: './appointment-public.component.html',
  styleUrl: './appointment-public.component.css'
})
export class AppointmentPublicComponent {
  private route = inject(ActivatedRoute);
  private appointmentService = inject(AppointmentService);

  contactPhone = environment.contactPhone;
  contactEmail = environment.contactEmail;

  id = signal<string | null>(null);
  token = signal<string | null>(null);

  loading = signal(false);
  error = signal<string | null>(null);
  actionLoading = signal(false);
  appt = signal<CancelPreviewModel | null>(null);
  
  ngOnInit() {            
    this.route.queryParamMap.subscribe(p => {
      this.id.set(p.get('id'));
      this.token.set(p.get('token'));

      if (!this.id() || !this.token()) {
        this.error.set('Невалиден линк');
        this.loading.set(false);
        return;
      }

      this.loading.set(true);
      this.error.set(null);
      this.appt.set(null);

      this.appointmentService.getCancelPreview(this.id()!, this.token()!)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: (appt) => {
            this.appt.set(appt);
          },
          error: (err) => {
            this.error.set("Вашия линк за отказване на час е неправилен или времето за отказване е изтекло.");
          }
        });
    });
  }

  onCancel() {
    if (!this.id() || !this.token()) {
      this.error.set('Невалиден линк');
      return;
    }
  }
}
