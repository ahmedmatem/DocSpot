import { Component } from '@angular/core';
import { HeroComponent } from "./sections/hero/hero.component";
import { AboutComponent } from "./sections/about/about.component";
import { StatsComponent } from "./sections/stats/stats.component";
import { ServicesComponent } from "./sections/services/services.component";
import { AppointmentComponent } from "./sections/appointment/appointment.component";

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [HeroComponent, AboutComponent, StatsComponent, ServicesComponent, AppointmentComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
