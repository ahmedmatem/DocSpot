import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

@Component({
  selector: 'app-testimonial',
  imports: [],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent {
  // Grab all swipers with the #initSwiper template ref
  @ViewChildren('initSwiper') swiperEls!: QueryList<ElementRef<HTMLElement>>;

  private swipers: Swiper[] = [];

  ngAfterViewInit() {
    // (Only needed for Swiper < v9) Swiper.use([Autoplay, Pagination]);
    this.initSwipers();
  }

  ngOnDestroy(): void {
    // Clean up instances
    this.swipers.forEach(s => s.destroy(true, true));
    this.swipers = [];
  }

  initSwipers() {
    const defaultConfig = {
      loop: true,
      speed: 600,
      autoplay: { delay: 5000 },
      slidesPerView: 'auto' as const,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets' as const,
        clickable: true
      },
      modules: [Autoplay, Pagination] // Swiper v9+
    };

    this.swiperEls.forEach(ref => {
      const el = ref.nativeElement;

      // If you need the "swiper-tab" special behavior:
      if (el.classList.contains('swiper-tab')) {
        const config = {
          ...defaultConfig,
          // add/tab-specific options here
        };
        this.swipers.push(new Swiper(el, config));
      } else {
        this.swipers.push(new Swiper(el, defaultConfig));
      }
    });
  }

}
