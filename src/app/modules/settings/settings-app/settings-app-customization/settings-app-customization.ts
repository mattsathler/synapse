import { Component } from '@angular/core';

@Component({
  selector: 'settings-app-customization',
  imports: [],
  templateUrl: './settings-app-customization.html',
  styleUrl: './settings-app-customization.scss'
})
export class SettingsAppCustomization {
  public theme: string = "light";

  constructor() {
    this.readTheme();
    return;
  }

  public toggleTheme(theme?: string): void {
    if (theme) {
      this.theme = theme;
    } else {
      this.theme = this.theme === "light" ? "dark" : "light";
    }

    document.body.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }

  public readTheme(): void {
    const themeCache = localStorage.getItem('theme');
    if (themeCache) {
      this.theme = (themeCache === 'light' || themeCache === 'dark') ? themeCache : 'light';
    }

    localStorage.setItem('theme', this.theme);
  }
}
