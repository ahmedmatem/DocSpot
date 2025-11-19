import { Component, input, Input, output, signal } from '@angular/core';

export type Slot = {time: string, available: boolean};

@Component({
  selector: 'app-time-slot',
  imports: [],
  templateUrl: './time-slot.component.html',
  styleUrl: './time-slot.component.css',
})
export class TimeSlotComponent {
  readonly selectedSlot = signal<string | null>(null);

  date = input.required<Date>();

  slots = input<Slot[]>([
    {time: '09:00', available: true},
    {time: '10:00', available: false},
    {time: '11:00', available: true},
    {time: '12:00', available: true},
    {time: '01:00', available: false},
    {time: '02:00', available: true},
    {time: '03:00', available: true},
    {time: '04:00', available: false},
  ]);

  slotSelected = output<string>();

  pick(time: string){
    this.selectedSlot.set(time);
    this.slotSelected.emit(time);
  }
}
