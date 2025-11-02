import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTask } from './settings-task';

describe('SettingsTask', () => {
  let component: SettingsTask;
  let fixture: ComponentFixture<SettingsTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
