import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-appointment-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './appointment-layout.component.html',
  styleUrl: './appointment-layout.component.css'
})
export class AppointmentLayoutComponent {

}
