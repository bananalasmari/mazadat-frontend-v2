import {
  ChangeDetectorRef,
  EffectRef,
  OnDestroy,
  Pipe,
  PipeTransform,
  effect,
  inject,
} from '@angular/core';
import { TranslationService } from './translation.service';

@Pipe({
  name: 't',
  standalone: true,
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private readonly i18n = inject(TranslationService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fx: EffectRef = effect(() => {
    this.i18n.lang();
    this.cdr.markForCheck();
  });

  transform(key: string, params?: Record<string, string | number>): string {
    return this.i18n.t(key, params);
  }

  ngOnDestroy(): void {
    this.fx.destroy();
  }
}

