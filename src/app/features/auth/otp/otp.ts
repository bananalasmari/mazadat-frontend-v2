import { Component, inject, signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthStateService } from '../../../core/auth/auth-state.service';
import { OtpCredentialsService } from '../../../core/auth/otp-credentials.service';
import { PublicLayoutService } from '../../../core/layout/public-layout.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { TranslationService } from '../../../core/i18n/translation.service';
import { AlertComponent } from '../../../shared/ui/atoms/alert/alert.component';
import { ButtonComponent } from '../../../shared/ui/atoms/button/button.component';
import { TypographyComponent } from '../../../shared/ui/atoms/typography/typography.component';
import { SkeletonModule } from 'primeng/skeleton';

interface LoginBenefit {
  icon: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    AlertComponent,
    TranslatePipe,
    ButtonComponent,
    TypographyComponent,
    SkeletonModule,
  ],
  templateUrl: './otp.html',
})
export class OtpComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly authState = inject(AuthStateService);
  private readonly otpCreds = inject(OtpCredentialsService);
  private readonly publicLayout = inject(PublicLayoutService);
  protected readonly i18n = inject(TranslationService);

  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      this.publicLayout.setShowLoader(this.loading());
    });
    effect(() => {
      if (this.i18n.ready() && !this.otpCreds.credentials()) {
        this.router.navigateByUrl('/login');
      }
    });
  }

  /** 4-digit OTP string (one char per box). */
  otpValue = signal('');

  private get credentials(): { username: string; password: string } | null {
    return this.otpCreds.credentials();
  }

  readonly benefits = computed<LoginBenefit[]>(() => {
    if (!this.i18n.ready()) return [];
    const t = (key: string) => this.i18n.t(key);
    return [
      { icon: 'pi pi-shield', title: t('login.benefit1Title'), body: t('login.benefit1Body') },
      { icon: 'pi pi-check-circle', title: t('login.benefit2Title'), body: t('login.benefit2Body') },
      { icon: 'pi pi-bolt', title: t('login.benefit3Title'), body: t('login.benefit3Body') },
    ];
  });

  protected benefitIconClass(b: LoginBenefit): string {
    const raw = (b.icon ?? '').trim();
    if (!raw) return 'pi pi-info-circle';
    if (raw.startsWith('pi ')) return raw;
    if (raw.startsWith('pi-')) return `pi ${raw}`;
    return raw;
  }

  goBack(): void {
    this.router.navigateByUrl('/login');
  }

  submitOtp(): void {
    const creds = this.credentials;
    const otp = this.otpValue().trim();
    if (!creds || !otp || otp.length !== 4) return;

    this.loading.set(true);
    this.error.set(null);

    this.authService.validateOtp(creds, otp).subscribe({
      next: (response) => {
        const authorities = response.authorities?.map((a) => a.authority) ?? [];
        this.authService.postLogin(authorities).subscribe({
          next: async () => {
            this.loading.set(false);
            this.authState.fetchUser();
            await this.router.navigateByUrl('/dashboard');
            this.otpCreds.clear();
          },
          error: (err) => {
            this.loading.set(false);
            this.error.set(err?.error?.message || 'Post-login failed');
          },
        });
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message || 'Invalid OTP');
      },
    });
  }

  /** True when OTP has exactly 4 digits (enables verify button). */
  get otpFormValid(): boolean {
    return /^\d{4}$/.test(this.otpValue().trim());
  }

  getOtpDigit(index: number): string {
    return (this.otpValue()[index] ?? '').toString();
  }

  /** Single digit input: update value and move focus to next box. Handles paste of multiple digits. */
  onDigitInput(event: Event, index: number): void {
    const el = event.target as HTMLInputElement;
    const raw = (el.value ?? '').replace(/\D/g, '').slice(0, 4);
    const prev = this.otpValue();
    let nextVal: string;
    if (raw.length > 1) {
      nextVal = raw.slice(0, 4);
      el.blur();
      setTimeout(() => {
        const last = this.otpValue().length === 4 ? 3 : Math.min(nextVal.length, 3);
        const focusEl = el.closest('[data-otp-container]')?.querySelector<HTMLInputElement>(`input.otp-digit-input[data-otp-index="${last}"]`);
        focusEl?.focus();
      }, 0);
    } else {
      const digit = raw.slice(-1);
      nextVal = (prev.slice(0, index) + digit + prev.slice(index + 1)).slice(0, 4);
      if (digit && index < 3) {
        const next = el.closest('[data-otp-container]')?.querySelector<HTMLInputElement>(`input.otp-digit-input[data-otp-index="${index + 1}"]`);
        next?.focus();
      }
    }
    this.otpValue.set(nextVal);
    if (nextVal.length === 4 && /^\d{4}$/.test(nextVal) && !this.loading()) {
      this.submitOtp();
    }
  }

  /** On keydown: digit -> advance to next; Backspace on empty -> go to prev; block non-digits. */
  onDigitKeydown(event: KeyboardEvent, index: number): void {
    const el = event.target as HTMLInputElement;
    if (/^\d$/.test(event.key)) {
      if (index < 3) {
        const next = el.closest('[data-otp-container]')?.querySelector<HTMLInputElement>(`input.otp-digit-input[data-otp-index="${index + 1}"]`);
        setTimeout(() => next?.focus(), 0);
      }
      return;
    }
    if (event.key === 'Backspace' && !el.value && index > 0) {
      const prev = el.closest('[data-otp-container]')?.querySelector<HTMLInputElement>(`input.otp-digit-input[data-otp-index="${index - 1}"]`);
      setTimeout(() => prev?.focus(), 0);
    }
    if (!['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(event.key) && !event.ctrlKey && !event.metaKey) {
      if (!/^\d$/.test(event.key)) event.preventDefault();
    }
  }

  /** Submit on Enter when OTP is complete. */
  onEnterKey(event: Event): void {
    if (this.otpFormValid && !this.loading()) {
      event.preventDefault();
      this.submitOtp();
    }
  }

  /** Handle SMS OTP autofill from hidden one-time-code input (e.g. iOS). */
  onAutofillInput(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value?.replace(/\D/g, '').slice(0, 4) ?? '';
    this.otpValue.set(value);
    if (value.length === 4 && !this.loading()) {
      this.submitOtp();
    }
  }
}
