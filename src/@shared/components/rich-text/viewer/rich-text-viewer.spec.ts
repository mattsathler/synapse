import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextViewer } from './rich-text-viewer';

describe('RichTextViewer', () => {
  let component: RichTextViewer;
  let fixture: ComponentFixture<RichTextViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTextViewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RichTextViewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders provided rich text and updates content', () => {
    component.content = '<p><strong>Notes</strong></p>';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('strong').textContent).toBe('Notes');
    component.content = '<p>Updated</p>';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Updated');
    expect(fixture.nativeElement.querySelector('strong')).toBeNull();
  });

});
