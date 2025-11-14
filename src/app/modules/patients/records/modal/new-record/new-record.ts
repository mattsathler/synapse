import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Record } from '../../../../../../@shared/types/Record';
import { RichTextEditor } from '../../../../../../@shared/components/rich-text/editor/rich-text-editor';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'new-record',
  imports: [CommonModule, RichTextEditor, FormsModule, ReactiveFormsModule],
  templateUrl: './new-record.html',
  styleUrl: './new-record.scss'
})
export class NewRecord {
  @Input()
  public selectedRecord?: Record;

  @Output()
  public saveRecord = new EventEmitter<Record>();

  public recordForm!: FormGroup;
  public attachments: string[] = [];

  get content() {
    return this.recordForm.get('content') as FormControl;
  }

  constructor(private fb: FormBuilder) {
    this.recordForm = this.fb.group({
      content: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    })
  }

  public emitRecord(): void {
    this.saveRecord.emit(this.recordForm.value! as Record);
  }
}
