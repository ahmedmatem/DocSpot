import { Component } from '@angular/core';
declare const PureCounter: any;

@Component({
  standalone: true,
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  ngAfterViewInit(): void {
    new PureCounter();
  }
}
