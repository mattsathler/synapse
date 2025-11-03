import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'tab',
    template: `<div animate.enter="slide-vertical-in" *ngIf="active"><ng-content></ng-content></div>`,
    imports: [CommonModule],
    standalone: true,
})
export class TabComponent {
    @Input() title!: string;
    @Input() icon!: string;
    public active = false;
}
