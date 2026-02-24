import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { loaderInterceptor } from './core/interceptors/loader.interceptor';
import { TranslationService } from './core/i18n/translation.service';
import { ConfirmationService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { definePreset, palette } from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';

/** Lara with primary set to brand #24205B so the theme applies it everywhere (inputs, buttons, focus). */
const MazadatPreset = definePreset(Lara, {
  semantic: {
    primary: palette('#24205B'),
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([apiInterceptor, loaderInterceptor])),
    provideAppInitializer(() => inject(TranslationService).init()),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: MazadatPreset,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    ConfirmationService,
  ]
};
