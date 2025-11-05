import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SettingsAppCustomization } from './settings-app-customization';

describe('SettingsAppCustomization', () => {
  let component: SettingsAppCustomization;
  let fixture: ComponentFixture<SettingsAppCustomization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsAppCustomization]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SettingsAppCustomization);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change theme', (done) => {
    const nextTheme = component.theme === 'dark' ? 'light' : 'dark';
    const checkbox = fixture.nativeElement.querySelector('#themeToggler');
    fixture.detectChanges();

    checkbox.checked = false;
    checkbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.theme).toBe(nextTheme);
    expect(document.body.getAttribute('data-theme')).toBe(nextTheme);
    done()
  })

  it('should load theme from document', fakeAsync(() => {
    fixture = TestBed.createComponent(SettingsAppCustomization);
    component = fixture.componentInstance;

    component.readTheme();
    tick();
    const theme = document.body.getAttribute('data-theme');
    expect(component.theme).toBe(theme!);
  }))

  it('should load theme from localstorage', fakeAsync(() => {
    fixture = TestBed.createComponent(SettingsAppCustomization);
    component = fixture.componentInstance;
    component.toggleTheme('dark');

    tick();

    expect(component.theme).toBe('dark');
    expect(document.body.getAttribute('data-theme')).toBe('dark');
  }))
});
