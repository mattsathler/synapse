import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'rich-text-editor',
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './rich-text-editor.html',
  styleUrls: ['./rich-text-editor.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RichTextEditor {
  content = '';

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  };
}
