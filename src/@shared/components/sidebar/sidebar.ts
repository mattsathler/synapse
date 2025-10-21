import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Avatar } from '../avatar/avatar';
import { RouterModule } from '@angular/router';
import { NavigationItem } from '../../types/NavigationItem';
import { NavigationService } from '../../services/navigation-service';
import { Separator } from '../separator/separator';

@Component({
  selector: 'sidebar',
  imports: [CommonModule, Avatar, RouterModule, Separator],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  public isOpen: boolean = true;
  public isMobile: boolean = false;
  public sidebarItems: NavigationItem[] = [];
  public currentTheme: string = "light";

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

  public toggleThemeMode(): void {
    this.currentTheme = document.body.getAttribute('data-theme') ?? 'light';
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
  }
}
