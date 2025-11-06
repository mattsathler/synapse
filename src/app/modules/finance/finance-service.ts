import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, finalize, map, of, tap } from 'rxjs';
import { FinanceAccount } from '../../../@shared/types/FinanceAccount';
import { getMockedFinanceAccounts } from '../../../@shared/mockups/FinanceAccounts';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public financeAccountsList$: BehaviorSubject<FinanceAccount[] | null> = new BehaviorSubject<FinanceAccount[] | null>(null);
  public financeAccountListCache: FinanceAccount[] | null = null;

  public financeAccountStatement$: BehaviorSubject<FinanceAccount | null> = new BehaviorSubject<FinanceAccount | null>(null);
  public financeAccountStatementCache: Map<string, FinanceAccount | null> = new Map<string, FinanceAccount | null>();


  public getFinanceAccountList(): void {
    if (this.financeAccountListCache) {
      this.financeAccountsList$.next(this.financeAccountListCache);
      return;
    }

    this.isLoading$.next(true);
    const accounts = getMockedFinanceAccounts();
    of(accounts).pipe(
      delay(2000),
      tap(accounts => {
        this.financeAccountsList$.next(accounts);
        this.financeAccountListCache = accounts;
      }),
      finalize(() => {
        this.isLoading$.next(false);
      })
    ).subscribe();
  }

  public getFinanceAccountStatementById(id: string): void {
    const cached = this.financeAccountStatementCache.get(id)
    if (cached) {
      this.financeAccountStatement$.next(cached);
      return;
    }

    this.isLoading$.next(true);
    const accounts = getMockedFinanceAccounts();
    const account = accounts.find(a => a.id === id) ?? null;

    of(account).pipe(
      delay(2000),
      tap(account => {
        this.financeAccountStatement$.next(account);
        this.financeAccountStatementCache.set(id, account);
      }),
      finalize(() => {
        this.isLoading$.next(false);
      })
    ).subscribe();
  }
}
