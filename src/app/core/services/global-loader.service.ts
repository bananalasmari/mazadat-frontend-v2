import { Injectable, signal, computed } from '@angular/core';

/**
 * Tracks active HTTP requests and exposes whether the global loader overlay should be visible.
 * Used by the loader HTTP interceptor and the global loader component.
 */
@Injectable({ providedIn: 'root' })
export class GlobalLoaderService {
  private readonly activeCount = signal(0);

  /** True when there is at least one request in flight. */
  readonly show = computed(() => this.activeCount() > 0);

  increment(): void {
    this.activeCount.update((c) => c + 1);
  }

  decrement(): void {
    this.activeCount.update((c) => Math.max(0, c - 1));
  }
}
