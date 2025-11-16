import { Component, computed, Input, signal } from '@angular/core';

export type TimeInterval = { start: string; end: string }; // "HH:MM"

@Component({
  selector: 'app-dayly-schedule-preview',
  imports: [],
  templateUrl: './dayly-schedule-preview.component.html',
  styleUrl: './dayly-schedule-preview.component.css'
})
export class DaylySchedulePreviewComponent {
  // Time intervals for the day, e.g. [{start: '08:00', end: '12:00'}, ...]
  @Input() set intervals(v: TimeInterval[] | null){
    this._intervals.set(v ?? [])
  }

  // Slot length in minutes, e.g. 20
  @Input() set slotLengthMinutes(v: number | null){
    this._slotLen.set(v ?? 0);
  }

  private _intervals = signal<TimeInterval[]>([]);
  private _slotLen = signal<number>(20);

  slots = computed(() => this.generateSlots(this._intervals(), this._slotLen()));

  // --- Helpers ---
  private parseHM(hm: string) : number {
    const [h, m] = hm.split(':').map(Number);
    return (h || 0) * 60 + (m || 0)
  }
  private pad2(n: number) { return (n < 10 ? '0' : '') + n; }
  private toHM(mins: number) : string {
    const h = Math.floor(mins / 60), m = mins % 60;
    return `${this.pad2(h)}:${this.pad2(m)}`;
  }

  private generateSlots(intervals: TimeInterval[], slotLen: number) : string[] {
    if(!slotLen || slotLen <= 0) return [];

    const clean = intervals
      .map(i => ({s: this.parseHM(i.start), e: this.parseHM(i.end)}))
      .filter(i => i.s < i.e)
      .sort((a,b) => a.s - b.s);

    // (optional) collapse overlaps
    const merged: {s:number;e:number}[] = [];
    for (const cur of clean) {
      const last = merged.at(-1);
      if (!last || cur.s > last.e) merged.push({ ...cur });
      else last.e = Math.max(last.e, cur.e);
    }

    const out: string[] = [];
    for (const r of merged) {
      let t = r.s;
      while (t + slotLen <= r.e) {
        out.push(`${this.toHM(t)} - ${this.toHM(t + slotLen)}`);
        t += slotLen;
      }
    }
    return out;
  }
}
