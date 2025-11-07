import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../@shared/components/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { ThemeService } from './theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('synapse');
  public isLoggedIn: boolean = true;

  constructor(private themeService: ThemeService) { }
}
