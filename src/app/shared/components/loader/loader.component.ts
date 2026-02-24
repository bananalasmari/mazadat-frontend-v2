import { Component, inject } from '@angular/core';
import { GlobalLoaderService } from '../../../core/services/global-loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `@if (loader.show()) {
    <div
      class="global-loader-overlay"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div class="global-loader-spinner"></div>
    </div>
  }`,
})
export class LoaderComponent {
  protected readonly loader = inject(GlobalLoaderService);
}
