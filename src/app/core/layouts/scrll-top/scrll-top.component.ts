import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scrll-top',
  imports: [],
  templateUrl: './scrll-top.component.html',
  styleUrl: './scrll-top.component.css'
})
export class ScrllTopComponent {
  @ViewChild('scrollTopBtn', { static: true }) scrollTopBtn!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.toggleScrollTop(); // set initial state on load
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.toggleScrollTop();
  }

  scrollToTop(e: Event): void {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private toggleScrollTop(): void {
    const shouldShow = window.scrollY > 100;
    const btn = this.scrollTopBtn.nativeElement;
    if (shouldShow) {
      this.renderer.addClass(btn, 'active');
    } else {
      this.renderer.removeClass(btn, 'active');
    }
  }
}
