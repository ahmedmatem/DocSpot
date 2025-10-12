import { Component } from '@angular/core';
import { HeroComponent } from "./sections/hero/hero.component";

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [HeroComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
