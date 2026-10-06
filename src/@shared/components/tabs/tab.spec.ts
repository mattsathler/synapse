import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TabComponent } from './tab';
import { TabsComponent } from './tabs';

@Component({ imports: [TabComponent, TabsComponent], template: `<tabs><tab title="First">First content</tab><tab title="Second">Second content</tab></tabs>` })
class Host {}

describe('Tabs interaction', () => {
  it('selects the first tab and switches projected content', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const tabs = fixture.debugElement.children[0].componentInstance as TabsComponent;
    expect(tabs.active).toBe('First');
    expect(tabs.tabs.first.active).toBeTrue();
    expect(tabs.tabs.last.active).toBeFalse();
    expect(fixture.nativeElement.textContent).toContain('First content');
    tabs.select('Second');
    fixture.detectChanges();
    expect(tabs.tabs.first.active).toBeFalse();
    expect(tabs.tabs.last.active).toBeTrue();
    expect(fixture.nativeElement.textContent).toContain('Second content');
    expect(fixture.nativeElement.textContent).not.toContain('First content');
  });
});
