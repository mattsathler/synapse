import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { BehaviorSubject } from 'rxjs';
import { FinanceService } from '../finance-service';
import { FinanceAccount } from '../../../../@shared/types/FinanceAccount';
import { SkeletonDirective } from '../../../../@shared/directives/skeleton';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-finance-accounts',
  imports: [CommonModule, Header, SkeletonDirective, RouterModule],
  templateUrl: './finance-accounts.html',
  styleUrl: './finance-accounts.scss'
})
export class FinanceAccounts implements OnInit {
  public financeAccountsList$: BehaviorSubject<FinanceAccount[] | null>;
  public isLoading$: BehaviorSubject<boolean>;

  constructor(private service: FinanceService) {
    this.financeAccountsList$ = this.service.financeAccountsList$;
    this.isLoading$ = this.service.isLoading$;
  }

  ngOnInit() {
    this.service.getFinanceAccountList();
  }
}
