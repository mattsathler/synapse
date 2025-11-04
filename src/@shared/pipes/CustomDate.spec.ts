import { CustomDate } from "./CustomDate";

describe('CustomDate', () => {
    let pipe: CustomDate;

    beforeEach(() => {
        pipe = new CustomDate();
    });

    it('should instance the pipe', () => {
        expect(pipe).toBeTruthy();
    });

    it('should transform null type', () => {
        expect(pipe.transform(null as any)).toBe('');
    });

    it('should transform date type', () => {
        expect(pipe.transform(new Date('2025-10-17T08:30:00'))).toBe('17 de outubro de 2025');
    })
})