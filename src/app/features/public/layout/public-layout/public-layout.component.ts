import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { MainComponent } from '../../main/main.component';
import { FooterComponent } from '../../footer/footer.component';
import { ScrollTopComponent } from "../../scroll-top/scroll-top.component";

@Component({
  selector: 'app-public-layout',
  imports: [HeaderComponent, MainComponent, FooterComponent, ScrollTopComponent],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent {

}
