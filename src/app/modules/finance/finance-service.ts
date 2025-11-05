import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of, tap } from 'rxjs';
import { FinanceAccount } from '../../../@shared/types/FinanceAccount';
import { getMockedFinanceAccounts } from '../../../@shared/mockups/FinanceAccounts';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  public financeAccountsList$: BehaviorSubject<FinanceAccount[] | null> = new BehaviorSubject<FinanceAccount[] | null>(null);

  public getFinanceAccountList(): void {
    const accounts = getMockedFinanceAccounts();
    of(accounts).pipe(
      delay(2000),
      tap(accounts => {
        this.financeAccountsList$.next(accounts);
      })
    ).subscribe();
  }
}
