import { Component } from '@angular/core';
import { SnackbarService } from './snackbar-service';
import { CommonModule } from '@angular/common';

enum SnackTypes {
  warn,
  error,
  success,
  info
}

@Component({
  selector: 'snackbar',
  imports: [CommonModule],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.scss'
})
export class Snackbar {
  public text;
  public type;

  constructor(snackbarService: SnackbarService) {
    this.text = snackbarService.message;
    this.type = snackbarService.type;
  }
}
