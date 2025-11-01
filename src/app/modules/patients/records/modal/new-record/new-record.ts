import { Component, Input } from '@angular/core';
import { Record } from '../../../../../../@shared/types/Record';
import { RichTextEditor } from '../../../../../../@shared/components/rich-text/editor/rich-text-editor';

@Component({
  selector: 'new-record',
  imports: [RichTextEditor],
  templateUrl: './new-record.html',
  styleUrl: './new-record.scss'
})
export class NewRecord {
  @Input()
  public selectedRecord?: Record;

  public attachments: string[] = [];

}
