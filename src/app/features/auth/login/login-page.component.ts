import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthStateService } from '../../../core/auth/auth-state.service';
import { OtpCredentialsService } from '../../../core/auth/otp-credentials.service';
import { PublicLayoutService } from '../../../core/layout/public-layout.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { TranslationService } from '../../../core/i18n/translation.service';
import { AlertComponent } from '../../../shared/ui/atoms/alert/alert.component';
import { ButtonComponent } from '../../../shared/ui/atoms/button/button.component';
import { InputComponent } from '../../../shared/ui/atoms/input/input.component';
import { TypographyComponent } from '../../../shared/ui/atoms/typography/typography.component';
import { TabsModule } from 'primeng/tabs';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';

interface LoginBenefit {
  icon: string;
  title: string;
  body: string;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    TranslatePipe,
    AlertComponent,
    ButtonComponent,
    TypographyComponent,
    TabsModule,
    PasswordModule,
    InputComponent,
    MessageModule,
    SkeletonModule,
  ],
  templateUrl: './login-page.html',
})
export class LoginPageComponent {
  private readonly authService = inject(AuthService);
  private readonly authState = inject(AuthStateService);
  private readonly router = inject(Router);
  private readonly otpCreds = inject(OtpCredentialsService);
  private readonly publicLayout = inject(PublicLayoutService);
  protected readonly i18n = inject(TranslationService);

  loading = signal(false);

  private static readonly REMEMBER_KEY = 'mazadat_login_remember';

  error = signal<string | null>(null);

  accountType = signal<'business' | 'personal'>('business');

  username = '';
  password = '';
  rememberMe = false;
  /** Set true when user has attempted submit (so we show validation errors). */
  attemptedSubmit = false;
  /** Set true when email/ID field loses focus (show format error on blur if invalid). */
  emailOrIdTouched = false;

  constructor() {
    effect(() => {
      this.publicLayout.setShowLoader(!this.i18n.ready() || this.loading());
    });
    this.restoreRememberedUser();
  }

  /** Restore username and rememberMe from localStorage. */
  private restoreRememberedUser(): void {
    try {
      const raw = localStorage.getItem(LoginPageComponent.REMEMBER_KEY);
      if (!raw) return;
      const { username: u, remember } = JSON.parse(raw) as { username?: string; remember?: boolean };
      if (remember && typeof u === 'string' && u.trim()) {
        this.username = u.trim();
        this.rememberMe = true;
      }
    } catch {
      localStorage.removeItem(LoginPageComponent.REMEMBER_KEY);
    }
  }

  /** Persist or clear remembered username on submit. */
  private persistRememberMe(): void {
    if (this.rememberMe && this.username.trim()) {
      localStorage.setItem(
        LoginPageComponent.REMEMBER_KEY,
        JSON.stringify({ username: this.username.trim(), remember: true })
      );
    } else {
      localStorage.removeItem(LoginPageComponent.REMEMBER_KEY);
    }
  }

  /** True when both username and password are non-empty (enables submit). */
  get credentialsFormValid(): boolean {
    return this.username.trim().length > 0 && this.password.trim().length > 0;
  }

  /** True when we should show email/ID validation errors (after submit or after blur). */
  get showEmailOrIdErrors(): boolean {
    return this.attemptedSubmit || this.emailOrIdTouched;
  }

  /** Error message for email/ID field (required or invalid format), or null. */
  get emailOrIdError(): string | null {
    if (!this.showEmailOrIdErrors) return null;
    if (!this.username.trim()) return this.i18n.t('login.usernameRequired');
    if (this.isUsernameFormatInvalid) return this.i18n.t('login.usernameFormatInvalid');
    return null;
  }

  /** True when username is non-empty but neither 9-digit ID nor valid email. */
  get isUsernameFormatInvalid(): boolean {
    const u = this.username.trim();
    if (!u) return false;
    if (u.includes('@')) {
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u);
    }
    return !/^\d{9}$/.test(u);
  }

  /** Strip Arabic letters (and normalize Arabic digits to 0–9). No Arabic letters allowed. */
  private stripArabic(value: string): string {
    const arDigits = '٠١٢٣٤٥٦٧٨٩';
    let out = (value ?? '')
      .replace(/[\u0600-\u06FF]/g, (c) => (arDigits.includes(c) ? String(arDigits.indexOf(c)) : ''));
    return out;
  }

  /** National ID / Iqama: digits only, max 9. Email: full value allowed (valid email). Arabic letters stripped. */
  onUsernameInput(value: string): void {
    const noArabic = this.stripArabic((value ?? '').trim());
    if (!noArabic) {
      this.username = '';
      this.error.set(null);
      return;
    }
    if (noArabic.includes('@')) {
      this.username = noArabic;
    } else {
      const digitsOnly = noArabic.replace(/\D/g, '');
      this.username = digitsOnly.slice(0, 9);
    }
    if (!this.isUsernameFormatInvalid) this.error.set(null);
  }

  /** Password: no Arabic letters or characters allowed. */
  onPasswordInput(value: string): void {
    this.password = this.stripArabic(value ?? '');
  }

  /** Called when email/ID field loses focus – show format error if invalid. */
  onEmailOrIdBlur(): void {
    this.emailOrIdTouched = true;
    if (this.username.trim() && this.isUsernameFormatInvalid) {
      this.error.set(this.i18n.t('login.usernameFormatInvalid'));
    }
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

  protected benefitIconClass(benefit: LoginBenefit): string {
    const raw = (benefit.icon ?? '').trim();
    if (!raw) return 'pi pi-info-circle';
    if (raw.startsWith('pi ')) return raw;
    if (raw.startsWith('pi-')) return `pi ${raw}`;
    return raw;
  }

  submitCredentials(): void {
    this.attemptedSubmit = true;
    if (!this.username || !this.password) return;

    if (this.isUsernameFormatInvalid) {
      this.error.set(this.i18n.t('login.usernameFormatInvalid'));
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.persistRememberMe();

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        this.otpCreds.set(this.username, this.password);
        this.router.navigateByUrl('/otp');
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.message || 'Login failed');
      },
    });
  }
}
