import { Component } from '@angular/core';
import { HeaderComponent } from "./core/layouts/header/header.component";
import { MainComponent } from "./core/layouts/main/main.component";
import { ScrollTopComponent } from "./core/layouts/scroll-top/scroll-top.component";
import { FooterComponent } from "./core/layouts/footer/footer.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    HeaderComponent, 
    MainComponent, 
    ScrollTopComponent, 
    FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'docspot3';
}
