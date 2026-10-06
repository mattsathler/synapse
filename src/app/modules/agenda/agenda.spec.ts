import { TestBed } from '@angular/core/testing';
import { ElementRef, QueryList, signal } from '@angular/core';
import { EmployeesService } from '../employees/employees-service';
import { Employee } from '../../../@shared/types/Employee';
import { Task } from '../../../@shared/types/Task';
import { Agenda } from './agenda';

describe('Agenda', () => {
  let component: Agenda;
  const makeTask = (start: number, end: number): Task => ({ title: 'Consult', start: new Date(2026, 0, 1, start), end: new Date(2026, 0, 1, end), employees: [], patient: null, type: 1, status: 1 });
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{ provide: EmployeesService, useValue: { getEmployeesList: jasmine.createSpy('getEmployeesList'), employeesList: signal([]), isLoading: signal(false) } }] });
    component = TestBed.createComponent(Agenda).componentInstance;
    component.slotRefs = new QueryList<ElementRef>();
    component.slotRefs.reset([new ElementRef({ offsetHeight: 60 })]);
  });
  it('creates 24 consecutive hourly slots', () => {
    component.ngOnInit();
    expect(component.timeSlots.length).toBe(24);
    component.timeSlots.forEach((slot, hour) => {
      expect(slot.start.getHours()).toBe(hour);
      expect(slot.end.getTime() - slot.start.getTime()).toBe(3600000);
    });
  });
  it('toggles employees without duplicates', () => {
    const employee = { id: '1', tasks: [] } as unknown as Employee;
    component.toggleEmployee(employee);
    expect(component.selectedEmployees).toEqual([employee]);
    component.toggleEmployee(employee);
    expect(component.selectedEmployees).toEqual([]);
    component.toggleEmployee();
    expect(component.selectedEmployees).toEqual([]);
  });
  it('positions appointments and divides overlapping appointments into columns', () => {
    // The slot height is measured by the view; inject that measurement for this layout test.
    (component as any).slotHeight = 60;
    const employee = { id: '1', tasks: [makeTask(9, 11), makeTask(10, 12), makeTask(12, 13)] } as unknown as Employee;
    component.selectedEmployees = [employee];
    component.adjustTasks();
    expect(employee.tasks.map(t => ({ top: t.top, height: t.height, width: t.width, left: t.left }))).toEqual([
      { top: 538, height: 120, width: '50%', left: '0%' },
      { top: 598, height: 120, width: '50%', left: '50%' },
      { top: 718, height: 60, width: '100%', left: '0%' }
    ]);
  });
  it('handles zero-height tasks separately', () => {
    (component as any).slotHeight = 60;
    const employee = { id: '1', tasks: [makeTask(9, 9), makeTask(9, 10)] } as unknown as Employee;
    component.selectedEmployees = [employee];
    component.adjustTasks();
    expect(employee.tasks.every(t => t.width === '100%')).toBeTrue();
  });
  it('positions the current-time needle and handles absent slots', () => {
    jasmine.clock().install();
    try {
      jasmine.clock().mockDate(new Date(2026, 0, 1, 10, 30));
      component.updateNeedlePosition();
      expect(component.needleTop).toBe(638);
      component.slotRefs.reset([]);
      component.updateNeedlePosition();
      expect(component.needleTop).toBe(638);
    } finally { jasmine.clock().uninstall(); }
  });
  it('centers the needle without scrolling above the top', () => {
    component.scrollToNeedle();
    const scrollTo = jasmine.createSpy('scrollTo');
    component.agendaContainerRef = new ElementRef({ offsetHeight: 200, scrollTo });
    component.needleTop = 50;
    component.scrollToNeedle();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    component.needleTop = 500;
    component.scrollToNeedle();
    expect(scrollTo).toHaveBeenCalledWith({ top: 400, behavior: 'smooth' });
  });
  it('opens a blank appointment modal', () => {
    component.selectedTask = makeTask(9, 10);
    component.newTask();
    expect(component.selectedTask).toBeNull();
    expect(component.modalOpen).toBeTrue();
  });

  it('moves columns horizontally with the navigation controls', () => {
    const scrollBy = jasmine.createSpy('scrollBy');
    component.agendaContainerRef = new ElementRef({ clientWidth: 500, scrollBy });
    component.scrollAgenda(1);
    expect(scrollBy).toHaveBeenCalledWith({ left: 400, behavior: 'smooth' });
    component.scrollAgenda(-1);
    expect(scrollBy).toHaveBeenCalledWith({ left: -400, behavior: 'smooth' });
  });

  it('supports Shift + mouse wheel without intercepting normal vertical or horizontal gestures', () => {
    const container = { clientWidth: 500, scrollWidth: 1500, scrollLeft: 0 };
    component.agendaContainerRef = new ElementRef(container);
    const shifted = new WheelEvent('wheel', { shiftKey: true, deltaY: 100, cancelable: true });
    component.scrollAgendaWithWheel(shifted);
    expect(container.scrollLeft).toBe(100);
    expect(shifted.defaultPrevented).toBeTrue();
    const vertical = new WheelEvent('wheel', { deltaY: 100, cancelable: true });
    component.scrollAgendaWithWheel(vertical);
    const horizontal = new WheelEvent('wheel', { shiftKey: true, deltaX: 100, cancelable: true });
    component.scrollAgendaWithWheel(horizontal);
    expect(container.scrollLeft).toBe(100);
    expect(vertical.defaultPrevented).toBeFalse();
    expect(horizontal.defaultPrevented).toBeFalse();
  });

  it('preserves wheel behavior when all columns fit', () => {
    const container = { clientWidth: 500, scrollWidth: 500, scrollLeft: 0 };
    component.agendaContainerRef = new ElementRef(container);
    const event = new WheelEvent('wheel', { shiftKey: true, deltaY: 100, cancelable: true });
    component.scrollAgendaWithWheel(event);
    expect(event.defaultPrevented).toBeFalse();
    expect(container.scrollLeft).toBe(0);
  });

  it('measures slots, positions the needle and refreshes it periodically', () => {
    jasmine.clock().install();
    try {
      const update = spyOn(component, 'updateNeedlePosition');
      const scroll = spyOn(component, 'scrollToNeedle');
      component.ngAfterViewInit();
      jasmine.clock().tick(1);
      expect(update).toHaveBeenCalled();
      expect(scroll).toHaveBeenCalledTimes(1);
      const calls = update.calls.count();
      jasmine.clock().tick(2);
      expect(update.calls.count()).toBeGreaterThan(calls);
    } finally { jasmine.clock().uninstall(); }
  });

});
