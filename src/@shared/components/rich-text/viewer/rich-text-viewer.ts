import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'rich-text-viewer',
  imports: [QuillEditorComponent],
  templateUrl: './rich-text-viewer.html',
  encapsulation: ViewEncapsulation.None,

})
export class RichTextViewer {
  safeContent: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) { }

  @Input() set content(value: string) {
    this.safeContent = this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
