import { Component, ElementRef, QueryList, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  @ViewChild('faqRoot', { static: true }) faqRoot!: ElementRef<HTMLElement>;

  private unlisten: Array<() => void> = [];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const root = this.faqRoot.nativeElement;

    // Find the triggers
    const triggers = root.querySelectorAll('.faq-item h3, .faq-item .faq-toggle');

    triggers.forEach((el) => {
      const stop = this.renderer.listen(el, 'click', () => {
        const item = (el as HTMLElement).closest('.faq-item');
        if (!item) return;

        // Toggle the class safely with Renderer2
        if (item.classList.contains('faq-active')) {
          this.renderer.removeClass(item, 'faq-active');
        } else {
          this.renderer.addClass(item, 'faq-active');
        }
      });

      // keep the unlisten function to clean up later
      this.unlisten.push(stop);
    });
  }

  ngOnDestroy(): void {
    this.unlisten.forEach(fn => fn());
    this.unlisten = [];
  }
}
