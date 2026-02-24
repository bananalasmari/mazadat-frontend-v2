import { Component, inject, output, signal, computed, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { AuthStateService } from '../../core/auth/auth-state.service';
import { AuthService } from '../../core/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule, Menu } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HeaderSearchComponent } from '../../shared/components/header-search/header-search.component';
import {
  NotificationButtonComponent,
  NotificationItem,
} from '../../shared/components/notification-button/notification-button.component';
import { UserMenuButtonComponent } from '../../shared/components/user-menu-button/user-menu-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    ButtonModule,
    HeaderSearchComponent,
    NotificationButtonComponent,
    UserMenuButtonComponent,
    MenuModule,
    ConfirmDialogModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  protected readonly i18n = inject(TranslationService);
  private readonly authState = inject(AuthStateService);
  private readonly authService = inject(AuthService);
  private readonly confirmationService = inject(ConfirmationService);

  @ViewChild('userMenu') userMenu!: Menu;

  /** Emitted when the mobile menu (hamburger) button is clicked to open the side menu. */
  menuClick = output<void>();

  userMenuVisible = signal(false);

  notificationCount = signal(1);
  notificationItems = computed<NotificationItem[]>(() => [
    {
      id: '1',
      title: 'Sample notification',
      message: 'You can replace this list from the header via the notificationItems input.',
      date: new Date().toLocaleDateString(),
      read: false,
    },
  ]);

  user = this.authState.user;

  userDisplayName = computed(() => {
    const u = this.user();
    if (!u) return this.i18n.t('header.profile');
    const first = (u.firstName ?? '').trim();
    const family = (u.familyName ?? '').trim();
    if (first || family) return [first, family].filter(Boolean).join(' ');
    return u.username ?? this.i18n.t('header.profile');
  });

  userInitials = computed(() => {
    const u = this.user();
    if (!u) return '?';
    const first = (u.firstName ?? '').trim().charAt(0);
    const family = (u.familyName ?? '').trim().charAt(0);
    if (first || family) return (first + family).toUpperCase() || '?';
    return (u.username ?? '?').slice(0, 2).toUpperCase();
  });

  userMenuItems = computed<MenuItem[]>(() => {
    const t = (key: string) => this.i18n.t(key);
    return [
      { label: t('header.profile'), icon: 'pi pi-user', command: () => this.router.navigateByUrl('/dashboard') },
      { label: t('header.settings'), icon: 'pi pi-cog', command: () => this.router.navigateByUrl('/settings') },
      { separator: true },
      { label: t('header.logout'), icon: 'pi pi-sign-out text-danger', command: () => this.confirmLogout() },
    ];
  });

  onNotificationsClick(): void {
    // Panel is handled inside app-notification-button
  }

  onNotificationClick(item: NotificationItem): void {
    // TODO: mark as read, navigate, etc.
  }

  confirmLogout(): void {
    this.confirmationService.confirm({
      header: this.i18n.t('auth.logoutConfirmTitle'),
      message: this.i18n.t('auth.logoutConfirmMessage'),
      acceptLabel: this.i18n.t('auth.confirm'),
      rejectLabel: this.i18n.t('auth.cancel'),
      rejectButtonProps: { severity: 'secondary' },
      accept: () => this.logout(),
    });
  }

  private logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.authState.clearUser();
        this.router.navigateByUrl('/login');
      },
    });
  }
}
