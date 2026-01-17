import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import './lib/string-extensions'

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    const pre = document.getElementById('preloader');
    if (pre) {
      window.addEventListener('load', () => {
        pre.remove();
      });
    }
  })
  .catch((err) => console.error(err));
