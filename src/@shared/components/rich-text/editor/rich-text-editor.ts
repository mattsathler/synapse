import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { AbstractControl, Form, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'rich-text-editor',
  imports: [CommonModule, FormsModule, QuillModule, ReactiveFormsModule],
  templateUrl: './rich-text-editor.html',
  encapsulation: ViewEncapsulation.None,
})
export class RichTextEditor {
  content = '';

  @Input()
  public formController!: FormControl

  public editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ]
  };
}
