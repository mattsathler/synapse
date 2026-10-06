import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecord } from './new-record';

describe('NewRecord', () => {
  let component: NewRecord;
  let fixture: ComponentFixture<NewRecord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRecord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRecord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('requires content, date and time and emits the record', () => {
    expect(component.recordForm.invalid).toBeTrue();
    const record = { content: '<p>Notes</p>', date: '2026-01-01', time: '09:00' };
    component.recordForm.setValue(record);
    expect(component.recordForm.valid).toBeTrue();
    expect(component.content.value).toBe(record.content);
    const save = jasmine.createSpy('save');
    component.saveRecord.subscribe(save);
    component.emitRecord();
    expect(save).toHaveBeenCalledWith(record);
  });

});
