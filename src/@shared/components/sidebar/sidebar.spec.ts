import { NavigationService } from '../../services/navigation-service';
import { AuthService } from '../../auth/auth-service';
import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  let component: Sidebar;
  let navigationDocument: Document;
  let logout: jasmine.Spy;
  let resize: EventListener;
  beforeEach(() => {
    navigationDocument = { body: document.createElement('body'), location: { href: '' } } as unknown as Document;
    logout = jasmine.createSpy('logout');
    spyOn(window, 'addEventListener').and.callFake((type: string, listener: EventListenerOrEventListenerObject | null) => {
      if (type === 'resize') resize = listener as EventListener;
    });
    component = new Sidebar(new NavigationService(), { logout } as unknown as AuthService, navigationDocument);
  });
  it('loads navigation entries and defaults to light theme', () => {
    expect(component.sidebarItems.length).toBeGreaterThan(0);
    expect(component.currentTheme).toBe('light');
  });
  it('restores the document theme', () => {
    navigationDocument.body.setAttribute('data-theme', 'dark');
    component = new Sidebar(new NavigationService(), { logout } as unknown as AuthService, navigationDocument);
    expect(component.currentTheme).toBe('dark');
  });
  it('toggles and explicitly sets desktop visibility', () => {
    component.isMobile = false;
    component.toggleSidebar();
    expect(component.isOpen).toBeTrue();
    component.toggleSidebar(false);
    expect(component.isOpen).toBeFalse();
    component.toggleSidebar(true);
    expect(component.isOpen).toBeTrue();
  });
  it('ignores toggling on mobile', () => {
    component.isMobile = true;
    component.isOpen = false;
    component.toggleSidebar(true);
    expect(component.isOpen).toBeFalse();
  });
  it('closes the sidebar when resized to mobile', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(768);
    component.isOpen = true;
    resize(new Event('resize'));
    expect(component.isMobile).toBeTrue();
    expect(component.isOpen).toBeFalse();
  });

  it('logs out and redirects to login', () => {
    component.logout();
    expect(logout).toHaveBeenCalledTimes(1);
    expect(navigationDocument.location.href).toBe('/login');
  });

});
