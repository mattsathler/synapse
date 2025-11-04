import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation-service';

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a navigation array', () => {
    expect(Array.isArray(service.getNavigation())).toBeTruthy();
  })

  it('should return an array of navigation items with title and route', () => {
    const navigation = service.getNavigation();

    expect(Array.isArray(navigation)).toBeTrue();
    expect(navigation.length).toBeGreaterThan(0);

    navigation.forEach(item => {
      expect(item).toEqual(
        jasmine.objectContaining({
          title: jasmine.any(String),
          children: jasmine.any(Array)
        })
      );

      if (item.children && item.children.length > 0) {
        item.children.forEach(child => {
          expect(child).toEqual(
            jasmine.objectContaining({
              icon: jasmine.any(String),
              route: jasmine.any(String),
              label: jasmine.any(String)
            })
          );
        });
      };
    });
  });
});
