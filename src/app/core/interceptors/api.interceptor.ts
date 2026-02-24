import { HttpInterceptorFn } from '@angular/common/http';
import { getConfig } from '../config/config';

/**
 * HTTP interceptor that:
 * 1. Prepends API_BASE_URL to requests starting with /api
 * 2. Sets withCredentials: true for cookie-based authentication
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/api')) {
    const configuredBaseUrl = getConfig('API_BASE_URL').replace(/\/+$/, '');
    const apiBaseUrl = configuredBaseUrl.endsWith('/api')
      ? configuredBaseUrl.slice(0, -4)
      : configuredBaseUrl;

    req = req.clone({
      url: `${apiBaseUrl}${req.url}`,
      withCredentials: true,
    });
  }

  return next(req);
};