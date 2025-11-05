import { FormControl } from '@angular/forms';
import { minTimeValidator } from './minTimeValidator';

describe('minTimeValidator', () => {
  it('return error when start is after end', () => {
    const control = new FormControl('08:00');
    const validator = minTimeValidator('09:00');
    expect(validator(control)).toEqual({ minTime: true });
  });

  it('return null when value is empty', () => {
    const control = new FormControl('');
    const validator = minTimeValidator('09:00');
    expect(validator(control)).toBeNull();
  });
});