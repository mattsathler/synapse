import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'avatar',
  imports: [CommonModule],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss'
})
export class Avatar {
  @Input() image?: string;
  @Input() name: string = '';
  @Input() alt: string = 'Employee Avatar';

  @Input() size: "small" | "medium" | "large" = "medium";
}
