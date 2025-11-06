import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAccountsStatement } from './finance-accounts-statement';

describe('FinanceAccountsStatement', () => {
  let component: FinanceAccountsStatement;
  let fixture: ComponentFixture<FinanceAccountsStatement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceAccountsStatement]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FinanceAccountsStatement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect when dont find account', () => {
    
  });
});
