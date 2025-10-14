import { Component, Input } from '@angular/core';

@Component({
  selector: 'avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss'
})
export class Avatar {
  @Input() image: string = '';
  @Input() alt: string = 'User Avatar';
}
