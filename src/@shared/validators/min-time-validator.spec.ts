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

  it('allows equal or later times and compares minutes within an hour', () => {
    const validator = minTimeValidator('09:30');
    expect(validator(new FormControl('09:30'))).toBeNull();
    expect(validator(new FormControl('10:00'))).toBeNull();
    expect(validator(new FormControl('09:29'))).toEqual({ minTime: true });
  });
  it('allows times when no minimum is specified', () => {
    expect(minTimeValidator('')(new FormControl('09:00'))).toBeNull();
  });

});