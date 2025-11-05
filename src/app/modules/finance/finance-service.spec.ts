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

    tick(4000);

    const account$ = service.financeAccountsList$.subscribe(
      account => {
        expect(account).toBeTruthy();
        expect(Array.isArray(account));
      }
    );
  }))
});
