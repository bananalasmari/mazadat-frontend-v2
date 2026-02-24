import { Component, effect, inject, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TranslationService } from '../../../core/i18n/translation.service';
import type {
  QuickActionItem,
  QuickActionsSection,
  SalesAgreementQuickAction,
  VehicleDuesQuickAction,
  VehicleSaleQuickAction,
} from '../../../core/models/quick-action.model';
import { DashboardQuickActionsService } from '../../../core/services/dashboard-quick-actions.service';
import { TypographyComponent } from '../../../shared/ui/atoms/typography/typography.component';
import { SalesAgreementCardComponent } from './sales-agreement-card/sales-agreement-card.component';
import { VehicleDuesCardComponent } from './vehicle-dues-card/vehicle-dues-card.component';
import { VehicleSaleCardComponent } from './vehicle-sale-card/vehicle-sale-card.component';

/** i18n key roots for quick actions (ar/en JSON). Controlled from this component. */
const I18N = {
  section: {
    title: 'dashboard.quickActions.title',
    subtitle: 'dashboard.quickActions.subtitle',
    empty: 'dashboard.quickActions.empty',
  },
  salesAgreement: {
    title: 'dashboard.quickActions.salesAgreement.title',
    body: 'dashboard.quickActions.salesAgreement.body',
    badge: 'dashboard.quickActions.salesAgreement.badge',
    button: 'dashboard.quickActions.salesAgreement.button',
  },
  vehicleSale: {
    title: 'dashboard.quickActions.vehicleSale.title',
    reject: 'dashboard.quickActions.vehicleSale.reject',
    accept: 'dashboard.quickActions.vehicleSale.accept',
    rejectConfirmTitle: 'dashboard.quickActions.vehicleSale.rejectConfirmTitle',
    rejectConfirmMessage: 'dashboard.quickActions.vehicleSale.rejectConfirmMessage',
    acceptConfirmTitle: 'dashboard.quickActions.vehicleSale.acceptConfirmTitle',
    acceptConfirmMessage: 'dashboard.quickActions.vehicleSale.acceptConfirmMessage',
    acceptedLabel: 'dashboard.quickActions.vehicleSale.acceptedLabel',
    rejectedLabel: 'dashboard.quickActions.vehicleSale.rejectedLabel',
  },
  vehicleDues: {
    title: 'dashboard.quickActions.vehicleDues.title',
    button: 'dashboard.quickActions.vehicleDues.button',
  },
} as const;

/** Fallback image when item has no imageUrl (from assets/images). */
const DEMO_CAR_IMAGE = '/assets/images/demo-car.jpeg';

@Component({
  selector: 'app-quick-links',
  standalone: true,
  imports: [
    TypographyComponent,
    SalesAgreementCardComponent,
    VehicleSaleCardComponent,
    VehicleDuesCardComponent,
  ],
  templateUrl: './quick-links.html',
})
export class QuickLinks {
  private readonly quickActionsService = inject(DashboardQuickActionsService);
  private readonly i18n = inject(TranslationService);
  private readonly confirmationService = inject(ConfirmationService);

  readonly demoCarImage = DEMO_CAR_IMAGE;
  readonly loading = signal(true);
  private readonly rawSection = signal<QuickActionsSection | null>(null);
  private readonly rawItems = signal<QuickActionItem[]>([]);
  /** Resolved from current locale JSON (ar/en). */
  readonly section = signal<QuickActionsSection | null>(null);
  readonly items = signal<QuickActionItem[]>([]);
  /** Vehicle sale status after user accepts/rejects (item id -> 'accepted' | 'rejected'). */
  readonly itemStatuses = signal<Record<string, 'accepted' | 'rejected'>>({});

  constructor() {
    this.quickActionsService.getQuickActions().subscribe({
      next: (data) => {
        this.rawSection.set(data.section);
        this.rawItems.set(data.items);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });

    effect(() => {
      this.i18n.lang();
      const t = (key: string) => this.i18n.t(key);
      const raw = this.rawSection();
      const fromApi = this.rawItems();

      this.section.set({
        title: raw?.title ?? t(I18N.section.title),
        subtitle: raw?.subtitle ?? t(I18N.section.subtitle),
      });

      this.items.set(fromApi.map((item) => this.resolveItem(item, t)));
    });
  }

  private resolveItem(item: QuickActionItem, t: (key: string) => string): QuickActionItem {
    switch (item.type) {
      case 'sales_agreement': {
        const s = item as SalesAgreementQuickAction;
        return {
          ...s,
          title: s.title ?? t(I18N.salesAgreement.title),
          body: s.body ?? t(I18N.salesAgreement.body),
          badgeText: s.badgeText ?? t(I18N.salesAgreement.badge),
          buttonText: s.buttonText ?? t(I18N.salesAgreement.button),
        };
      }
      case 'vehicle_sale': {
        const v = item as VehicleSaleQuickAction;
        return {
          ...v,
          title: v.title ?? t(I18N.vehicleSale.title),
          rejectLabel: v.rejectLabel ?? t(I18N.vehicleSale.reject),
          acceptLabel: v.acceptLabel ?? t(I18N.vehicleSale.accept),
        };
      }
      case 'vehicle_dues': {
        const d = item as VehicleDuesQuickAction;
        return {
          ...d,
          title: d.title ?? t(I18N.vehicleDues.title),
          buttonText: d.buttonText ?? t(I18N.vehicleDues.button),
        };
      }
    }
  }

  emptyMessage(): string {
    return this.i18n.t(I18N.section.empty);
  }

  getItemStatus(id: string): 'accepted' | 'rejected' | null {
    return this.itemStatuses()[id] ?? null;
  }

  acceptedLabel(): string {
    return this.i18n.t(I18N.vehicleSale.acceptedLabel);
  }

  rejectedLabel(): string {
    return this.i18n.t(I18N.vehicleSale.rejectedLabel);
  }

  onReviewAgreement(id: string): void {
    // TODO: navigate to agreement review using id
  }

  confirmRejectSale(item: VehicleSaleQuickAction): void {
    this.confirmationService.confirm({
      header: this.i18n.t(I18N.vehicleSale.rejectConfirmTitle),
      message: this.i18n.t(I18N.vehicleSale.rejectConfirmMessage),
      acceptLabel: this.i18n.t('auth.confirm'),
      rejectLabel: this.i18n.t('auth.cancel'),
      rejectButtonProps: { severity: 'secondary' },
      accept: () => this.onRejectSale(item),
    });
  }

  confirmAcceptSale(item: VehicleSaleQuickAction): void {
    this.confirmationService.confirm({
      header: this.i18n.t(I18N.vehicleSale.acceptConfirmTitle),
      message: this.i18n.t(I18N.vehicleSale.acceptConfirmMessage),
      acceptLabel: this.i18n.t('auth.confirm'),
      rejectLabel: this.i18n.t('auth.cancel'),
      rejectButtonProps: { severity: 'secondary' },
      accept: () => this.onAcceptSale(item),
    });
  }

  onRejectSale(item: VehicleSaleQuickAction): void {
    this.itemStatuses.update((prev) => ({ ...prev, [item.id]: 'rejected' }));
    // TODO: reject vehicle sale using item.id (API call)
  }

  onAcceptSale(item: VehicleSaleQuickAction): void {
    this.itemStatuses.update((prev) => ({ ...prev, [item.id]: 'accepted' }));
    // TODO: accept vehicle sale using item.id (API call)
  }

  onContinueRegistration(id: string): void {
    // TODO: navigate to registration using id
  }
}
