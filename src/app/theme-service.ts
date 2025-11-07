import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // --- signals ---
  private _theme = signal<string>('light');

  // --- derivated signals ---
  public theme = computed(() => this._theme());

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    this.setTheme(savedTheme ? savedTheme : 'light');
  }

  public setTheme(theme: string): void {
    this._theme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
