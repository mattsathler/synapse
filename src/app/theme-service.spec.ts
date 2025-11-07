import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ThemeService } from './theme-service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get theme and set theme', fakeAsync(() => {
    service.setTheme('dark');
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    tick(2000);
    service.setTheme('light');
    expect(service.theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  }));
});
