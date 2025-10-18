import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('headerEl', { static: true }) headerEl!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.toggleScrolled(); // set initial state after view renders
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.toggleScrolled();
  }

  private toggleScrolled(): void {
    const header = this.headerEl.nativeElement;
    const hasSticky =
      header.classList.contains('scroll-up-sticky') ||
      header.classList.contains('sticky-top') ||
      header.classList.contains('fixed-top');

    if (!hasSticky) {
      this.renderer.removeClass(document.body, 'scrolled');
      return;
    }

    if (window.scrollY > 100) {
      this.renderer.addClass(document.body, 'scrolled');
    } else {
      this.renderer.removeClass(document.body, 'scrolled');
    }
  }

  ngOnDestroy(): void {
    // nothing else to clean up because HostListener is auto-removed
    this.renderer.removeClass(document.body, 'scrolled');
  }
}
