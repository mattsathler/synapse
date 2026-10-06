import { CustomDate } from './CustomDate';

describe('CustomDate', () => {
  const pipe = new CustomDate();
  beforeEach(() => { jasmine.clock().install(); jasmine.clock().mockDate(new Date(2026, 0, 1, 12)); });
  afterEach(() => jasmine.clock().uninstall());
  for (const value of [null, undefined, '', 'invalid']) it(`handles ${value}`, () => expect(pipe.transform(value)).toBe(''));
  it('labels today', () => expect(pipe.transform('2026-01-01')).toBe('Hoje, 01 de janeiro de 2026'));
  it('labels yesterday across year boundaries', () => expect(pipe.transform('2025-12-31')).toBe('Ontem, 31 de dezembro de 2025'));
  it('formats other days', () => expect(pipe.transform('2025-06-02')).toBe('02 de junho de 2025'));
});
