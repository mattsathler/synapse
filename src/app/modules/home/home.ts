import { Component } from '@angular/core';
import { Header } from '../../../@shared/components/header/header';
import { CommonModule } from '@angular/common';
import { Separator } from '../../../@shared/components/separator/separator';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Header, CommonModule, Separator, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
