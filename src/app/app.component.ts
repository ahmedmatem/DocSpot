import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/layouts/header/header.component";
import { MainComponent } from "./core/layouts/main/main.component";
import { ScrllTopComponent } from "./core/layouts/scrll-top/scrll-top.component";
import { FooterComponent } from "./core/layouts/footer/footer.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    HeaderComponent, 
    MainComponent, 
    ScrllTopComponent, 
    FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'docspot3';
}
