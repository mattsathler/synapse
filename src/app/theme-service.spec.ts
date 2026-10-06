import { ThemeService } from './theme-service';

describe('ThemeService', () => {
  let oldTheme: string | null;
  let oldAttribute: string | null;
  beforeEach(() => {
    oldTheme = localStorage.getItem('theme');
    oldAttribute = document.documentElement.getAttribute('data-theme');
  });
  afterEach(() => {
    if (oldTheme === null) localStorage.removeItem('theme'); else localStorage.setItem('theme', oldTheme);
    if (oldAttribute === null) document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', oldAttribute);
  });
  it('defaults to light and persists the theme', () => {
    localStorage.removeItem('theme');
    const service = new ThemeService();
    expect(service.theme()).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
  it('restores saved theme and updates signal, storage and DOM', () => {
    localStorage.setItem('theme', 'dark');
    const service = new ThemeService();
    expect(service.theme()).toBe('dark');
    service.setTheme('light');
    expect(service.theme()).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
