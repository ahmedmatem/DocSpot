import { Component, input, Input, output, signal } from '@angular/core';

type Slot = {time: string, awailable: boolean};

@Component({
  selector: 'app-time-slot',
  imports: [],
  templateUrl: './time-slot.component.html',
  styleUrl: './time-slot.component.css'
})
export class TimeSlotComponent {
  readonly selectedSlot = signal<string | null>(null);

  date = input.required<Date>();
  slots = input<Slot[]>([
    {time: '09:00', awailable: true},
    {time: '10:00', awailable: false},
    {time: '11:00', awailable: true},
    {time: '12:00', awailable: true},
    {time: '01:00', awailable: false},
    {time: '02:00', awailable: true},
    {time: '03:00', awailable: true},
    {time: '04:00', awailable: false},
  ]);

  // slotSelected = output<{time: string, date: Date}>();

  pick(time: string){
    this.selectedSlot.set(time);
    // this.slotSelected.emit({time, date: this.date()});
  }
}
