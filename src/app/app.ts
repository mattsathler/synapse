import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../@shared/components/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { AuthService } from './modules/auth/auth-service';
import { Snackbar } from '../@shared/components/snackbar/snackbar';
import { SnackbarService } from '../@shared/components/snackbar/snackbar-service';
import { provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, CommonModule, Snackbar],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  providers: [provideNgxMask()]
  
})
export class App {
  protected readonly title = signal('synapse');
  public isLoggedIn: boolean = true;

  public showSnackbar;

  constructor(private authService: AuthService, private snackbarService: SnackbarService) {
    this.isLoggedIn = !!this.authService.user();

    this.showSnackbar = this.snackbarService.show;
  }
}
