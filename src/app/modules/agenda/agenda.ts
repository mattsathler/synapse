import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Header } from '../../../@shared/components/header/header';
import { Task as ITask } from '../../../@shared/types/Task';
import { Task } from './task/task';
import { CommonModule } from '@angular/common';
import { AgendaService } from './agenda-service';
import { Separator } from '../../../@shared/components/separator/separator';

interface TimeSlot {
  start: Date;
  end: Date;
}

@Component({
  selector: 'app-agenda',
  imports: [CommonModule, Header, Task, Separator],
  templateUrl: './agenda.html',
  styleUrl: './agenda.scss'
})
export class Agenda implements OnInit, AfterViewInit {
  @ViewChildren('slotRef') slotElements!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('agendaRef') agendaRefs!: QueryList<ElementRef>;

  public needleTops: number[] = [];

  public timeSlots: TimeSlot[] = [];
  public tasks: ITask[] = [];
  public needleTop: number = 0;
  public happening: ITask[] = [];

  public selectedEmployees: { name: string, tasks: ITask[] }[] = [];
  private slotHeight: number = 0;

  constructor(private service: AgendaService) {
    this.tasks = this.service.getMockedAgenda();

    this.selectedEmployees = [
      {
        name: "Thalles Gonçalves",
        tasks: this.service.getMockedAgenda()
      },
      {
        name: "Sara",
        tasks: this.service.getMockedAgenda()
      },
      {
        name: "Gabriela Alves",
        tasks: this.service.getMockedAgenda()
      },
      {
        name: "Gabriela Alves",
        tasks: this.service.getMockedAgenda()
      },
      {
        name: "Gabriela Alves",
        tasks: this.service.getMockedAgenda()
      },
      {
        name: "Gabriela Alves",
        tasks: this.service.getMockedAgenda()
      }
    ]
  }

  updateNeedle() {
    const now = new Date();
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    this.needleTop = (minutesSinceMidnight / 60) * this.slotHeight;
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
    setTimeout(() => {
      const firstSlot = this.slotElements.first?.nativeElement;
      if (firstSlot) {
        this.slotHeight = firstSlot.offsetHeight;
        this.tasks = this.tasks.map(task => {
          const startHour = task.start.getHours() + task.start.getMinutes() / 60;
          const endHour = task.end.getHours() + task.end.getMinutes() / 60;
          const durationHours = endHour - startHour;

          const top = startHour * this.slotHeight - 2;
          const height = durationHours * this.slotHeight;

          return { ...task, top, height };
        });

      }
      this.resolveOverlaps();
      this.updateNeedle();
      this.updateNeedles();

      const agendaContainer = document.querySelector('.needle');
      if (agendaContainer) {
        agendaContainer.scrollTo({
          top: this.needleTop - agendaContainer.clientHeight / 2,
          behavior: 'smooth'
        });
      }

      setInterval(() => {
        this.updateNeedle();
      }, 1);
    });
  }

  resolveOverlaps() {
    const overlaps: ITask[][] = [];

    this.tasks.forEach(task => {
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
        task.width = String(width);
        task.left = String((index * width));
      });
    });
  }

  private isOverlapping(a: ITask, b: ITask) {
    return a.start < b.end && b.start < a.end;
  }

  private getMinutesSinceMidnight(date: Date): number {
    return date.getHours() * 60 + date.getMinutes();
  }

  private getTop(start: Date): number {
    const minutes = this.getMinutesSinceMidnight(start);
    const slotsFromTop = minutes / 60;
    return slotsFromTop * this.slotHeight;
  }

  private getHeight(start: Date, end: Date): number {
    const durationMinutes =
      this.getMinutesSinceMidnight(end) - this.getMinutesSinceMidnight(start);
    const slots = durationMinutes / 60;
    return slots * this.slotHeight;
  }

  public onScroll(event: Event) {
    const scrolledElement = event.target as HTMLElement;
    const scrollTop = scrolledElement.scrollTop;

    this.agendaRefs.forEach(ref => {
      const el = ref.nativeElement as HTMLElement;
      if (el !== scrolledElement) {
        el.scrollTop = scrollTop;
      }
    });
  }

  updateNeedles() {
    const now = new Date();
    const totalMinutes = now.getHours() * 60 + now.getMinutes();
    const top = (totalMinutes / 5) * this.slotHeight;

    // Atualiza as agulhas e rola cada agenda para a posição
    this.needleTops = this.selectedEmployees.map(_ => top);

    this.agendaRefs.forEach((ref, i) => {
      const el = ref.nativeElement as HTMLElement;
      el.scrollTop = this.needleTops[i]; // rola para a posição da agulha
    });
  }
}
