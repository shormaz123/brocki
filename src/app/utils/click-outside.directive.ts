import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  elementClicked(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement && !this.elRef.nativeElement.contains(targetElement)) {
      this.clickOutside.emit();
    }
  }
}
