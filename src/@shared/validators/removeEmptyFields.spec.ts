import { removeEmptyFields } from './removeEmptyFields';

describe('removeEmptyFields', () => {
  it('removes only null, undefined and empty strings without mutating input', () => {
    const input = { empty: '', nil: null, missing: undefined, zero: 0, no: false, whitespace: ' ', list: [], nested: { value: '' } };
    expect(removeEmptyFields(input)).toEqual({ zero: 0, no: false, whitespace: ' ', list: [], nested: { value: '' } });
    expect(input.empty).toBe('');
    expect(input.nested).toEqual({ value: '' });
  });
  it('handles an empty object', () => expect(removeEmptyFields({})).toEqual({}));
});
