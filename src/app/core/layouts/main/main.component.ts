import { Component } from '@angular/core';
import { HeroComponent } from "./sections/hero/hero.component";
import { AboutComponent } from "./sections/about/about.component";

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [HeroComponent, AboutComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
