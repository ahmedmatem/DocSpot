import { Component } from '@angular/core';
import Glightbox from 'glightbox';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  private lightbox?: ReturnType<typeof Glightbox>;

  ngAfterViewInit(): void {
    this.lightbox = Glightbox({
      selector: '.glightbox'
    });
  }

  ngDestroy(): void {
    this.lightbox?.destroy();
  }
}
