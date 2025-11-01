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
});
