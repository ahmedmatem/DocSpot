import { Component } from '@angular/core';
import { SITE_INFO } from '../../../../../core/config/site-info';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  siteInfo = SITE_INFO;
}
