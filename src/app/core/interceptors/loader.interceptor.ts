import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { GlobalLoaderService } from '../services/global-loader.service';
import { finalize } from 'rxjs';

/**
 * Shows the global overlay blur loader while HTTP requests are in flight.
 * Increments the loader count on request start and decrements in finalize so
 * concurrent requests are handled correctly.
 */
export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(GlobalLoaderService);
  loader.increment();
  return next(req).pipe(
    finalize(() => loader.decrement()),
  );
};
