import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  // --- signals ---
  public _show = signal(false);
  public _message = signal('');
  public _type = signal('');

  // --- derivated signals
  public show = computed(() => this._show());
  public message = computed(() => this._message());
  public type = computed(() => this._type());

  public showMessage(text: string, type: string = 'success'): void {
    this._message.set(text);
    this._type.set(type);
    this._show.set(true);

    if ((this as any)._snackTimeout) {
      clearTimeout((this as any)._snackTimeout);
    }
    (this as any)._snackTimeout = window.setTimeout(() => {
      this._show.set(false);
    }, 4000);
  }
}
