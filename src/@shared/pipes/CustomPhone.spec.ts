import { PhonePipe } from "./CustomPhone";

describe('CustomPhone', () => {
    let pipe: PhonePipe;

    beforeEach(() => {
        pipe = new PhonePipe();
    });

    it('should instance the pipe', () => {
        expect(pipe).toBeTruthy();
    });

    it('should transform null type', () => {
        expect(pipe.transform(null as any)).toBe('');
    });

    it('should transform Phone type', () => {
        const input = '21994349445';
        expect(pipe.transform(input)).toBe('(21) 9 9434-9445');
    })
})