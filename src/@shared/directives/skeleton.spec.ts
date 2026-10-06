import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SkeletonDirective } from './skeleton';

@Component({ imports: [SkeletonDirective], template: `<span *skeleton="value; size: 2; className: classes">Ready</span>` })
class Host {
  value: unknown = null;
  classes = ['loading', 'rounded'];
}

describe('SkeletonDirective', () => {
  it('renders placeholders and replaces them with content when loaded', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelectorAll('skeleton-rect').length).toBe(2);
    expect(element.querySelector('skeleton-rect')?.classList.contains('rounded')).toBeTrue();
    expect(element.querySelector('span')).toBeNull();
    fixture.componentInstance.value = false;
    fixture.detectChanges();
    expect(element.querySelectorAll('skeleton-rect').length).toBe(0);
    expect(element.textContent).toContain('Ready');
    for (const value of [true, undefined, null]) {
      fixture.componentInstance.value = value;
      fixture.detectChanges();
      expect(element.querySelectorAll('skeleton-rect').length).toBe(2);
    }
    fixture.componentInstance.value = [];
    fixture.detectChanges();
    expect(element.textContent).toContain('Ready');
  });
});
