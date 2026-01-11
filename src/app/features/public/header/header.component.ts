import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Renderer2, signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { SITE_INFO } from '../../../core/config/site-info';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @ViewChild('headerEl', { static: true }) headerEl!: ElementRef<HTMLElement>;

  showDoctorName = signal(false);

  phoneNumber = SITE_INFO.phoneNumber;
  email = SITE_INFO.email;

  isMobileNavOpen = false;
  private sub?: Subscription;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: Document,
    private router: Router
  ) {
    // Auto-close mobile nav on route change (optional but nice)
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.closeMobileNav());
  }

  ngAfterViewInit(): void {
    this.toggleScrolled(); // set initial state after view renders
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.toggleScrolled();
    this.showDoctorName.set(window.scrollY > 60);
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

    this.sub?.unsubscribe();
    this.renderer.removeClass(this.doc.body, 'mobile-nav-active');
  }

  // Mobile Nav Toggle
  toggleMobileNav(e?: Event): void {
    e?.preventDefault();
    this.isMobileNavOpen = !this.isMobileNavOpen;

    if (this.isMobileNavOpen) {
      this.renderer.addClass(this.doc.body, 'mobile-nav-active');
    } else {
      this.renderer.removeClass(this.doc.body, 'mobile-nav-active');
    }
  }

  closeMobileNavIfOpen(): void {
    if (this.isMobileNavOpen) this.toggleMobileNav();
  }

  closeMobileNav(): void {
    if (!this.isMobileNavOpen) return;
    this.isMobileNavOpen = false;
    this.renderer.removeClass(this.doc.body, 'mobile-nav-active');
  }

  // Handle dropdown toggles inside the nav (delegated)
  toggleDropdown(event: Event): void {
    event.preventDefault();
    event.stopImmediatePropagation();

    const a = event.currentTarget as HTMLElement;
    const li = a.parentElement;           // the <li class="dropdown">
    const next = a.nextElementSibling;    // the nested <ul>

    if (li) li.classList.toggle('active');
    if (next) next.classList.toggle('dropdown-active');
  }

  // Optional: if you want generic same-page link handling without adding (click) everywhere
  onNavClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (target.closest('a[href^="#"]')) this.closeMobileNavIfOpen();
  }
}
