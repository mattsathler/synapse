import { Component, Input } from '@angular/core';
import { Separator } from '../separator/separator';

@Component({
  selector: 'page-header',
  imports: [Separator],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  @Input()
  public title: string = '';
}
