import { TestBed } from '@angular/core/testing';

import { DateService } from './date-service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return date formated for input', () => {
    expect(service.formatDateForInput(new Date(2025, 9, 17, 8, 30))).toBe('2025-10-17');
    expect(service.formatDateForInput(new Date(2025, 9, 16))).toBe('2025-10-16');
  })

  it('should return time formated for input', () => {
    expect(service.formatTimeForInput(new Date(2025, 9, 17, 8, 30))).toBe('08:30');
  })
});
