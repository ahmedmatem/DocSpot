import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from "./core/layouts/header/header.component";
import { MainComponent } from "./core/layouts/main/main.component";
import { ScrollTopComponent } from "./core/layouts/scroll-top/scroll-top.component";
import { FooterComponent } from "./core/layouts/footer/footer.component";
import { isPlatformBrowser } from '@angular/common';
import * as AOS from 'aos';
import { RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    HeaderComponent,
    MainComponent,
    ScrollTopComponent,
    FooterComponent,
    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'docspot3';
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,      // animate only once
        // offset: 120,
        mirror: false    // do not animate while scrolling past back
      });
    }
  }
}
