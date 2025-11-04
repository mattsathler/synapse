import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Avatar } from './avatar';

describe('Avatar Component', () => {
  let component: Avatar;
  let fixture: ComponentFixture<Avatar>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Avatar],
    }).compileComponents();

    fixture = TestBed.createComponent(Avatar);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.name).toBe('');
    expect(component.alt).toBe('User Avatar');
    expect(component.size).toBe('medium');
  });

  it('should render image when image input is provided', () => {
    component.image = 'https://example.com/avatar.png';
    fixture.detectChanges();

    const avatar = element.querySelector('.avatar') as HTMLDivElement;
    expect(avatar).toBeTruthy();
    expect(avatar.style.backgroundImage).toContain('https://example.com/avatar.png');
  });

  it('should show fallback with initials when no image is provided', () => {
    component.name = 'Matheus Sathler';
    fixture.detectChanges();

    const initials = element.textContent?.trim() || '';
    expect(initials.length).toBeGreaterThan(0);
  });

  it('should apply size class based on input', () => {
    const avatar = element.querySelector('.avatar') as HTMLDivElement;

    component.size = 'large';
    fixture.detectChanges();
    expect(avatar.classList).toContain('w-48');
    expect(avatar.classList).toContain('h-48');

    component.size = 'medium';
    fixture.detectChanges();
    expect(avatar.classList).toContain('w-40');
    expect(avatar.classList).toContain('h-40');

    component.size = 'small';
    fixture.detectChanges();
    expect(avatar.classList).toContain('w-24');
    expect(avatar.classList).toContain('h-24');
  });
});
