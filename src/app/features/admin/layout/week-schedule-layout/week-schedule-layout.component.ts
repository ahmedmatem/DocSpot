import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, RouterLink, Router } from "@angular/router";
import { weekSchedulePayload, WeekScheduleService } from '../../data-access/services/week-schedule.service';

type Tab = { label: string, start: string | 'current' };

@Component({
  selector: 'app-week-schedule-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './week-schedule-layout.component.html',
  styleUrl: './week-schedule-layout.component.css'
})
export class WeekScheduleLayoutComponent {
  weekScheduleService = inject(WeekScheduleService);

  // observable – useful for list somewhere
  weeks$ = this.weekScheduleService.weeks$;

  // local cache for synchronous access
  private weeks: weekSchedulePayload[] = [];

  selectedWeek: weekSchedulePayload | undefined = undefined;
  
  readonly starts = signal<string[]>([
    // ...this.weeks.map(wsp => wsp.startDate)
    // '2025-10-02',
    // '2025-11-02',
    // '2025-12-10'
  ]);

  ngOnInit() {
    this.weekScheduleService.loadAll().subscribe(weeks => {
      this.weeks = weeks ?? [];

      // pick an initial week - active one
      const activeWeek = this.weekScheduleService.getActiveWeekSchedule();
      this.selectedWeek = activeWeek;

      // now weeks are loaded, update the signal
      this.starts.set(this.weeks.map(wsp => wsp.startDate));
    });
  }

  readonly tabs = computed<Tab[]>(() => [
    ...this.starts().map(d => ({
      label: `От ${d.replaceAll('-', '/')}`,
      start: d
    })),
    { label: 'Актуално', start: 'current'}
  ]);

  constructor(private router: Router){}

  // track function used by @for
  trackByTab = (index: number, tab: Tab) => tab.start;

  addTab(startDateISO: string) {
    this.starts.update(arr => [...arr, startDateISO]);
    // optionally navigate to it, if you want:
    this.router.navigate(['/admin/schedule', startDateISO]);
  }
}
