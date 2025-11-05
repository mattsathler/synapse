import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Header } from '../../../../@shared/components/header/header';
import { BehaviorSubject } from 'rxjs';
import { FinanceService } from '../finance-service';
import { FinanceAccount } from '../../../../@shared/types/FinanceAccount';
import { SkeletonDirective } from '../../../../@shared/directives/skeleton';

@Component({
  selector: 'app-finance-accounts',
  imports: [CommonModule, Header, SkeletonDirective],
  templateUrl: './finance-accounts.html',
  styleUrl: './finance-accounts.scss'
})
export class FinanceAccounts implements OnInit {
  public financeAccountsList$: BehaviorSubject<FinanceAccount[] | null>;

  constructor(private service: FinanceService) {
    this.financeAccountsList$ = this.service.financeAccountsList$;
  }

  ngOnInit() {
    this.service.getFinanceAccountList();
  }
}
