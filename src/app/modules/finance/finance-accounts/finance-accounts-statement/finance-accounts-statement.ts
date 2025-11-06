import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Header } from '../../../../../@shared/components/header/header';
import { FinanceService } from '../../finance-service';
import { BehaviorSubject } from 'rxjs';
import { FinanceAccount } from '../../../../../@shared/types/FinanceAccount';
import { ActivatedRoute } from '@angular/router';
import { SkeletonDirective } from '../../../../../@shared/directives/skeleton';

@Component({
  selector: 'app-finance-accounts-statement',
  imports: [CommonModule, Header, SkeletonDirective],
  templateUrl: './finance-accounts-statement.html',
  styleUrl: './finance-accounts-statement.scss'
})
export class FinanceAccountsStatement implements OnInit {
  public accountStatement$: BehaviorSubject<FinanceAccount | null>;
  public isLoading$: BehaviorSubject<boolean>;

  public accountId: string;

  constructor(private service: FinanceService, private activatedRoute: ActivatedRoute) {
    this.accountStatement$ = this.service.financeAccountStatement$;
    this.isLoading$ = this.service.isLoading$;

    this.accountId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
  }

  ngOnInit() {
    this.service.getFinanceAccountStatementById(this.accountId);
  }
}
