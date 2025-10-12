import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/layouts/header/header.component";
import { MainComponent } from "./core/layouts/main/main.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HeaderComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'docspot3';
}
