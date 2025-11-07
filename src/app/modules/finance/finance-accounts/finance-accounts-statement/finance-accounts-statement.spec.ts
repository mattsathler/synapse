import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAccountsStatement } from './finance-accounts-statement';
import { provideRouter } from '@angular/router';

describe('FinanceAccountsStatement', () => {
  let component: FinanceAccountsStatement;
  let fixture: ComponentFixture<FinanceAccountsStatement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceAccountsStatement],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FinanceAccountsStatement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
