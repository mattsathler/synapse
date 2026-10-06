import { PhonePipe } from './CustomPhone';

describe('PhonePipe', () => {
  const pipe = new PhonePipe();
  const cases: [string | number | null | undefined, string][] = [
    [null, ''], [undefined, ''], ['', ''], [0, ''],
    ['11987654321', '(11) 9 8765-4321'], ['1134567890', '(11) 3456-7890'],
    ['+55 (11) 98765-4321', '(11) 9 8765-4321'], ['551134567890', '(11) 3456-7890'],
    [11987654321, '(11) 9 8765-4321'], ['abc123', '123'], ['123456789012', '123456789012'],
    ['55987654321', '(55) 9 8765-4321']
  ];
  for (const [value, expected] of cases) it(`formats ${value}`, () => expect(pipe.transform(value)).toBe(expected));
});
