import { Injectable, signal, computed } from '@angular/core';

/** Shared state for public layout (auth pages): loader visibility driven by child routes (login, otp). */
@Injectable({ providedIn: 'root' })
export class PublicLayoutService {
  private readonly _showLoader = signal(false);

  readonly showLoader = computed(() => this._showLoader());

  setShowLoader(show: boolean): void {
    this._showLoader.set(show);
  }
}
