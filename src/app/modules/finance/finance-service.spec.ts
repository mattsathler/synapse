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
        expect(Array.isArray(account));
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
        expect(Array.isArray(account));
        const cached = service.financeAccountStatementCache.get(id);
        expect(cached).toBeTruthy();
        expect(cached).toBe(account);
        expect(service.isLoading$.getValue()).toBe(false);
      }
    );
  }));
});
