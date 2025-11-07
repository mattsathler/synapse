import { Component, OnInit } from '@angular/core';
import { Header } from '../../../@shared/components/header/header';
import { Employee } from '../../../@shared/types/Employee';
import { BehaviorSubject } from 'rxjs';
import { EmployeesService } from './employees-service';
import { Avatar } from '../../../@shared/components/avatar/avatar';
import { CommonModule } from '@angular/common';
import { SkeletonDirective } from '../../../@shared/directives/skeleton';

@Component({
  selector: 'app-employees',
  imports: [CommonModule, Header, Avatar, SkeletonDirective],
  templateUrl: './employees.html',
  styleUrl: './employees.scss'
})
export class Employees implements OnInit {
  public employeesList;
  public isLoading;

  constructor(private service: EmployeesService) {
    this.employeesList = this.service.employeesList;
    this.isLoading = this.service.isLoading;
  }

  ngOnInit(): void {
    this.service.getEmployeesList();
  }
}
