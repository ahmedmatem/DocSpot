import { Component, computed, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, RouterLink, Router } from "@angular/router";

type Tab = { label: string, start: string | 'current' };

@Component({
  selector: 'app-week-schedule-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './week-schedule-layout.component.html',
  styleUrl: './week-schedule-layout.component.css'
})
export class WeekScheduleLayoutComponent {
  readonly starts = signal<string[]>([
    '2025-10-02',
    '2025-11-02',
    '2025-12-10'
  ]);

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
