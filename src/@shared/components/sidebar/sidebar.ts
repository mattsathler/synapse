import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Avatar } from '../avatar/avatar';
import { RouterModule } from '@angular/router';
import { NavigationItem } from '../../types/NavigationItem';
import { NavigationService } from '../../services/navigation-service';

@Component({
  selector: 'sidebar',
  imports: [CommonModule, Avatar, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  public isOpen: boolean = true;
  public isMobile: boolean = false;
  public sidebarItems: NavigationItem[] = [];

  constructor(private service: NavigationService) {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());

    this.sidebarItems = this.service.getNavigation();
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.isOpen = false;
    }
  }

  public toggleSidebar(state: boolean): void {
    if (this.isMobile) return;

    this.isOpen = state;
  }
}
