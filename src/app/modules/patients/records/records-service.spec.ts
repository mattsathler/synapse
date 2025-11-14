import { TestBed } from '@angular/core/testing';

import { RecordsService } from './records-service';
import { provideHttpClient } from '@angular/common/http';

describe('RecordsService', () => {
  let service: RecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(RecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle loading when creating new record', () => {
    service.createNewRecord('1', {
      author: 'Matheus',
      content: '',
      date: new Date(),
    });

    expect(service.isLoading()).toBeTrue();
  })
});
