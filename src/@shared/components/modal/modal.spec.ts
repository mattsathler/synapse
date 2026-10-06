import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modal } from './modal';

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closes and emits the new visibility', () => {
    component.open = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('active')).toBeTrue();
    const change = jasmine.createSpy('change');
    component.openChange.subscribe(change);
    component.close();
    fixture.detectChanges();
    expect(component.open).toBeFalse();
    expect(change).toHaveBeenCalledWith(false);
    expect(fixture.nativeElement.classList.contains('active')).toBeFalse();
  });

});
