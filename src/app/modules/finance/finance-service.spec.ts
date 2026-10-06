import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FinanceService } from './finance-service';

describe('FinanceService', () => {
  let service: FinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch finance account list', fakeAsync(() => {
    service.getFinanceAccountList();
    expect(service.isLoading$.getValue()).toBe(true);
    tick(4000);

    service.financeAccountsList$.subscribe(
      account => {
        expect(account).toBeTruthy();
        expect(Array.isArray(account)).toBeTrue();
        expect(service.financeAccountListCache).toBe(account);
        expect(service.isLoading$.getValue()).toBe(false);
      }
    );
  }));

  it('should fetch finance statement', fakeAsync(() => {
    const id: string = '1';
    service.getFinanceAccountStatementById(id);
    expect(service.isLoading$.getValue()).toBe(true);

    tick(2000);

    service.financeAccountStatement$.subscribe(
      account => {
        expect(account).toBeTruthy();
        expect(account?.id).toBe(id);
        const cached = service.financeAccountStatementCache.get(id);
        expect(cached).toBeTruthy();
        expect(cached).toBe(account);
        expect(service.isLoading$.getValue()).toBe(false);
      }
    );
  }));

  it('returns cached accounts immediately', fakeAsync(() => {
    service.getFinanceAccountList(); tick(2000);
    const cached = service.financeAccountsList$.value;
    service.financeAccountsList$.next(null);
    service.getFinanceAccountList();
    expect(service.financeAccountsList$.value).toBe(cached);
    expect(service.isLoading$.value).toBeFalse();
  }));
  it('returns cached statements immediately', fakeAsync(() => {
    service.getFinanceAccountStatementById('1'); tick(2000);
    const cached = service.financeAccountStatement$.value;
    service.financeAccountStatement$.next(null);
    service.getFinanceAccountStatementById('1');
    expect(service.financeAccountStatement$.value).toBe(cached);
    expect(service.isLoading$.value).toBeFalse();
  }));
  it('finishes loading when the account does not exist', fakeAsync(() => {
    service.getFinanceAccountStatementById('missing'); tick(2000);
    expect(service.financeAccountStatement$.value).toBeNull();
    expect(service.financeAccountStatementCache.has('missing')).toBeTrue();
    expect(service.isLoading$.value).toBeFalse();
  }));

});
