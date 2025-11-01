import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  @Input()
  public title: string = "";

  @HostBinding('class.active') get isActive() {
    return this.open;
  }

  public close(): void {
    this.open = false;
    this.openChange.emit(false);
  }
}
