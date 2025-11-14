import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RichTextEditor } from './rich-text-editor';
import { FormControl } from '@angular/forms';

describe('RichTextEditor', () => {
  let component: RichTextEditor;
  let fixture: ComponentFixture<RichTextEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTextEditor]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RichTextEditor);
    component = fixture.componentInstance;

    component.formController = new FormControl({
      value: '',
      disabled: false
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
