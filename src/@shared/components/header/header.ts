import { Component, Input } from '@angular/core';
import { Separator } from '../separator/separator';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'page-header',
  imports: [CommonModule, Separator],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private router: Router) { }

  @Input()
  public title: string = '';

  @Input()
  public returnUrl: string = '';

  public return(): void {
    this.router.navigate([this.returnUrl]);
    return;
  }
}
