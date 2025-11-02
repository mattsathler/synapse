import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[clickSelf]'
})
export class ClickSelfDirective {
    @Output() clickSelf = new EventEmitter<MouseEvent>();

    constructor(private el: ElementRef) { }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        console.log(event.target === this.el.nativeElement)
        if (event.target === this.el.nativeElement) {
            this.clickSelf.emit();
        }
    }
}
