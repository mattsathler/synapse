import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../@shared/components/sidebar/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('synapse');

  public isLoggedIn: boolean = true;
  public theme?: "light" | "dark";

  constructor() {
    this.loadTheme();
  }

  public loadTheme() {
    const cachedTheme = localStorage.getItem('theme');
    this.theme = (cachedTheme === 'dark' || cachedTheme === 'light') ? cachedTheme : 'light';

    this.setTheme();
  }

  public setTheme() {
    document.body.setAttribute('data-theme', this.theme ?? 'light');
  }
}
