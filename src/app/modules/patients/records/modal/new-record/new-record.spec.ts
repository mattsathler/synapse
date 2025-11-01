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
});
