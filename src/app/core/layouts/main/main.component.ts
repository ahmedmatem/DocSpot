import { Component } from '@angular/core';
import { HeroComponent } from "./sections/hero/hero.component";
import { AboutComponent } from "./sections/about/about.component";
import { StatsComponent } from "./sections/stats/stats.component";
import { ServicesComponent } from "./sections/services/services.component";
import { AppointmentComponent } from "./sections/appointment/appointment.component";
import { DepartmentsComponent } from "./sections/departments/departments.component";
import { DoctorsComponent } from "./sections/doctors/doctors.component";
import { FaqComponent } from "./sections/faq/faq.component";
import { TestimonialComponent } from "./sections/testimonial/testimonial.component";
import { GalleryComponent } from "./sections/gallery/gallery.component";
import { ContactComponent } from "./sections/contact/contact.component";

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [
    HeroComponent,
    AboutComponent,
    StatsComponent,
    ServicesComponent,
    AppointmentComponent,
    DepartmentsComponent,
    DoctorsComponent,
    FaqComponent,
    TestimonialComponent,
    GalleryComponent,
    ContactComponent
],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
