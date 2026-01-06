import { Component } from '@angular/core';
import { SITE_INFO } from '../../../core/config/site-info';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  email: string = SITE_INFO.email;
  year: number = new Date().getFullYear();
}
