import { fakeAsync, tick } from '@angular/core/testing';
import { SnackbarService } from './snackbar-service';

describe('SnackbarService', () => {
  it('shows success by default and hides after four seconds', fakeAsync(() => {
    const service = new SnackbarService();
    expect(service.show()).toBeFalse();
    service.showMessage('Saved');
    expect(service.message()).toBe('Saved');
    expect(service.type()).toBe('success');
    expect(service.show()).toBeTrue();
    tick(3999);
    expect(service.show()).toBeTrue();
    tick(1);
    expect(service.show()).toBeFalse();
  }));
  it('restarts the timeout for a newer message', fakeAsync(() => {
    const service = new SnackbarService();
    service.showMessage('First');
    tick(3000);
    service.showMessage('Second', 'info');
    tick(1000);
    expect(service.show()).toBeTrue();
    expect(service.message()).toBe('Second');
    expect(service.type()).toBe('info');
    tick(3000);
    expect(service.show()).toBeFalse();
  }));
  for (const text of ['', null, undefined, {}]) {
    it(`uses a fallback for invalid error text ${JSON.stringify(text)}`, fakeAsync(() => {
      const service = new SnackbarService();
      service.showMessage(text as any, 'error');
      expect(service.message()).toBe('Ocorreu um erro inesperado!');
      tick(4000);
    }));
  }
});
