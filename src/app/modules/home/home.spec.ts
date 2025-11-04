import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule, RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../@shared/components/sidebar/sidebar';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home, CommonModule, RouterModule, RouterOutlet, Sidebar],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
