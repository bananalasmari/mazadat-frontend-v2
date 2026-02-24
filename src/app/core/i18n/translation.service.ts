import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { PrimeNG } from 'primeng/config';
import { PRIMENG_LOCALE_AR, PRIMENG_LOCALE_EN } from './primeng-locales';

export type AppLang = 'ar' | 'en';

type Dict = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly primeng = inject(PrimeNG);

  readonly lang = signal<AppLang>('ar');
  readonly ready = signal(false);

  private readonly dict = signal<Dict>({});

  async init(): Promise<void> {
    const initialLang: AppLang = this.isBrowser
      ? ((localStorage.getItem('lang') as AppLang) ?? 'ar')
      : 'ar';

    await this.setLang(initialLang);
  }

  async setLang(lang: AppLang): Promise<void> {
    this.lang.set(lang);

    // PrimeNG table filter overlay and common labels (ar/en)
    this.primeng.setTranslation(lang === 'ar' ? PRIMENG_LOCALE_AR : PRIMENG_LOCALE_EN);

    if (this.isBrowser) {
      localStorage.setItem('lang', lang);
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    }

    if (!this.isBrowser) {
      // Keep SSR/prerender stable; translations can be loaded client-side.
      this.ready.set(true);
      return;
    }

    try {
      const data = await firstValueFrom(
        this.http.get<Dict>(`/assets/i18n/${lang}.json`, { responseType: 'json' as const }),
      );
      this.dict.set(data ?? {});
    } catch {
      this.dict.set({});
    } finally {
      this.ready.set(true);
    }
  }

  toggleLang(): Promise<void> {
    return this.setLang(this.lang() === 'ar' ? 'en' : 'ar');
  }

  t(key: string, params?: Record<string, string | number>): string {
    const value = this.resolveKey(this.dict(), key);
    if (typeof value !== 'string') return key;

    if (!params) return value;

    return value.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, p1: string) => {
      const v = params[p1];
      return v === undefined || v === null ? '' : String(v);
    });
  }

  private resolveKey(obj: Dict, key: string): unknown {
    return key.split('.').reduce<unknown>((acc, part) => {
      if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, obj);
  }
}

