import {
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';

export interface SideMenuItem {
  path: string;
  icon: string;
  labelKey: string;
  descriptionKey: string;
  exact: boolean;
}

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe, ButtonModule],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {
  private readonly i18n = inject(TranslationService);

  /** When true, on mobile the drawer is open (slide-in). Ignored on desktop. */
  readonly open = input<boolean>(false);
  /** Emitted when the user closes the drawer (backdrop, close button, or nav link click). */
  readonly closed = output<void>();

  /** Disable transform transition when dir changes so the closed menu doesn't sweep across the screen. */
  readonly suppressTransition = signal(false);

  dir = computed(() => (this.i18n.lang() === 'ar' ? 'rtl' : 'ltr'));

  constructor() {
    let prevLang = this.i18n.lang();
    effect(() => {
      const lang = this.i18n.lang();
      if (lang !== prevLang) {
        prevLang = lang;
        this.suppressTransition.set(true);
        const t = setTimeout(() => {
          this.suppressTransition.set(false);
        }, 100);
        return () => clearTimeout(t);
      }
      return undefined;
    });
  }

  menuItems = computed<SideMenuItem[]>(() => [
    {
      path: '/dashboard',
      icon: 'pi-th-large',
      labelKey: 'sideMenu.dashboard.label',
      descriptionKey: 'sideMenu.dashboard.description',
      exact: true,
    },
    {
      path: '/vehicles',
      icon: 'pi-car',
      labelKey: 'sideMenu.vehicles.label',
      descriptionKey: 'sideMenu.vehicles.description',
      exact: false,
    },
    {
      path: '/auctions',
      icon: 'pi-megaphone',
      labelKey: 'sideMenu.auctions.label',
      descriptionKey: 'sideMenu.auctions.description',
      exact: false,
    },
    {
      path: '/reports',
      icon: 'pi-file',
      labelKey: 'sideMenu.reports.label',
      descriptionKey: 'sideMenu.reports.description',
      exact: false,
    },
    {
      path: '/invoices',
      icon: 'pi-receipt',
      labelKey: 'sideMenu.invoices.label',
      descriptionKey: 'sideMenu.invoices.description',
      exact: false,
    },
  ]);
}
