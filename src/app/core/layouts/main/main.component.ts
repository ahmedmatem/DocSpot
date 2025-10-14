import { Component } from '@angular/core';
import { HeroComponent } from "./sections/hero/hero.component";
import { AboutComponent } from "./sections/about/about.component";
import { StatsComponent } from "./sections/stats/stats.component";
import { ServicesComponent } from "./sections/services/services.component";
import { AppointmentComponent } from "./sections/appointment/appointment.component";
import { DepartmentsComponent } from "./sections/departments/departments.component";
import { DoctorsComponent } from "./sections/doctors/doctors.component";
import { FaqComponent } from "./sections/faq/faq.component";

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [HeroComponent, AboutComponent, StatsComponent, ServicesComponent, AppointmentComponent, DepartmentsComponent, DoctorsComponent, FaqComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
