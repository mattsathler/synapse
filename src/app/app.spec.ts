import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should read cached theme from localStorage', fakeAsync(() => {
    const fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;

    localStorage.setItem('theme', 'dark');
    component.loadTheme();
    tick();

    expect(component.theme).toBe('dark');
  }))

  it('should load cached theme from localStorage', fakeAsync(() => {
    const fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;

    localStorage.setItem('theme', 'dark');
    component.setTheme();
    tick();

    expect(document.body.getAttribute('data-theme')).toBe('dark');
  }));
});
