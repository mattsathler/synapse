import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Header } from '../../../@shared/components/header/header';
import { Task as ITask } from '../../../@shared/types/Task';
import { Task } from './task/task';
import { CommonModule } from '@angular/common';
import { AgendaService } from './agenda-service';
import { Avatar } from '../../../@shared/components/avatar/avatar';
import { Employee } from '../../../@shared/types/Employee';
import { Modal } from '../../../@shared/components/modal/modal';
import { NewTask } from './task/new-task/new-task';
import { getMockedEmployees } from '../../../@shared/mockups/Employees';
import { BehaviorSubject } from 'rxjs';
import { EmployeesService } from '../employees/employees-service';
import { SkeletonDirective } from '../../../@shared/directives/skeleton';

interface TimeSlot {
  start: Date;
  end: Date;
}

@Component({
  selector: 'app-agenda',
  imports: [CommonModule, Header, Task, Avatar, Modal, NewTask, SkeletonDirective],
  templateUrl: './agenda.html',
  styleUrl: './agenda.scss'
})
export class Agenda implements OnInit, AfterViewInit {
  @ViewChildren('slotRef') slotRefs!: QueryList<ElementRef>;
  @ViewChildren('agendaRef') agendaRefs!: QueryList<ElementRef>;
  @ViewChild('agendaContainer', { static: false }) agendaContainerRef!: ElementRef;

  public timeSlots: TimeSlot[] = [];
  public tasks: ITask[] = [];
  public needleTop: number = 0;

  public employeesList;
  public isLoadingEmployees;

  public selectedEmployees: Employee[] = [];
  public isAllSelected: boolean = false;
  public selectedTask: ITask | null = null;

  public modalOpen: boolean = false;

  private slotHeight: number = 0;

  constructor(private service: AgendaService, private employeesService: EmployeesService) {
    this.employeesService.getEmployeesList();
    this.employeesList = this.employeesService.employeesList;
    this.isLoadingEmployees = this.employeesService.isLoading;
  }

  ngOnInit() {
    this.timeSlots = Array.from({ length: 24 }, (_, hour) => {
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, 0, 0, 0);
      const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour + 1, 0, 0, 0);

      return { start, end };
    });

  }

  ngAfterViewInit() {
    const firstSlot = this.slotRefs.first?.nativeElement;
    this.slotHeight = firstSlot.offsetHeight + 0.5;

    setTimeout(() => {
      this.updateNeedlePosition();
      this.scrollToNeedle();

      setInterval(() => {
        this.updateNeedlePosition();
      }, 1);
    });
  }

  public adjustTasks(): void {
    this.selectedEmployees.forEach(employee => {
      employee.tasks = employee.tasks.map(task => {
        const startDate = task.start;
        const endDate = task.end;
        const startHour = startDate.getHours() + startDate.getMinutes() / 60;
        const endHour = endDate.getHours() + endDate.getMinutes() / 60;
        const durationHours = endHour - startHour;

        const top = (startHour * this.slotHeight) - 2;
        const height = durationHours * this.slotHeight;

        return { ...task, top, height };
      });
      this.resolveOverlaps(employee.tasks);
    });
  }

  private resolveOverlaps(tasks: ITask[]) {
    const overlaps: ITask[][] = [];

    tasks.forEach(task => {
      let groupFound = false;
      for (const group of overlaps) {
        if (group.some(t => this.isOverlapping(t, task))) {
          group.push(task);
          groupFound = true;
          break;
        }
      }
      if (!groupFound) overlaps.push([task]);
    });

    overlaps.forEach(group => {
      const width = 100 / group.length;
      group.forEach((task, index) => {
        task.width = `${width}%`;
        task.left = `${(index * width)}%`;
      });
    });
  }

  private isOverlapping(a: ITask, b: ITask): boolean {
    if (!(a.top && b.top && b.height && a.height)) {
      return false
    };
    return a.top < b.top + b.height && b.top < a.top + a.height;
  }

  public scrollToNeedle() {
    const container = this.agendaContainerRef?.nativeElement;
    if (!container) return;

    const containerHeight = container.offsetHeight;
    const scrollPosition = this.needleTop - containerHeight / 2;

    container.scrollTo({ top: scrollPosition > 0 ? scrollPosition : 0, behavior: 'smooth' });
  }

  public toggleEmployee(employee?: Employee): void {
    if (employee) {
      const index = this.selectedEmployees.findIndex(emp => emp.id === employee.id);
      if (index > -1) {
        this.selectedEmployees.splice(index, 1);
      } else {
        this.selectedEmployees.push(employee);
      }
    }
    
    this.updateNeedlePosition();
    this.adjustTasks();
  }


  updateNeedlePosition() {
    const slots = this.slotRefs.toArray();
    if (slots.length === 0) return;

    const firstSlot = slots[0].nativeElement;
    const slotHeight = firstSlot.offsetHeight;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const fullHoursOffset = currentHour * slotHeight;
    const minuteOffset = (currentMinute / 60) * slotHeight;

    this.needleTop = fullHoursOffset + minuteOffset + 8;
  }

  public newTask(): void {
    this.selectedTask = null;
    this.modalOpen = true;
  }
}
