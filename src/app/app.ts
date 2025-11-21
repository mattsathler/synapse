import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../@shared/components/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { AuthService } from './modules/auth/auth-service';
import { Snackbar } from '../@shared/components/snackbar/snackbar';
import { SnackbarService } from '../@shared/components/snackbar/snackbar-service';
import { provideNgxMask } from 'ngx-mask';
import { ThemeService } from './theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, CommonModule, Snackbar],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  providers: [provideNgxMask()]

})
export class App {
  protected readonly title = signal('synapse');
  public isLoggedIn;

  public showSnackbar;

  constructor(private themeService: ThemeService, private authService: AuthService, private snackbarService: SnackbarService) {
    this.isLoggedIn = this.authService.employee;

    this.showSnackbar = this.snackbarService.show;
  }
}
