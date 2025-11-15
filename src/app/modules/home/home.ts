import { Component } from '@angular/core';
import { Header } from '../../../@shared/components/header/header';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'app-home',
  imports: [Header, CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  public displayedName: string;
  public employee;
  constructor(private authService: AuthService) {
    this.employee = this.authService.employee();
    this.displayedName = this.employee?.name.split(' ')[0] || 'Usuário';
  }
}
